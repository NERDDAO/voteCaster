/* eslint-disable @typescript-eslint/no-non-null-assertion */
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
import CryptoClock from "../components/ClockComponent";
import DatePicker from "react-datepicker";
import { useBlockNumber } from "wagmi";
import { useSigner } from "~~/utils/wagmi-utils";
import { EAS, SchemaEncoder } from "@ethereum-attestation-service/eas-sdk";
import "react-datepicker/dist/react-datepicker.css";
import React from 'react';



type PollState = {
  newPoll: Session;
  updatedPoll?: Session;
  pending: boolean;
  voted?: boolean;
};


const CryptoClockComponent: React.FC = () => {
  const numba = useBlockNumber();
  const [targetTime, setTargetTime] = useState<Date | null>(null);
  const [targetBlock, setTargetBlock] = useState<number | null>(null);
  const timeZone = "America/New_York";

  const handleTargetTimeChange = (date: Date | null) => {
    setTargetTime(date);
  };

  const handleConvertTime = () => {
    if (targetTime) {
      const clock = new CryptoClock(Number(numba.data));
      const formattedTime = targetTime.toISOString().slice(0, 19).replace("T", " ");
      const ethBlock = clock.convertTimeToEthBlock(formattedTime, timeZone);
      setTargetBlock(ethBlock);
    }
  };

  return (
    <div>
      <h2>Crypto Clock</h2>
      <div>
        <label htmlFor="targetTime">Target Time:</label>
        <DatePicker
          id="targetTime"
          selected={targetTime}
          onChange={handleTargetTimeChange}
          showTimeSelect
          timeFormat="HH:mm"
          timeIntervals={15}
          dateFormat="yyyy-MM-dd HH:mm"
          placeholderText="Select date and time"
        />
        <button onClick={handleConvertTime}>Convert</button>
      </div>
      {targetBlock !== null && (
        <p>
          Time {targetTime?.toString()} ({timeZone}) corresponds to Ethereum block {targetBlock}
        </p>
      )}
    </div>
  );
};

export function PollCreateForm() {
  const numba = useBlockNumber();
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

  ////Attestation
const signer = useSigner();
  
const Attest = async (title: string) => {
  

  const easContractAddress = "0x4200000000000000000000000000000000000021";
  const eas = new EAS(easContractAddress);
  //const [title, setTitle] = React.useState("");
  if (!signer) return null;
  eas.connect(signer);

  const schemaUID = "0x4e36b4880c16106a434c64c4217d519f98711ec82b44c09b0d3e10971bbb11e8";
  // Signer must be an ethers-like signer.
  // Initialize SchemaEncoder with the schema string
  const schemaEncoder = new SchemaEncoder("string sesionTitle,uint32 startBlock");
  const encodedData = schemaEncoder.encodeData([
    { name: "sesionTitle", value: title, type: "string" },
    { name: "startBlock", value: Number(numba.data), type: "uint32" },
  ]);
  const tx = await eas.attest({
    schema: schemaUID,
    data: {
      recipient: "0x0000000000000000000000000000000000000000",
      expirationTime: 0n,
      revocable: true, // Be aware that if your schema is not revocable, this MUST be false
      data: encodedData,
    },
  });
  const newAttestationUID = await tx.wait();
  return (newAttestationUID)
  console.log("New attestation UID:", newAttestationUID);
};

  const getIdAtt = async () => {
    //trying to get attestation
    const idAtt = await Attest("title");
    console.log(idAtt);
    return idAtt;
  };

  const pollStub = {
    id: getIdAtt?.toString(),
    created_at: new Date().getTime(),
    title: "",
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
  };

  //pollStub.id = getIdAtt?.toString(); // Update the id property with the attestation result

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
          onSubmit={async event => {
            event.preventDefault();
            let attestId = await Attest("title");
            console.log(attestId);
            let formData = new FormData(formRef.current!);
            console.log(formData);
            let newPoll = {
              ...pollStub,
              id: attestId as string,
              title: formData.get("title") as string,
              gateNFT: formData.get("gateNFT") as string,
              streamLink:formData.get("streamLink") as string,
              difficulty5: "5",
              difficulty10: "10",
              difficulty15: "15",
              difficulty20: "20",
              votes1: 0,
              votes2: 0,
              votes3: 0,
              votes4: 0,
            };
            console.log(newPoll);
            console.log("newPollId", newPoll.id);


            formRef.current?.reset();

            startTransition(async () => {
              mutate({
                newPoll,
                pending: true,
              });
              console.log("mutate done")

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
          {/* <CryptoClockComponent /> */}
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
