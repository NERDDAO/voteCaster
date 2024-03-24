/* eslint-disable @typescript-eslint/no-unused-vars */

/* eslint-disable prefer-const */
import { useState } from "react";
import Head from "next/head";
import { PollVoteForm } from "../../session";
import { Session } from "../../types";
import { kv } from "@vercel/kv";
import { Metadata, ResolvingMetadata } from "next";

async function getPoll(id: string): Promise<Session> {
  let nullPoll = {
    id: "",
    title: "No poll found",
    gateNFT: "",
    streamLink: "",
    difficulty5: "5",
    difficulty10: "10",
    difficulty15: "15",
    difficulty20: "20",
    votes1: 0,
    votes2: 0,
    votes3: 0,
    votes4: 0,
    created_at: 0,
  };

  try {
    let poll: Session | null = await kv.hgetall(`poll:${id}`);

    if (!poll) {
      return nullPoll;
    }

    return poll;
  } catch (error) {
    console.error(error);
    return nullPoll;
  }
}

type Props = {
  params: { id: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

export async function generateMetadata({ params, searchParams }: Props, parent: ResolvingMetadata): Promise<Metadata> {
  // read route params
  const id = params.id;
  const poll = await getPoll(id);

  const fcMetadata: Record<string, string> = {
    "fc:frame": "vNext",
    "fc:frame:post_url": `${process.env["HOST"]}/api/vote?id=${id}`,
    "fc:frame:image": `${process.env["HOST"]}/api/image?id=${id}`,
  };
  [poll.difficulty5, poll.difficulty10, poll.difficulty15, poll.difficulty20]
    .filter(o => o !== "")
    .map((option, index) => {
      fcMetadata[`fc:frame:button:${index + 1}`] = option;
    });

  return {
    title: poll.title,
    openGraph: {
      title: poll.title,
      images: [`/api/image?id=${id}`],
    },
    other: {
      ...fcMetadata,
    },
    metadataBase: new URL(process.env["HOST"] || ""),
  };
}
function getMeta(poll: Session) {
  // This didn't work for some reason
  return (
    <Head>
      <meta property="og:image" content="" key="test"></meta>
      <meta property="og:title" content="My page title" key="title" />
    </Head>
  );
}

export default async function Page({ params }: { params: { id: string } }) {
  const poll = await getPoll(params.id);

  return (
    <>
      <div className="flex flex-col items-center justify-center min-h-screen py-2">
        <main className="flex flex-col items-center justify-center flex-1 px-4 sm:px-20 text-center">
          <PollVoteForm poll={poll} />
        </main>
      </div>
    </>
  );
}
