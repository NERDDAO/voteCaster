/** @jsxImportSource frog/jsx */
import { Button, Frog, TextInput, parseEther } from 'frog'
import { handle } from 'frog/next'
import { abi } from "./abi";


const app = new Frog({
    basePath: '/api',
})

app.frame('/', (c) => {
    const { buttonValue, status } = c
    return c.res({
        image: (
            <div style={{ color: 'red', display: 'flex', fontSize: 60, flexDirection: "column" }}>
                {status === 'initial' ? (
                    'Select your fruit!'
                ) : (
                    `Selected: ${buttonValue}`
                )}
                <div className="min-h-screen flex items-center justify-center" style={{ color: 'red', display: 'flex', fontSize: 60, flexDirection: "column" }}>
                    <div className="bg-gray-700 p-8 rounded-lg shadow-lg max-w-md w-full" style={{ color: 'red', display: 'flex', fontSize: 60, flexDirection: "column" }}>
                        <div className="mb-4" style={{ color: 'red', display: 'flex', fontSize: 60 }}>
                            <h2 className="text-xl font-semibold">Vote Expires in:</h2>
                            <p id="countdown" className="text-2xl font-bold">30s</p>
                        </div>
                        <div className="mb-8" style={{ color: 'red', display: 'flex', fontSize: 60 }}>
                            <h3 className="text-lg font-semibold">Scenario:</h3>
                            <p className="text-lg">Does Grok Make the Jump?</p>
                        </div>
                    </div>
                </div>
            </div>
        ),
        intents: [
            <TextInput placeholder="Value (ETH)" />,
            <Button.Transaction target="/send-ether">Send Ether</Button.Transaction>,
            <Button.Transaction target="/mint">Mint</Button.Transaction>,
        ]
    })
})

app.frame('/finish', (c) => {
    const { transactionId } = c
    return c.res({
        image: (
            <div style={{ color: 'white', display: 'flex', fontSize: 60 }}>
                Transaction ID: {transactionId}
            </div>
        )
    })
})

app.transaction('/send-ether', (c) => {
    const { inputText } = c
    // Send transaction response.
    return c.send({
        chainId: 'eip155:10',
        to: '0xd2135CfB216b74109775236E36d4b433F1DF507B',
        value: parseEther(inputText || '0'),
    })
})

app.transaction('/mint', (c) => {
    const { inputText } = c
    // Contract transaction response.
    return c.contract({
        abi,
        chainId: 'eip155:10',
        functionName: 'mint',
        args: [69420n],
        to: '0xd2135CfB216b74109775236E36d4b433F1DF507B',
        value: parseEther(inputText || '0')
    })
})
export const GET = handle(app)
export const POST = handle(app)
