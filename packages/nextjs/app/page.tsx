/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import Link from "next/link";
import { PollCreateForm } from "./polls/_components/form";
import type { NextPage } from "next";
import { useAccount } from "wagmi";
import { BugAntIcon, MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { Address } from "~~/components/scaffold-eth";
import CreateSession from "~~/components/CreateSession";



const Home: NextPage = () => {
  const { address: connectedAddress } = useAccount();

  return (
    <>
      <div className="flex flex-col items-center justify-center min-h-screen py-2">
        <main className="flex flex-col items-center justify-center flex-1 px-4 sm:px-20 text-center">
          <div className="mb-2">
            <h1 className="text-lg text-6xl font-bold mb-4">
              voteCaster
            </h1>
            <h2 className="text-lg text-3xl font-bold">
              Create your interactive role game and enhance your audience participation in the game decisions
             </h2>
          </div>
          <div className="flex flex-col items-center justify-around max-w-4xl my-8 sm:w-full bg-grey rounded-md shadow-xl h-full">
            <h3 className="text-lg text-2xl font-bold text-white">
              Create new game
            </h3>
            <div className="flex flex-col items-center justify-around max-w-4xl sm:w-full bg-grey rounded-md shadow-xl h-full border border-gray-100">
              <div>
                <p>Game conditions</p>
                <p>
                  Here the person has to select if its token gated or not, and add the NFT address if its token gates
                </p>
                <input type="text" placeholder="Gate NFT address" />
                <input type="text" placeholder="Gate NFT network" />
              <Link href="/polls">
                <button className="group relative h-12 w-48 overflow-hidden rounded-2xl bg-blue-500 text-lg font-bold text-white my-4">
                  Create Session!
                  <div className="absolute inset-0 h-full w-full scale-0 rounded-2xl transition-all duration-300 group-hover:scale-100 group-hover:bg-white/30">
            
                  </div>
                </button>
                <CreateSession/>
              </Link>
              
              </div>
            </div>
          </div>
          </main>
        </div>
    </>
  );
};

export default Home;
