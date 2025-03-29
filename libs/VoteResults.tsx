import { useState } from "react";
import { SimpleBarChart } from "@carbon/charts-react";
import { options } from "@/libs/bar-options";

export default function VoteResult() {
  const [data, setData] = useState([
    {
      group: "Person 1",
      value: 65000,
    },
    {
      group: "Person 2",
      value: 29123,
    },
    {
      group: "Person 3",
      value: 35213,
    },
    {
      group: "Person 4",
      value: 51213,
    },
    {
      group: "Person 5",
      value: 16932,
    },
  ]);

  return (
    <>
      <div className="overflow-x-scroll">
        <div className="w-[80%] min-w-[768px] max-w-[1100px] h-fit mx-auto mb-[60px]">
          <SimpleBarChart data={data} options={options}></SimpleBarChart>
        </div>
      </div>
      <div className="py-[20px] flex justify-between w-[90%] max-w-[1100px] mx-auto">
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
            Leading for President
          </p>
        </div>
      </div>
    </>
  );
}
