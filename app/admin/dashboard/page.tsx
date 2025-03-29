"use client";
import Image from "next/image";
import Link from "next/link";
import styled from "styled-components";
import "@carbon/charts-react/styles.css";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import RestOfPage from "@/libs/RestOfPage";
import VoteResult from "@/libs/VoteResults";
import { decode } from "@/libs/ClientJWTUtility";
import { useRouter } from "next/navigation";

export default function Dashboard() {
  const electionTypes = [
    "Department Executives",
    "Class Representatives",
    "Student Council",
    "Other",
  ];
  const router = useRouter();
  const [selectedType, setSelectedType] = useState(-1);
  const [user, setUser] = useState<any>({});

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token !== null) {
      fetch("/api/validate", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ token }),
      })
        .then((res) => {
          if (res.status === 200) {
            try {
              if (!decode(token).admin) {
			  	localStorage.removeItem("token");
              	router.push("/admin/login");
			  }
            } catch (error) {
              localStorage.removeItem("token");
			  router.push("/admin/login");
            }
          } else {
			  localStorage.removeItem("token");
			  router.push("/admin/login");
		  }
        })
        .catch(console.error);
    }
  }, []);
  
  useEffect(() => {
	  const token = localStorage.getItem("token");
	  if (token) {
		  setUser(decode(token));
	  }
  }, []);

  return (
    <RestOfPage>
      <Section1 className="p-[60px] text-white text-center -z-1">
        <h1 className="font-bold text-[40px] max-w-[520px] mx-auto mb-[24px]">
          Welcome to CSC Dept. Voting Platform
        </h1>
        <p className="font-normal text-[16px] leading-[24px] mb-[24px]">
          Make your voice heard in the departmental elections
        </p>
        <Link
          id="vote"
          href="/vote"
          className="py-[12px] px-[85px] rounded-[8px] font-semibold text-[16px]"
        >
          Vote Now
        </Link>
      </Section1>

      <Section2 className="p-[60px]">
        <div className="md:flex max-w-[1100px] mx-auto">
          <div className="w-[100px] h-[100px] md:shrink md:mr-[40px] overflow-hidden rounded-full mx-auto mb-[20px]">
            <Image
              src="/images/ee333e8303e64acb89df863cbb2b6369.png"
              alt="avatar"
              width={172}
              height={256}
            />
          </div>
          <div className="md:flex-grow md:mr-[40px]">
            <h1 className="font-bold text-[24px] leading-[32px] mb-[12px]">
				{ user.name }
            </h1>
            <small className="bg-[#D9D9D980] px-[4px] inline-block py-[2px] rounded-[2px] admin-box mb-[12px]">
              Admin
            </small>
            <br />
            <small className="font-normal text-[16px] leading-[24px] text-black">
              Manage the voting process efficiently
            </small>
          </div>
          <div className="mt-[50px] md:mt-0 flex flex-col items-center">
            <button className="bg-[#0FACFF] text-white p-[12px] font-medium text-[16px] leading-[24px] rounded-[8px] mb-[12px]">
              Create New Election
            </button>
            <button className="bg-[#0FACFF] text-white p-[12px] font-medium text-[16px] leading-[24px] rounded-[8px]">
              View Voting Result
            </button>
          </div>
        </div>
      </Section2>

      <Section4 className="text-center py-[60px]">
        <h1 className="font-bold text-[40px] leading-[48px] text-[#0FACFF] mb-[24px] xl:mb-[60px]">
          Election categories
        </h1>
        <ul className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-[40px] mx-auto size-fit">
          <li className="w-[340px] relative rounded-[6px] overflow-hidden">
            <small className="absolute top-0 left-0 text-white rounded-br-[6px] bg-[#FFFFFF40] py-[4px] px-[8px]">
              Open for voting
            </small>
            <Image
              src="/images/b3fbd77af320cbc6733513de531e033a.png"
              alt="vote logo"
              className="w-[340px] h-[340px]"
              width={340}
              height={340}
            />
            <div className="flex flex-col items-start p-[12px]">
              <small className="font-normal text-[16px] leading-[24px] mb-[4px]">
                Department Executives
              </small>
              <small className="font-medium text-[20px] leading-[28px]">
                4 positions open
              </small>
            </div>
          </li>
          <li className="w-[340px] relative rounded-[6px] overflow-hidden">
            <small className="absolute top-0 left-0 text-white rounded-br-[6px] bg-[#FFFFFF40] py-[4px] px-[8px]">
              Open for voting
            </small>
            <Image
              src="/images/b3fbd77af320cbc6733513de531e033a.png"
              alt="vote logo"
              className="w-[340px] h-[340px]"
              width={340}
              height={340}
            />
            <div className="flex flex-col items-start p-[12px]">
              <small className="font-normal text-[16px] leading-[24px] mb-[4px]">
                Class Representatives
              </small>
              <small className="font-medium text-[20px] leading-[28px]">
                10 positions open
              </small>
            </div>
          </li>
          <li className="w-[340px] relative rounded-[6px] overflow-hidden">
            <small className="absolute top-0 left-0 text-white rounded-br-[6px] bg-[#FFFFFF40] py-[4px] px-[8px]">
              Open for voting
            </small>
            <Image
              src="/images/b3fbd77af320cbc6733513de531e033a.png"
              alt="vote logo"
              className="w-[340px] h-[340px]"
              width={340}
              height={340}
            />
            <div className="flex flex-col items-start p-[12px]">
              <small className="font-normal text-[16px] leading-[24px] mb-[4px]">
                Student Council
              </small>
              <small className="font-medium text-[20px] leading-[28px]">
                7 positions open
              </small>
            </div>
          </li>
        </ul>
      </Section4>

      <Section5 className="p-[60px]">
        <div className="max-w-[1142px] mx-auto">
          <div className="relative md:py-[42px] mb-[60px]">
            <h1 className="font-semibold text-[30px] mb-[12px]">
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

          <form className="grid grid-cols-1 md:grid-cols-2 gap-y-[12px] md:gap-y-[40px] gap-x-[80px]">
            <div>
              <label
                htmlFor="election-title"
                className="block font-semibold text-[14px] leading-[20px] mb-[4px]"
              >
                Election Title
              </label>
              <input
                type="password"
                placeholder="Enter title..."
                id="election-title"
                className="py-[8px] px-[16px] w-full rounded-[6px]"
              />
            </div>
            <div>
              <label className="block font-semibold text-[14px] leading-[20px] mb-[4px]">
                Type of Election
              </label>
              <div className="grid grid-cols-2 xl:grid-cols-4 gap-[8px]">
                {electionTypes.map((electionType, j) => (
                  <div
                    key={j}
                    onClick={electionTypeFactory(
                      j,
                      selectedType,
                      setSelectedType,
                    )}
                    className={`p-[8px] size-fit bg-[#0000000D] font-normal text-[14px] leading-[20px] cursor-pointer rounded-[6px] mr-[8px] ${selectedType === j ? "type-selected" : ""}`}
                  >
                    {electionType}
                  </div>
                ))}
              </div>
            </div>
            <div className="md:col-span-2 flex justify-center">
              <button className="bg-[#0FACFF] rounded-[8px] p-[12px] font-medium text-[16px] leading-[24px] text-white">
                Add Candidate Details
              </button>
            </div>
          </form>
        </div>
      </Section5>

      <Section3 className="py-[60px]">
        <VoteResult />
      </Section3>
    </RestOfPage>
  );
}

