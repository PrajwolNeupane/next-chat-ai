import Head from "next/head";
import { ChatSideBar } from "components";
import { useState } from "react";
import { streamReader } from "openai-edge-stream";
import { v4 as uuid } from 'uuid';

export default function ChatPage() {

  const [inComingMessage, setInComingMessage] = useState("");
  const [messageText, setMessageText] = useState("");
  // const [newChatMessages, setNewChatMessages] = useState([]);


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
          'content-type': "application/json",
          //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
          Authorization: `Bearer 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`
        },
        body: JSON.stringify({
          model: "gpt-3.5-turbo",
          message: [{ content: messageText, role: "user" }]
        })
      })
      const data = await response.json();
      console.log(data);
    } catch (e) {
      console.log(e);
    }
  }

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   try {
  //     // setNewChatMessages(prev => {
  //     //   const newChatMessage = [...prev, {
  //     //     _id: uuid,
  //     //     role: 'user',
  //     //     content: messageText
  //     //   }]
  //     // })
  //     console.log(messageText)
  //     const response = await fetch(`/api/chat/sendmessage`,
  //       {
  //         method: "POST",
  //         headers: {
  //           'content-type': "application/json"
  //         },
  //         body: JSON.stringify({
  //           message: messageText
  //         })
  //       });
  //     const data = response.body
  //     if (!data) {
  //       console.log("No Data");
  //       console.log(data);
  //       return;
  //     }
  //     const reader = data.getReader();
  //     await streamReader(reader,  (message) => {
  //       console.log(message);
  //       setInComingMessage(s => `${s}${message.content}`);
  //     })
  //   }catch(e){
  //     console.log(e);
  //   }
  // }

  return (
    <>
      <Head>
        <title>New Chat</title>
      </Head>
      <div className="grid h-screen grid-cols-[260px_1fr]">
        <ChatSideBar />
        <div className="bg-gray-700 flex flex-col">
          <div className="flex-1 text-white">
            {inComingMessage}
          </div>
          <footer className="bg-gray-800 p-10">
            <form onSubmit={handleSubmit}>
              <fieldset className="flex gap-2">
                <textarea
                  value={messageText}
                  onChange={e => setMessageText(e.target.value)}
                  className="w-full resize-none rounded-md bg-gray-700 p-2 text-white focus:border-emerald-500 focus:bg-gray-600 focus:outline focus:outline-emerald-500" placeholder="Send a message..." />
                <button type="submit" className="btn">Send</button>
              </fieldset>
            </form>
          </footer>
        </div>
      </div>
    </>
  );
}
