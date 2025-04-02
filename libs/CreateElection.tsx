"use client";

import Image from "next/image";
import styled from "styled-components";
import CandidateSelect from "@/libs/CandidateSelect";
import { useState } from "react";

type Props = {
  addElection: any;
  electionTypes: any;
};

export default function CreateElection({ addElection, electionTypes }: Props) {
  const [candidates, setCandidates] = useState<number[]>([]);

  return (
    <Section className="p-[60px]">
      <div className="max-w-[1142px] mx-auto">
        <div className="relative md:py-[42px] mb-[60px]">
          <h1
            id="create-election"
            className="font-semibold text-[30px] mb-[12px]"
          >
            Create New Election
          </h1>
          <small className="font-normal text-[16px] leading-[24px] block mb-[20px]">
            Set up a new voting campaign
          </small>
          <Image
            src="/images/dfdb19370609486ee24c91b0228efdd2.jpeg"
            alt="vote"
            width={4096}
            height={4096}
            className="hidden w-[180px] h-[180px] md:block absolute bottom-0 right-0"
          />
        </div>

        <form
          action={addElection}
          className="grid grid-cols-1 md:grid-cols-2 gap-y-[12px] md:gap-y-[40px] gap-x-[80px]"
        >
          <div>
            <label
              htmlFor="election-title"
              className="block font-semibold text-[14px] leading-[20px] mb-[4px]"
            >
              Election Title
            </label>
            <input
              type="text"
              placeholder="Enter title..."
              id="election-title"
              name="title"
              className="py-[8px] px-[16px] w-full rounded-[6px]"
              required={true}
            />
          </div>
          <div>
            <div className="grid grid-cols-2 xl:grid-cols-4 gap-[8px]">
              <CandidateSelect
                role="Type of Election"
                candidates={electionTypes}
              />
            </div>
          </div>
          <div className="md:col-span-2">
            {candidates.map((_, i) => (
              <div key={i}>
                <label
                  htmlFor={`can${i}`}
                  className="font-medium text-[14px] leading-[20px] block"
                >
                  Candidate {i + 1}
                </label>
                <input
                  id={`can${i}`}
                  placeholder="Enter candidate's name..."
                  name={`candidate-${i}`}
                  className="py-[8px] px-[16px] w-full block max-w-[1142px] mx-auto mb-[20px] rounded-[6px]"
                  required={true}
                />
              </div>
            ))}
          </div>
          <div className="md:col-span-2 flex justify-center">
            <button
              onClick={() => setCandidates([...candidates, 0])}
              className="bg-[#0FACFF] rounded-[8px] p-[12px] font-medium text-[16px] leading-[24px] text-white"
            >
              Add Candidate Details
            </button>
            {candidates.length > 0 && (
              <button
                type="submit"
                className="bg-[#0FACFF] rounded-[8px] p-[12px] ml-[20px] font-medium text-[16px] leading-[24px] text-white"
              >
                Create Election
              </button>
            )}
          </div>
        </form>
      </div>
    </Section>
  );
}

const Section = styled.section`
  #election-title {
    border: 1px solid #0000001a;
  }

  .type-selected {
    background: #0000002d;
  }
`;
