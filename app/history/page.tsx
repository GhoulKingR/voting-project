"use server";
import RestOfPage from "@/libs/RestOfPage";
import { redirect } from "next/navigation";
import { getElection, User } from "@/database";
import { Section3 } from "@/libs/VoteComponents";
import { validateToken } from "@/libs/JWTUtility";
import { cookies } from "next/headers";
import Chart from "@/libs/Chart";

export default async function Vote() {
  let user = null;

  try {
    user = validateToken((await cookies()).get("token")!.value) as User;
  } catch (error) {
    console.log(error);
    redirect("/?error=You+have+to+log+in+first");
  }

  const election = await getElection();
  const isAdmin = user.admin === 1;

  return (
    <>
      <RestOfPage>
	  {election.map((e, i) => {
		  const data = e.candidates.map((candidate) => ({
			  group: candidate.name,
			  value: e.vote.filter(v => v === candidate.id).length,
		  }));
		  const candidates: { [key: string]: string } = {};
		  for (let candidate of e.candidates) {
			  candidates[candidate.id] = candidate.name;
		  }
		  const leading = data.sort((a, b) => b.value - a.value)[0];
		  const userVoted = e.voted.indexOf((user as any).id);

		  return (
			<Section3 className="py-[60px] " key={i}>
			  <div className="xl:flex justify-between mx-auto w-[80%] max-w-[1100px]">
				  <div>
					  <div className="h-fit font-bold text-[40px] leading-[48px]">{e.title}</div>
					  {leading.value !== 0 && <p
						  className="h-fit font-normal text-[16px] leading-[24px] text-[#00000080]"
						  >Leading: {leading.group} (with {leading.value} {leading.value === 1 ? "vote" : "votes"})</p>}

					  <p className="h-fit mt-[15px]">
						<h2>Candidates:</h2>
						<ul className="list-disc list-inside">
							{data.map((d, i) => {
								return (
									<li key={i}>{d.group} ({d.value} {d.value === 1 ? "vote" : "votes"}){userVoted !== -1 && candidates[e.vote[userVoted]] === d.group && <b>(You voted)</b>}</li>
								);
							})}
						</ul>
					  </p>

					  {isAdmin &&	
						<button className="mt-[20px] bg-[#0FACFF] text-white p-[12px] font-medium text-[16px] leading-[24px] rounded-[8px]">
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
	  })}
      </RestOfPage>
    </>
  );
}
