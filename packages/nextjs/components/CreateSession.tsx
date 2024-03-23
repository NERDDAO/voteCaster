import React from 'react';
import { EAS, SchemaEncoder } from "@ethereum-attestation-service/eas-sdk";
import { useBlockNumber } from "wagmi";
import { useSigner } from "~~/utils/wagmi-utils"
import CryptoClock from './ClockComponent';

async function exampleUsage() {
    const clock = new CryptoClock();

    // Convert time to Ethereum block
    const time = '2023-03-23 15:30:00';
    const timeZone = 'America/New_York';
    const ethBlock = await clock.convertTimeToEthBlock(time, timeZone);
    console.log(`Time ${time} (${timeZone}) corresponds to Ethereum block ${ethBlock}`);

    // Convert Ethereum blocks to time
    const ethBlocks = 100;
    const targetTime = clock.convertEthBlocksToTime(ethBlocks, timeZone);
    console.log(`${ethBlocks} Ethereum blocks from now is ${targetTime} (${timeZone})`);
}

exampleUsage();

const CreateSession = () => {
    const signer = useSigner();
    const numba = useBlockNumber();
    const easContractAddress = "0x4200000000000000000000000000000000000021";
    const eas = new EAS(easContractAddress);
    const [title, setTitle] = React.useState("");
    if (!signer) return null;
    eas.connect(signer);
    const Attest = async () => {
        const schemaUID = "0x4e36b4880c16106a434c64c4217d519f98711ec82b44c09b0d3e10971bbb11e8";
        // Signer must be an ethers-like signer.
        // Initialize SchemaEncoder with the schema string
        const schemaEncoder = new SchemaEncoder("string sesionTitle,uint32 startBlock");
        const encodedData = schemaEncoder.encodeData([
            { name: "sesionTitle", value: "", type: "string" },
            { name: "startBlock", value: numba, type: "uint32" }
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
        console.log("New attestation UID:", newAttestationUID);

    }


    return (<></>);
}

export default CreateSession;
