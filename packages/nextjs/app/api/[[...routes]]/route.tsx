/** @jsxImportSource frog/jsx */   
import { Button, Frog, TextInput } from 'frog';
import { handle } from 'frog/next';
import { devtools } from 'frog/dev';
import { serveStatic } from 'frog/serve-static';

type State = {
    count: number;
};

export const app = new Frog<{ State: State }>({
    initialState: {
        count: 0,
    },
    basePath: '/api',
    imageOptions: { height: 600, width: 600 },
});

app.frame('/', (c) => {
    const { buttonValue, inputText, deriveState } = c;

    const state = deriveState((previousState) => {
        if (buttonValue === 'increment') previousState.count++;
        if (buttonValue === 'decrement') previousState.count--;
        if (inputText) {
            const parsedCount = parseInt(inputText, 10);
            if (!isNaN(parsedCount)) {
                previousState.count = parsedCount;
            }
        }
    });

    return c.res({
        image: (
            <div style={{ color: 'white', display: 'flex', flexDirection: 'column', fontSize: 30, alignItems: 'center', justifyContent: 'center', height: '100%', width: '100%', backgroundColor: '#1e1e1e' }}>
                <p style={{ marginBottom: 20 }}>Live Difficulty</p>
                <p>Count: {state.count}</p>
                <p> Current DC: {state.count > 5 ? 'High (15DC)' : 'Low(10DC)'}</p>
            </div>
        ),
        intents: [
            <TextInput placeholder="Enter count..." />,
            <Button value="increment">Increment</Button>,
            <Button value="decrement">Decrement</Button>,
            <Button.Reset>Reset</Button.Reset>,
        ],
    });
});

devtools(app, { serveStatic });

export const GET = handle(app);
export const POST = handle(app);
