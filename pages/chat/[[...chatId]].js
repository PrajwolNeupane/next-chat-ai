import Head from "next/head";

export default function Page() {
  return (
    <>
      <Head>
        <title>New Chat</title>
      </Head>
      <div className="grid h-screen grid-cols-[260px_1fr]">
        <div>
Sibar
        </div>
        <div className="bg-gray-700 flex flex-col">
          <div className="flex-1">Chat Window</div>
          <footer className="bg-gray-800 p-10">footer</footer>
        </div>
      </div>
    </>
  );
}
