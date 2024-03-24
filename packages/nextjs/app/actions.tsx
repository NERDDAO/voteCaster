/* eslint-disable prettier/prettier */
/* eslint-disable prefer-const */
"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { POLL_EXPIRY, Session } from "./types";
import { kv } from "@vercel/kv";

export async function savePoll(poll: Session, formData: FormData) {
  let newPoll = {
    ...poll,
    created_at: Date.now(),
    title: formData.get("title") as string,
    gateNFT: formData.get("Gate NFT") as string,
    streamLink:formData.get("stream Link") as string,
    difficulty5: formData.get("difficulty5") as string,
    difficulty10: formData.get("difficulty10") as string,
    difficulty15: formData.get("difficulty15") as string,
    difficulty20: formData.get("difficulty20") as string,
  };
  await kv.hset(`poll:${poll.id}`, poll);
  await kv.expire(`poll:${poll.id}`, POLL_EXPIRY);
  await kv.zadd("polls_by_date", {
    score: Number(poll.created_at),
    member: newPoll.id,
  });

  revalidatePath("/polls");
  redirect(`/polls/${poll.id}`);
}

export async function votePoll(poll: Session, optionIndex: number) {
  await kv.hincrby(`poll:${poll.id}`, `votes${optionIndex}`, 1);

  revalidatePath(`/polls/${poll.id}`);
  redirect(`/polls/${poll.id}?results=true`);
}

export async function redirectToPolls() {
  redirect("/polls");
}
