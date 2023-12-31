import { getSession } from "@auth0/nextjs-auth0";
import { useUser } from "@auth0/nextjs-auth0/client";
import Head from "next/head";
import Link from "next/link";

export default function Home() {

  const { isLoading, error, user } = useUser();

  if (isLoading) return <div>Loading...</div>
  if (error) return <div>{error.message}</div>

  return (
    <>
      <Head>
        <title>Chat AI - Login or Signup</title>
      </Head>
      <div className="flex justify-center items-center min-h-screen w-full bg-gray-800 text-white text-center">
        <div>
          {
            !!user && <Link href={"/api/auth/logout"}>LogOut</Link>
          }
          {
            !user && <>
            <Link className="btn" href={"/api/auth/login"}>Login</Link>
            <Link className="btn" href={"/api/auth/signup"}>Signup</Link>
            </>
          }
        </div>
      </div>
    </>
  );
}
export  const getServerSideProps = async(ctx) => {
  const session = await getSession(ctx.req,ctx.res);
  if(!!session){
    return {
      redirect:{
        destination:"/chat"
      }
    }
  }
  return {
    props:{}
  }
}