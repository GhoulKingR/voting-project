"use client";

import { useState } from "react";
import styled from "styled-components";

type Props = {
  role: string;
  candidates: { name: string; id: number }[];
};

export default function CandidateSelect({ role, candidates }: Props) {
  const [value, setValue] = useState(-1);

  return (
    <Element>
      <label className="font-bold text-[14px] leading-[20px]">{role}</label>
      <div className="flex">
        {candidates.map((candidate, j) => (
          <div
            key={j}
            onClick={() => setValue(candidate.id)}
            className={`p-[8px] bg-[#0FACFF26] cursor-pointer rounded-[6px] mr-[8px] ${candidate.id === value ? "can-selected" : ""}`}
          >
            {candidate.name}
          </div>
        ))}
      </div>
      <input type="hidden" name={role} value={value} />
    </Element>
  );
}

const Element = styled.div`
  .can-selected {
    background: #0facff80;
  }
`;
