import { OpenAIEdgeStream } from "openai-edge-stream";

export const config = {
    runtime: "edge"
};

export default async function handler(req) {
    try {
        const { message } = await req.json();
        if (message) {

            const stream = await OpenAIEdgeStream("https://api.openai.com/v1/chat/completions", {
                headers: {
                    'content-type': 'application/json',
                    Authorization: `Bearer ${process.env.OPENAI_API_KEY}`
                },
                method: "POST",
                body: JSON.stringify({
                    model: "gpt-3.5-turbo",
                    messages: [{ content: message, role: "user" }],
                    stream: true
                })
            });

            return new Response(stream);
        }
        else {
            return new Response.json({ error: "No Message" })
        }

    } catch (e) {
        console.log("Error on Sending Message |");
        console.log(e);
        return new Response.json({ error: e })
    }


}