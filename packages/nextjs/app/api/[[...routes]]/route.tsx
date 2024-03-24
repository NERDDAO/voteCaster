// /** @jsxImportSource frog/jsx */
// // import { Button, Frog, TextInput } from "frog";
// import { devtools } from "frog/dev";
// import { handle } from "frog/next";
// import { serveStatic } from "frog/serve-static";

// const app = new Frog({
//   basePath: "/api",
// });

// app.frame("/", c => {
//   const { buttonValue, status } = c;
//   return c.res({
//     image: (
//       <div style={{ color: "red", display: "flex", fontSize: 60, flexDirection: "column" }}>
//         {status === "initial" ? "Select your fruit!" : `Selected: ${buttonValue}`}
//         <div
//           className="min-h-screen flex items-center justify-center"
//           style={{ color: "red", display: "flex", fontSize: 60, flexDirection: "column" }}
//         >
//           <div
//             className="bg-gray-700 p-8 rounded-lg shadow-lg max-w-md w-full"
//             style={{ color: "red", display: "flex", fontSize: 60, flexDirection: "column" }}
//           >
//             <div className="mb-4" style={{ color: "red", display: "flex", fontSize: 60 }}>
//               <h2 className="text-xl font-semibold">Vote Expires in:</h2>
//               <p id="countdown" className="text-2xl font-bold">
//                 30s
//               </p>
//             </div>
//             <div className="mb-8" style={{ color: "red", display: "flex", fontSize: 60 }}>
//               <h3 className="text-lg font-semibold">Scenario:</h3>
//               <p className="text-lg">Does Grok Make the Jump?</p>
//             </div>
//           </div>
//         </div>
//       </div>
//     ),
//     intents: [
//     //   <Button value="Easy">Easy(DC5)</Button>,
//     //   <Button value="Medium">Medium(DC10)</Button>,
//     //   <Button value="Hard">Hard(DC15)</Button>,
//     ],
//   });
// });
// /*
// app.frame('/vote', (c) => {
//     return c.res({
//         image: (<div />)
//     })

// });
// */

// devtools(app, { serveStatic });

// export const GET = handle(app);
// export const POST = handle(app);
