"use server";
import RestOfPage from "@/libs/RestOfPage";
import VoteResult from "@/libs/VoteResults";
import { redirect } from "next/navigation";
import { castVote, getElectionForUser, User } from "@/database";
import { Section3 } from "@/libs/VoteComponents";
import { validateToken } from "@/libs/JWTUtility";
import { cookies } from "next/headers";
import VoteForm from "@/libs/VoteForm";
import Link from "next/link";

export default async function Vote() {
  let user = null;

  try {
    user = validateToken((await cookies()).get("token")!.value) as User;
  } catch (error) {
    console.log(error);
    redirect("/?error=You+have+to+log+in+first");
  }

  const election = await getElectionForUser((user as any).id)
  const candidates = election.map((m) => ({
    role: m.title,
    candidates: m.candidates,
    selected: -1,
  }));
  const mappings: { [key: string]: string } = {};
  election.forEach(v => mappings[v.title] = v.id);

  if (user.admin === 1) redirect("/?error=Admins+cant+vote");

  async function submitVote(formdata: FormData) {
    "use server";
	// generate a database-side function to add a vote to the database and then attach it to this
	
	try {
		for (let key of formdata.keys()) {
			const canID = parseInt(formdata.get(key)!.toString());
			if (canID <= 0) continue;

			const elecID = parseInt(mappings[key]);
			await castVote(elecID, canID, user!.id); // Example: Election ID 1, Candidate ID 2, UserID "user123"
			console.log("Vote for", key, "casted");
		}
	  } catch (error) {
		console.error("Error:", error);
	  }
  }

  return (
    <>
      <RestOfPage>
        <section className="pb-[73px] pt-[60px]">
          <h1 className="text-center font-bold text-[40px] leading-[48px] mb-[24px]">
            Voting Instructions
          </h1>
          <small className="block text-center font-normal text-[16px] leading-[24px] mb-[33px]">
            Please follow the instructions below to ensure a smooth and fair
            election.
          </small>
          <p className="font-normal text-[18px] leading-[24px] tracking-[1%] mx-auto w-[90%] max-w-[1206px]">
            ✅ Check Your Eligibility - Ensure you are registered to this
            present session and have access to your registered email/ID.
            <br />
            ✅ Access the Voting Portal - Click on the official voting button.
            <br />
            ✅ Cast Your Vote - Select your preferred candidates, review your
            choices carefully, and submit your vote.
            <br />
            ✅ Maintain Security & Fairness - Do not share your login details,
            vote only once, and avoid influencing others.
            <br />
            ✅ Confirmation - After submitting, check for a confirmation message
            or email.
            <br />
            🕒 Voting Deadline: Friday, 28th March, 2025
            <br />
            <br />
            For any issues or inquiries, please contact James Ade on 08122993394
            or send an email to vote@unilag.edu
            <br />
            Let your voice be heard—vote responsibly!
            <br />
            <br />
            Computer Science Election Committee
            <br />
          </p>
        </section>

        <VoteForm
          submitVote={submitVote}
          candidates={candidates}
        />

        <Section3 className="py-[60px]">
          <h1 className="text-center font-bold text-[40px] leading-[48px] mb-[24px]">
            Voting Stats
          </h1>
          <small className="block text-center font-normal text-[16px] leading-[24px] mb-[33px]">
            Track the voting turnout and results
          </small>
          <Link href="/history" className="vote-button size-fit py-[12px] px-[85px] mx-auto block rounded-[8px] font-semibold text-[16px] text-white mb-[60px]">
            View Details
          </Link>

          <VoteResult />
        </Section3>
      </RestOfPage>
    </>
  );
}