function electionTypeFactory(
  clicked: number,
  selectedType: number,
  setSelectedType: Dispatch<SetStateAction<number>>,
) {
  return function () {
    if (selectedType === clicked) {
      setSelectedType(-1);
    } else {
      setSelectedType(clicked);
    }
  };
}

const Section5 = styled.section`
  #election-title {
    border: 1px solid #0000001a;
  }

  .type-selected {
    background: #0000002d;
  }
`;

const Section1 = styled.section`
  background-image: url("/images/ae3dc66705e6e9f48b0b6397b95fb991.jpeg");
  background-repeat: no-repeat;
  background-attachment: fixed;
  background-size: cover;

  #vote {
    background: rgba(15, 172, 255, 0.65);
  }
`;

const Section4 = styled.section`
  border-bottom: 1px solid #0000001a;

  li {
    border: 1px solid #0000001a;
  }
`;

const Section2 = styled.section`
  border-bottom: 1px solid #0000001a;

  .vote-card {
    border: 1px solid rgba(0, 0, 0, 0.1);
    padding: 16px;
  }

  .admin-box {
    border: 0.5px solid #0000001a;
  }
`;

const Section3 = styled.section`
  border-top: 1px solid #0000001a;
  border-bottom: 1px solid #0000001a;

  .vote-button {
    background: rgba(15, 172, 255, 0.65);
  }

  .vote-card {
    border: 1px solid rgba(0, 0, 0, 0.1);
    padding: 16px;
  }
`;
