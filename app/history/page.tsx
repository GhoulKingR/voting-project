"use server";
import RestOfPage from "@/libs/RestOfPage";
import { redirect } from "next/navigation";
import { closeElection, getElection, User } from "@/database";
import { validateToken } from "@/libs/JWTUtility";
import { cookies } from "next/headers";
import CandidateEntry from "@/libs/CandidateEntry";

export default async function Vote() {
  let user = null;

  try {
    user = validateToken((await cookies()).get("token")!.value) as User;
  } catch (error) {
    console.log(error);
    redirect("/?error=You+have+to+log+in+first");
  }

  const election = (await getElection()).reverse();

  async function markAsClosed(id: number) {
    "use server";
    closeElection(id);
    redirect("/history");
  }

  return (
    <RestOfPage>
      {[
        ...election.filter((e) => !e.closed),
        ...election.filter((e) => e.closed),
      ].map((e, i) => {
        return (
          <CandidateEntry
            e={e}
            key={i}
            user={user}
            markAsClosed={markAsClosed}
          />
        );
      })}
    </RestOfPage>
  );
}
