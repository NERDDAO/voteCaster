

/* eslint-disable prefer-const */
import { POLL_EXPIRY, Session } from "~~/app/types";
import { Message, getSSLHubRpcClient } from "@farcaster/hub-nodejs";
import { kv } from "@vercel/kv";
import { NextRequest, NextResponse } from "next/server";

const HUB_URL = process.env["HUB_URL"];
const client = HUB_URL ? getSSLHubRpcClient(HUB_URL) : undefined;

export async function POST(request: NextRequest) {
    const req = await request.json()
    try {
        const pollId = req.query["id"];
        const results = req.query["results"] === "true";
        let voted = req.query["voted"] === "true";
        if (!pollId) {
            return NextResponse.json(
                {
                    status: 400,
                },
            );
        }

        let validatedMessage: Message | undefined = undefined;
        try {
            const frameMessage = Message.decode(Buffer.from(req.body?.trustedData?.messageBytes || "", "hex"));
            const result = await client?.validateMessage(frameMessage);
            if (result && result.isOk() && result.value.valid) {
                validatedMessage = result.value.message;
            }

            // Also validate the frame url matches the expected url
            let urlBuffer = validatedMessage?.data?.frameActionBody?.url || [];
            const urlString = Buffer.from(urlBuffer).toString("utf-8");
            if (validatedMessage && !urlString.startsWith(process.env["HOST"] || "")) {
                return NextResponse.json(
                    {
                        status: 400,
                    },
                );
            }
        } catch (e) {
            return NextResponse.json(
                {
                    status: 400,
                },
            );
        }

        let buttonId = 0,
            fid = 0;
        // If HUB_URL is not provided, don't validate and fall back to untrusted data
        if (client) {
            buttonId = validatedMessage?.data?.frameActionBody?.buttonIndex || 0;
            fid = validatedMessage?.data?.fid || 0;
        } else {
            buttonId = req.body?.untrustedData?.buttonIndex || 0;
            fid = req.body?.untrustedData?.fid || 0;
        }

        // Clicked create poll
        if ((results || voted) && buttonId === 2) {
            return res.status(302).setHeader("Location", `${process.env["HOST"]}`).send("Redirecting to create poll");


        }

        const voteExists = await kv.sismember(`poll:${pollId}:voted`, fid);
        voted = voted || !!voteExists;

        if (fid > 0 && buttonId > 0 && buttonId < 5 && !results && !voted) {
            let multi = kv.multi();
            multi.hincrby(`poll:${pollId}`, `votes${buttonId}`, 1);
            multi.sadd(`poll:${pollId}:voted`, fid);
            multi.expire(`poll:${pollId}`, POLL_EXPIRY);
            multi.expire(`poll:${pollId}:voted`, POLL_EXPIRY);
            await multi.exec();
        }

        let poll: Session | null = await kv.hgetall(`poll:${pollId}`);

        if (!poll) {
            return NextResponse.json(
                {
                    status: 400,
                },
            );
        }
        const imageUrl = `${process.env["HOST"]}/api/image?id=${poll.id}&results=${results ? "false" : "true"
            }&date=${Date.now()}${fid > 0 ? `&fid=${fid}` : ""}`;
        let button1Text = "View Results";
        if (!voted && !results) {
            button1Text = "Back";
        } else if (voted && !results) {
            button1Text = "Already Voted";
        } else if (voted && results) {
            button1Text = "View Results";
        }

        // Return an HTML response
        res.setHeader("Content-Type", "text/html");
        res.status(200).send(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>Vote Recorded</title>
          <meta property="og:title" content="Vote Recorded">
          <meta property="og:image" content="${imageUrl}">
          <meta name="fc:frame" content="vNext">
          <meta name="fc:frame:image" content="${imageUrl}">
          <meta name="fc:frame:post_url" content="${process.env["HOST"]}/api/vote?id=${poll.id}&voted=true&results=${results ? "false" : "true"
            }">
          <meta name="fc:frame:button:1" content="${button1Text}">
          <meta name="fc:frame:button:2" content="Create your poll">
          <meta name="fc:frame:button:2:action" content="post_redirect">
        </head>
        <body>
          <p>${results || voted
                ? `You have already voted. You clicked ${buttonId}`
                : `Your vote for ${buttonId} has been recorded for fid ${fid}.`
            }</p>
        </body>
      </html>
    `);
    } catch (error) {
        console.error(error);
        return NextResponse.json(
            {
                status: 500,
            },
        );
    }

}
