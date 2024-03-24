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
    gateNFT: formData.get("gateNFT") as string,
    streamLink:formData.get("streamLink") as string,
    difficulty5: "5",
    difficulty10: "10",
    difficulty15: "15",
    difficulty20: "20",
  };

  try {
    await kv.hset(`poll:${poll.id}`, poll);
  } catch (error) {
    console.error("Error setting poll in KV store:", error);
    // Handle the error appropriately
  }

  try {
    await kv.expire(`poll:${poll.id}`, POLL_EXPIRY);
  } catch (error) {
    console.error("Error setting expiration for poll in KV store:", error);
    // Handle the error appropriately
  }

  try {
    await kv.zadd("polls_by_date", {
      score: Number(poll.created_at),
      member: newPoll.id,
    });
  } catch (error) {
    console.error("Error adding poll to sorted set in KV store:", error);
    // Handle the error appropriately
  }

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
