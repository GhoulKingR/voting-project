"use client";
import { Section3 } from "@/libs/VoteComponents";
import Chart from "@/libs/Chart";
import { Election, User } from "@/database";

type Props = {
	e: Election,
	user: User,
	markAsClosed: (id: number) => Promise<void>
};

export default function CandidateEntry({ e, user, markAsClosed }: Props) {
	  const data = e.candidates.map((candidate) => ({
		  group: candidate.name,
		  value: e.vote.filter(v => v === candidate.id).length,
	  }));

	  const leading = data.sort((a, b) => b.value - a.value)[0];
	  const userVoted = e.voted.indexOf((user as any).id);
	  const isAdmin = user.admin === 1;

	  const candidates: { [key: string]: string } = {};
	  for (let candidate of e.candidates) {
		  candidates[candidate.id] = candidate.name;
	  }

	return (
		<Section3 className="py-[60px]">
		  <div className="xl:flex justify-between mx-auto w-[80%] max-w-[1100px]">
			  <div>
				  <div className="h-fit font-bold text-[40px] leading-[48px]">{e.title}{e.closed && " (Closed)"}</div>
				  {leading.value !== 0 && <p
					  className="h-fit font-normal text-[16px] leading-[24px] text-[#00000080]"
					  >{e.closed ? "Outcome" : "Leading"}: {leading.group} (with {leading.value} {leading.value === 1 ? "vote" : "votes"})</p>}

				  <div className="h-fit mt-[15px]">
					<h2>Candidates:</h2>
					<ul className="list-disc list-inside">
						{data.map((d, i) => {
							return (
								<li key={i}>{d.group} ({d.value} {d.value === 1 ? "vote" : "votes"}){userVoted !== -1 && candidates[e.vote[userVoted]] === d.group && <b>(You voted)</b>}</li>
							);
						})}
					</ul>
				  </div>

				  {isAdmin && !e.closed &&	
					<button onClick={async () => {
					  await markAsClosed(parseInt(e.id));
				  }} className="mt-[20px] bg-[#0FACFF] text-white p-[12px] font-medium text-[16px] leading-[24px] rounded-[8px]">
					  Close election
					</button>
				  }
			  </div>

			  <div className="overflow-x-scroll ml-[40px]">
				<div className="w-[80%] min-w-[768px] max-w-[1100px] h-fit mx-auto mb-[60px]">
				  <Chart data={data} />
				</div>
			  </div>
		  </div>
	   </Section3>
	);
}
