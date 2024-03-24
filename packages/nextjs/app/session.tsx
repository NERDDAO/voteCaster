/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */

/* eslint-disable @next/next/no-img-element */

/* eslint-disable prefer-const */
"use client";

import { useOptimistic, useRef, useState, useTransition } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { redirectToPolls, savePoll, votePoll } from "./actions";
import { Poll, Session } from "./types";
import clsx from "clsx";
import { v4 as uuidv4 } from "uuid";

type PollState = {
  newPoll: Session;
  updatedPoll?: Session;
  pending: boolean;
  voted?: boolean;
};

export function PollCreateForm() {
  let formRef = useRef<HTMLFormElement>(null);
  let [state, mutate] = useOptimistic({ pending: false }, function createReducer(state, newPoll: PollState) {
    if (newPoll.newPoll) {
      return {
        pending: newPoll.pending,
      };
    } else {
      return {
        pending: newPoll.pending,
      };
    }
  });

  let pollStub = {
    id: uuidv4(),
    created_at: new Date().getTime(),
    title: "",
    gateNFT: "",
    streamLink: "",
    difficulty5: "",
    difficulty10: "",
    difficulty15: "",
    difficulty20: "",
    votes1: 0,
    votes2: 0,
    votes3: 0,
    votes4: 0,
  };

  let saveWithNewPoll = savePoll.bind(null, pollStub);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  let [isPending, startTransition] = useTransition();

  return (
    <>
      <div className="mx-8 w-full">
        <form
          className="relative my-8"
          ref={formRef}
          action={saveWithNewPoll}
          onSubmit={event => {
            event.preventDefault();
            let formData = new FormData(event.currentTarget);
            let newPoll = {
              ...pollStub,
              title: formData.get("title") as string,
              gateNFT: formData.get("Gate NFT") as string,
              streamLink:formData.get("stream Link") as string,
              difficulty5: formData.get("difficulty5") as string,
              difficulty10: formData.get("difficulty10") as string,
              difficulty15: formData.get("difficulty15") as string,
              difficulty20: formData.get("difficulty20") as string,
              votes1: 0,
              votes2: 0,
              votes3: 0,
              votes4: 0,
            };

            formRef.current?.reset();
            startTransition(async () => {
              mutate({
                newPoll,
                pending: true,
              });

              await savePoll(newPoll, formData);
            });
          }}
        >
          <input
            aria-label="Poll Title"
            className="pl-3 pr-28 py-3 mt-1 text-lg block w-full border border-gray-200 rounded-md text-gray-900 placeholder-gray-400 focus:outline-none focus:ring focus:ring-blue-300"
            maxLength={150}
            placeholder="Title..."
            required
            type="text"
            name="title"
          />
          <input
            aria-label="Gate NFT's address"
            className="pl-3 pr-28 py-3 mt-1 text-lg block w-full border border-gray-200 rounded-md text-gray-900 placeholder-gray-400 focus:outline-none focus:ring focus:ring-blue-300"
            maxLength={150}
            placeholder="NFT for gating..."
            required
            type="text"
            name="gateNFT"
          />
          <input
            aria-label="Stream link"
            className="pl-3 pr-28 py-3 mt-1 text-lg block w-full border border-gray-200 rounded-md text-gray-900 placeholder-gray-400 focus:outline-none focus:ring focus:ring-blue-300"
            maxLength={150}
            placeholder="https://..."
            required
            type="text"
            name="streamLink"
          />
          {/* <input
            className="pl-3 pr-28 py-3 mt-1 text-lg block w-full border border-gray-200 rounded-md text-gray-900 placeholder-gray-400 focus:outline-none focus:ring focus:ring-blue-300"
            maxLength={150}
            id="difficulty5"
            type="round"
            name="difficulty5"
            value="5" 
          />
          <label htmlFor="difficulty5" className="flex flex-col items-center cursor-pointer">
            <span className="w-8 h-8 border-2 border-gray-400 rounded-full flex items-center justify-center">
              <span className="w-4 h-4 bg-transparent rounded-full"></span>
            </span>
            <span className="text-sm mt-1">5</span>
          </label>

          <input
            className="pl-3 pr-28 py-3 mt-1 text-lg block w-full border border-gray-200 rounded-md text-gray-900 placeholder-gray-400 focus:outline-none focus:ring focus:ring-blue-300"
            maxLength={150}
            id="difficulty10"
            type="round"
            name="difficulty10"
            value="10" 
          />
          <label htmlFor="difficulty5" className="flex flex-col items-center cursor-pointer">
            <span className="w-8 h-8 border-2 border-gray-400 rounded-full flex items-center justify-center">
              <span className="w-4 h-4 bg-transparent rounded-full"></span>
            </span>
            <span className="text-sm mt-1">10</span>
          </label>

          <input
            className="pl-3 pr-28 py-3 mt-1 text-lg block w-full border border-gray-200 rounded-md text-gray-900 placeholder-gray-400 focus:outline-none focus:ring focus:ring-blue-300"
            maxLength={150}
            id="difficulty15"
            type="round"
            name="difficulty15"
            value="15" 
          />
          <label htmlFor="difficulty5" className="flex flex-col items-center cursor-pointer">
            <span className="w-8 h-8 border-2 border-gray-400 rounded-full flex items-center justify-center">
              <span className="w-4 h-4 bg-transparent rounded-full"></span>
            </span>
            <span className="text-sm mt-1">15</span>
          </label>

          <input
            className="pl-3 pr-28 py-3 mt-1 text-lg block w-full border border-gray-200 rounded-md text-gray-900 placeholder-gray-400 focus:outline-none focus:ring focus:ring-blue-300"
            maxLength={150}
            id="difficulty20"
            type="round"
            name="difficulty20"
            value="20" 
          />
          <label htmlFor="difficulty5" className="flex flex-col items-center cursor-pointer">
            <span className="w-8 h-8 border-2 border-gray-400 rounded-full flex items-center justify-center">
              <span className="w-4 h-4 bg-transparent rounded-full"></span>
            </span>
            <span className="text-sm mt-1">20</span>
          </label> */}

          <div className={"pt-2 flex justify-end"}>
            <button
              className={clsx(
                "flex items-center p-1 justify-center px-4 h-10 text-lg border bg-blue-500 text-white rounded-md w-24 focus:outline-none focus:ring focus:ring-blue-300 hover:bg-blue-700 focus:bg-blue-700",
                state.pending && "bg-gray-700 cursor-not-allowed",
              )}
              type="submit"
              disabled={state.pending}
            >
              Create
            </button>
          </div>
        </form>
      </div>
      <div className="w-full"></div>
    </>
  );
}

