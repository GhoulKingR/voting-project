import { getElectionsWithVotes } from "@/database";
import Chart from "./Chart";

export default async function VoteResult() {
  const election = await getElectionsWithVotes();
  const selected = election[Math.floor((Math.random() * 10) % 4)];
  const data = selected.candidates.map((candidate) => ({
    group: candidate.name,
    value: candidate.votes,
  }));

  return (
    <>
      <div className="overflow-x-scroll">
        <div className="w-[80%] min-w-[768px] max-w-[1100px] h-fit mx-auto mb-[20px] font-bold text-[40px] leading-[48px]">
          {selected.title}
        </div>
        <div className="w-[80%] min-w-[768px] max-w-[1100px] h-fit mx-auto mb-[60px]">
          <Chart data={data} />
        </div>
      </div>
      {/*<div className="py-[20px] flex justify-between w-[90%] max-w-[1100px] mx-auto">
        <div className="text-left vote-card w-[46%] max-w-[540px] rounded-[6px]">
          <h2 className="font-normal text-[16px] leading-[24px] mb-[8px] text-[#00000080]">
            Voter Turnout
          </h2>
          <p className="font-medium text-[28px] leading-[36px] mb-[8px]">75%</p>
          <p className="font-normal text-[16px] leading-[24px]">+5%</p>
        </div>
        <div className="text-left vote-card w-[46%] max-w-[540px] rounded-[6px]">
          <h2 className="font-normal text-[16px] leading-[24px] mb-[8px] text-[#00000080]">
            Popular candidate
          </h2>
          <p className="font-medium text-[28px] leading-[36px] mb-[8px]">
            Bisola Ajay
          </p>
          <p className="font-normal text-[16px] leading-[24px]">
            Leading for {election.title}
          </p>
        </div>
      </div>*/}
    </>
  );
}
