// /* eslint-disable @typescript-eslint/no-unused-vars */
// import React, { useState } from "react";
// import CryptoClock from "./ClockComponent";
// import { EAS, SchemaEncoder } from "@ethereum-attestation-service/eas-sdk";
// import DatePicker from "react-datepicker";
// import "react-datepicker/dist/react-datepicker.css";
// import { useBlockNumber } from "wagmi";
// import { useSigner } from "~~/utils/wagmi-utils";

// const CreateSession = () => {
//   const numba = useBlockNumber();
//   // const CryptoClockComponent: React.FC = () => {
//   //   const [targetTime, setTargetTime] = useState<Date | null>(null);
//   //   const [targetBlock, setTargetBlock] = useState<number | null>(null);
//   //   const timeZone = "America/New_York";

//   //   const handleTargetTimeChange = (date: Date | null) => {
//   //     setTargetTime(date);
//   //   };

//   //   const handleConvertTime = () => {
//   //     if (targetTime) {
//   //       const clock = new CryptoClock(Number(numba.data));
//   //       const formattedTime = targetTime.toISOString().slice(0, 19).replace("T", " ");
//   //       const ethBlock = clock.convertTimeToEthBlock(formattedTime, timeZone);
//   //       setTargetBlock(ethBlock);
//   //     }
//   //   };

//   //   return (
//   //     <div>
//   //       <h2>Crypto Clock</h2>
//   //       <div>
//   //         <label htmlFor="targetTime">Target Time:</label>
//   //         <DatePicker
//   //           id="targetTime"
//   //           selected={targetTime}
//   //           onChange={handleTargetTimeChange}
//   //           showTimeSelect
//   //           timeFormat="HH:mm"
//   //           timeIntervals={15}
//   //           dateFormat="yyyy-MM-dd HH:mm"
//   //           placeholderText="Select date and time"
//   //         />
//   //         <button onClick={handleConvertTime}>Convert</button>
//   //       </div>
//   //       {targetBlock !== null && (
//   //         <p>
//   //           Time {targetTime?.toString()} ({timeZone}) corresponds to Ethereum block {targetBlock}
//   //         </p>
//   //       )}
//   //     </div>
//   //   );
//   // };

//   const signer = useSigner();

//   const easContractAddress = "0x4200000000000000000000000000000000000021";
//   const eas = new EAS(easContractAddress);
//   //   const [title, setTitle] = React.useState("");
//   if (!signer) return null;
//   eas.connect(signer);
//   const Attest = async () => {
//     const schemaUID = "0x4e36b4880c16106a434c64c4217d519f98711ec82b44c09b0d3e10971bbb11e8";
//     // Signer must be an ethers-like signer.
//     // Initialize SchemaEncoder with the schema string
//     const schemaEncoder = new SchemaEncoder("string sesionTitle,uint32 startBlock");
//     const encodedData = schemaEncoder.encodeData([
//       { name: "sesionTitle", value: "", type: "string" },
//       { name: "startBlock", value: Number(numba.data), type: "uint32" },
//     ]);
//     const tx = await eas.attest({
//       schema: schemaUID,
//       data: {
//         recipient: "0x0000000000000000000000000000000000000000",
//         expirationTime: 0n,
//         revocable: true, // Be aware that if your schema is not revocable, this MUST be false
//         data: encodedData,
//       },
//     });
//     const newAttestationUID = await tx.wait();
//     console.log("New attestation UID:", newAttestationUID);
//   };

//   return (
//     <>
//       {/* <CryptoClockComponent /> */}
//     </>
//   );
// };

// export default CreateSession;
