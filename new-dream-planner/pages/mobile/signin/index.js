import { signIn, signOut, useSession } from "next-auth/react";

export default function Signin() {
  const { data: session, status } = useSession();
  const loading = status === "loading";

  if (loading) {
    return <div>loading...</div>;
  }

  return (
    <>
      {!session && (
        <>
          Not signed in <br />
          <button onClick={() => signIn()}>Sign in</button>
        </>
      )}
      {session && (
        <>
          Signed in as {session.user.name} <br />
          <button onClick={() => signOut()}>Sign out</button>
        </>
      )}
    </>
  );
}
