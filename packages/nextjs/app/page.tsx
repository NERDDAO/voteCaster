"use client";

import Link from "next/link";
import type { NextPage } from "next";
import { useAccount } from "wagmi";
import { BugAntIcon, MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { Address } from "~~/components/scaffold-eth";
import CreateSession from "~~/components/CreateSession";

const Home: NextPage = () => {
    const { address: connectedAddress } = useAccount();

    return (
        <>
            <div className="bg-gray-900 text-white">
                <div className="container mx-auto p-4">
                    <header className="text-center mb-6">
                        <h1 className="text-3xl font-bold">Livepeer Stream</h1>
                    </header>

                    <section className="mb-6">
                        <div className="aspect-w-16 aspect-h-9 bg-gray-800">
                            <iframe
                                className="w-full h-full"
                                src="https://player.livepeer.com/embed?streamId=STREAM_ID&aspectRatio=16:9"
                                frameborder="0"
                                allowfullscreen
                            ></iframe>
                        </div>
                    </section>

                    <section className="flex flex-col items-center mb-6">
                        <h2 className="text-2xl font-semibold mb-4">Vote Now</h2>
                        <div className="flex space-x-4">
                            <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">Yes</button>
                            <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">No</button>
                        </div>
                        <CreateSession />
                    </section>

                    <section className="mb-6">
                        <h3 className="text-xl font-semibold mb-4">Results</h3>
                        <div className="flex justify-center space-x-4">
                            <div className="flex items-center">
                                <span className="text-green-500 mr-2">✔️ Yes:</span>
                                <span id="yesVotes">0</span>
                            </div>
                            <div className="flex items-center">
                                <span className="text-red-500 mr-2">✖️ No:</span>
                                <span id="noVotes">0</span>
                            </div>
                        </div>
                    </section>

                    <span className="text-center text-gray-400">
                        <p>&copy; 2024 Livepeer Stream Voting</p>
                    </span >
                </div>
            </div>
        </>
    );
};

export default Home;