function PollOptions({ poll, onChange }: { poll: Session; onChange: (index: number) => void }) {
  return (
    <div className="mb-4 text-left">
      {[poll.difficulty5, poll.difficulty10, poll.difficulty15, poll.difficulty20]
        .filter(e => e !== "")
        .map((option, index) => (
          <label key={index} className="block">
            <input type="radio" name="poll" value={option} onChange={() => onChange(index + 1)} className="mr-2" />
            {option}
          </label>
        ))}
    </div>
  );
}

function PollResults({ poll }: { poll: Session }) {
  return (
    <div className="mb-4">
      <img src={`/api/image?id=${poll.id}&results=true&date=${Date.now()}`} alt="poll results" />
    </div>
  );
}

export function PollVoteForm({ poll, viewResults }: { poll: Session; viewResults?: boolean }) {
  const [selectedOption, setSelectedOption] = useState(-1);
  const router = useRouter();
  const searchParams = useSearchParams();
  viewResults = true; // Only allow voting via the api
  let formRef = useRef<HTMLFormElement>(null);
  let voteOnPoll = votePoll.bind(null, poll);
  let [isPending, startTransition] = useTransition();
  let [state, mutate] = useOptimistic(
    { showResults: viewResults },
    function createReducer({ showResults }, state: PollState) {
      if (state.voted || viewResults) {
        return {
          showResults: true,
        };
      } else {
        return {
          showResults: false,
        };
      }
    },
  );

  const handleVote = (index: number) => {
    setSelectedOption(index);
  };

  return (
    <div className="max-w-sm rounded overflow-hidden shadow-lg p-4 m-4">
      <div className="font-bold text-xl mb-2">{poll.title}</div>
      <form
        className="relative my-8"
        ref={formRef}
        action={() => voteOnPoll(selectedOption)}
        onSubmit={event => {
          event.preventDefault();
          let formData = new FormData(event.currentTarget);
          let newPoll = {
            ...poll,
          };

          // @ts-ignore
          newPoll[`votes${selectedOption}`] += 1;

          formRef.current?.reset();
          startTransition(async () => {
            mutate({
              newPoll,
              pending: false,
              voted: true,
            });

            await redirectToPolls();
            // await votePoll(newPoll, selectedOption);
          });
        }}
      >
        {state.showResults ? <PollResults poll={poll} /> : <PollOptions poll={poll} onChange={handleVote} />}
        {state.showResults ? (
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" type="submit">
            Back
          </button>
        ) : (
          <button
            className={
              "bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" +
              (selectedOption < 1 ? " cursor-not-allowed" : "")
            }
            type="submit"
            disabled={selectedOption < 1}
          >
            Vote
          </button>
        )}
      </form>
    </div>
  );
}
