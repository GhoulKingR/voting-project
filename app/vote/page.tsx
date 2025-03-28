"use client";
import styled from "styled-components";
import '@carbon/charts-react/styles.css'
import RestOfPage from "@/libs/RestOfPage";
import VoteResult from "@/libs/VoteResults";
import { Dispatch, RefObject, SetStateAction, useRef, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

type Candidate = {
	role: string,
	candidates: string[],
	selected: number,
};

function candidateClickFactory(candidate: number, role: number, candidates: Candidate[], setCandidates: Dispatch<SetStateAction<Candidate[]>>) {
	return () => {
		const newCandidates = [...candidates];
		if (newCandidates[role].selected === candidate) {
			newCandidates[role].selected = -1;
		} else {
			newCandidates[role].selected = candidate;
		}
		setCandidates(newCandidates);
	};
}

function editButtonFactory(dialog: RefObject<HTMLDialogElement | null>): any {
	return () => {
		dialog.current?.close();
		if (dialog.current) dialog.current.style.display = "none";
	}
}

function submitVoteFactory(dialog: RefObject<HTMLDialogElement | null>, candidates: Candidate[]): any {
	return () => {
		if (candidates.filter(c => c.selected !== -1).length === 0) {
			alert("Select at least one candidate");
		} else {
			if (dialog.current) dialog.current.style.display = "flex";
			dialog.current?.showModal();
		}
	}
}

function confirmButtonFactory(thanksDialog: RefObject<HTMLDialogElement | null>, dialog: RefObject<HTMLDialogElement | null>, candidates: Candidate[]): any {
	return () => {
		if (candidates.filter(c => c.selected !== -1).length === 0) {
			alert("Select at least one candidate");
		} else {
			dialog.current?.close();
			if (dialog.current) dialog.current.style.display = "none";

			if (thanksDialog.current) thanksDialog.current.style.display = "flex";
			thanksDialog.current?.showModal();
		}
	}
}

export default function Vote() {
  const [candidates, setCandidates] = useState<Candidate[]>([
    { role: "President", candidates: ["Bukola Ajay", "Akinola Right", "Ashley John"], selected: -1 },
    { role: "Vice President", candidates: ["Enitan Akanbi", "Eniola Eniori", "Emmanuel Samide"], selected: -1 },
    { role: "Secretary", candidates: ["Balqis Michael", "Esther John", "Shade Ruth"], selected: -1 },
    { role: "Treasurer", candidates: ["Alex Johnson", "Sarah Chinedu", "Kelvinson Isaac"], selected: -1 },
  ]);
  
  const dialog = useRef<HTMLDialogElement>(null);
  const thanksDialog = useRef<HTMLDialogElement>(null);
  const router = useRouter();

  return (
	  <>
		<RestOfPage>
			<section className="pb-[73px] pt-[60px]">
			  <h1 className="text-center font-bold text-[40px] leading-[48px] mb-[24px]">Voting Instructions</h1>
			  <small className="block text-center font-normal text-[16px] leading-[24px] mb-[33px]">Please follow the instructions below to ensure a smooth and fair election.</small>
			  <p className="font-normal text-[18px] leading-[24px] tracking-[1%] mx-auto w-[90%] max-w-[1206px]">
				✅ Check Your Eligibility - Ensure you are registered to this present session and have access to your registered email/ID.<br />
				✅ Access the Voting Portal - Click on the official voting button.<br />
				✅ Cast Your Vote - Select your preferred candidates, review your choices carefully, and submit your vote.<br />
				✅ Maintain Security & Fairness - Do not share your login details, vote only once, and avoid influencing others.<br />
				✅ Confirmation - After submitting, check for a confirmation message or email.<br />
				🕒 Voting Deadline: Friday, 28th March, 2025<br /><br />
				For any issues or inquiries, please contact James Ade on 08122993394 or send an email to vote@unilag.edu<br />
				Let your voice be heard—vote responsibly!<br /><br />
				Computer Science Election Committee<br />
			  </p>
			</section>

			<Section2 className="py-[60px]">
			  <h1 className="text-center font-bold text-[40px] leading-[48px] mb-[24px]">Cast Your Vote</h1>
			  <small className="block text-center font-normal text-[16px] leading-[24px] mb-[33px]">Select your preferred candidate below</small>

			  <div className="grid grid-cols-1 md:grid-cols-2 md:grid-rows-2 max-w-[968px] w-[90%] mx-auto gap-x-[80px] gap-y-[40px] mb-[40px]">
				{candidates.map((roles, i) => {
				  return <div key={i}>
					<div className="font-medium text-[14px] leading-[20px]">{roles.role}</div>
					<div className="flex">
					  {roles.candidates.map((candidate, j) => (
						  <div 
								key={j}
								onClick={candidateClickFactory(j, i, candidates, setCandidates)}
								className={`p-[8px] bg-[#0FACFF26] cursor-pointer rounded-[6px] mr-[8px] ${roles.selected === j ? "can-selected" : ""}`}
						  >{candidate}</div>
					  ))}
					</div>
				  </div>
				})}
			  </div>

			  <button onClick={submitVoteFactory(dialog, candidates)} className="vote-button py-[12px] px-[85px] mx-auto block rounded-[8px] font-semibold text-[16px] text-white">Submit Vote</button>
			</Section2>

			<Section3 className="py-[60px]">
			  <h1 className="text-center font-bold text-[40px] leading-[48px] mb-[24px]">Voting Stats</h1>
			  <small className="block text-center font-normal text-[16px] leading-[24px] mb-[33px]">Track the voting turnout and results</small>
			  <button className="vote-button py-[12px] px-[85px] mx-auto block rounded-[8px] font-semibold text-[16px] text-white mb-[60px]">View Details</button>

			  <VoteResult />
			</Section3>
		</RestOfPage>

		<Dialog ref={dialog} className="w-screen h-screen flex justify-center items-center">
			<div className="w-[1109px] bg-white pt-[104px] pb-[133px] rounded-[50px]">
				<h1 className="leading-[48px] text-[30px] font-bold text-center mb-[50px]">Confirm your vote</h1>
				
				<table className="ml-[294px]">
					<tbody>
					{candidates.filter(c => c.selected !== -1).map((c, i) => (
						<tr key={i}>
							<td className="font-medium inline-block pr-[29px]">{c.role}:</td>
							<td>{c.candidates[c.selected]}</td>
						</tr>
					))}
					</tbody>
				</table>

				<div className="flex justify-center mt-[55px]">
					<button onClick={editButtonFactory(dialog)} className="cursor-pointer text-[#0FACFF] edit-button mx-[17px] w-[240px] p-[12px] text-[16px] leading-[24px] font-medium rounded-[8px]">Edit</button>
					<button onClick={confirmButtonFactory(thanksDialog, dialog, candidates)} className="cursor-pointer text-white bg-[#0FACFF] mx-[17px] w-[240px] p-[12px] text-[16px] leading-[24px] font-medium rounded-[8px]">Confirm</button>
				</div>
			</div>
		</Dialog>


		<Dialog ref={thanksDialog} className="w-screen h-screen flex justify-center items-center">
			<div className="w-[1109px] bg-white pt-[55px] pb-[133px] rounded-[50px]">
				<h1 className="leading-[48px] text-[30px] font-bold text-center mb-[10px]">Thanks for voting!</h1>
				<Image src="/images/verified-check-bold.svg" alt="verified" className="w-[259px] h-[259px] mx-auto" width={259} height={259} />
				<small className="block text-center font-medium text-[18px] leading-[48px]">Your vote has been recorded successfully.</small>

				<div className="flex justify-center mt-[42px]">
					<button className="cursor-pointer text-[#0FACFF] edit-button mx-[17px] w-[240px] p-[12px] text-[16px] leading-[24px] font-medium rounded-[8px]">Logout</button>
					<button onClick={() => router.push("/dashboard")} className="cursor-pointer text-white bg-[#0FACFF] mx-[17px] w-[240px] p-[12px] text-[16px] leading-[24px] font-medium rounded-[8px]">Go Home</button>
				</div>
			</div>
		</Dialog>
	</>
  );
}

const Dialog = styled.dialog`
	background: none;
	
	&::backdrop {
		background: #0000008C;
		backdrop-filter: blur(6px);
		display: flex;
		align-items: center;
	}

	.edit-button {
		border: 1.5px solid #0FACFF;
	}
`;

const Section2 = styled.section`
  border-top: 1px solid #0000001A;

  .vote-button {
    background: rgba(15, 172, 255, 0.65);
  }

  .can-selected {
 	background: #0FACFF80;
  }
`;

const Section3 = styled.section`
  border-top: 1px solid #0000001A;
  border-bottom: 1px solid #0000001A;

  .vote-button {
    background: rgba(15, 172, 255, 0.65);
  }

  .vote-card {
    border: 1px solid rgba(0,0,0,.1);
    padding: 16px;
  }
`;
