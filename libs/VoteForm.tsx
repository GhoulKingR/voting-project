"use client";
import CandidateSelect from "./CandidateSelect";
import styled from "styled-components";
import { useRef, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import logout from "./logoutAction";

type Props = {
  submitVote: any;
  candidates: {
    role: string;
    candidates: { id: number; name: string }[];
    selected: number;
  }[];
};

export default function VoteForm({ submitVote, candidates }: Props) {
  const [dialogInfo, setDialogInfo] = useState<any>({});
  const [showThanks, setShowThanks] = useState(false);
  const formData = useRef<FormData>(null);
  const router = useRouter();

  return (
    <Section2 className="py-[60px]">
      <h1 className="text-center font-bold text-[40px] leading-[48px] mb-[24px]">
        Cast Your Vote
      </h1>
      <small className="block text-center font-normal text-[16px] leading-[24px] mb-[33px]">
        Select your preferred candidate below
      </small>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          const newInfo: any = { dialog: true, data: {} };

          const formdata = new FormData(e.currentTarget);
		  console.log([...formdata.keys()], [...formdata.values()]);
          formData.current = formdata;
          for (let c of candidates) {
            for (let cc of c.candidates) {
              if (cc.id.toString() === formdata.get(c.role)?.toString()) {
                newInfo["data"][c.role] = cc.name;
                break;
              }
            }
          }

          setDialogInfo(newInfo);
        }}
        className="grid grid-cols-1 md:grid-cols-2 max-w-[968px] w-[90%] mx-auto gap-x-[80px] gap-y-[40px] mb-[40px]"
      >
        {candidates.map((roles, i) => {
          return (
            <CandidateSelect
              role={roles.role}
              key={i}
              candidates={roles.candidates}
            />
          );
        })}

        <button
          type="submit"
          className="md:col-span-2 vote-button py-[12px] px-[85px] mx-auto block rounded-[8px] font-semibold text-[16px] text-white"
        >
          Submit Vote
        </button>
      </form>

      {dialogInfo?.dialog && (
        <Dialog
          id="dialog"
          className="fixed top-0 left-0 w-screen bg-[#0000008c] h-screen flex justify-center items-center"
        >
          <div className="w-[1109px] bg-white pt-[104px] pb-[133px] rounded-[50px]">
            <h1 className="leading-[48px] text-[30px] font-bold text-center mb-[50px]">
              Confirm your vote
            </h1>

            <table className="ml-[294px]">
              <tbody>
                {Object.keys(dialogInfo.data).map((role, i) => {
                  return (
                    <tr key={i}>
                      <td className="font-medium inline-block pr-[29px]">
                        {role}:
                      </td>
                      <td>{dialogInfo.data[role]}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>

            <div className="flex justify-center mt-[55px]">
              <button
                onClick={() => setDialogInfo({})}
                className="cursor-pointer text-[#0FACFF] edit-button mx-[17px] w-[240px] p-[12px] text-[16px] leading-[24px] font-medium rounded-[8px]"
              >
                Edit
              </button>
              <button
                onClick={() => {
                  submitVote(formData.current);
                  setDialogInfo({});
                  setShowThanks(true);
                }}
                className="cursor-pointer text-white bg-[#0FACFF] mx-[17px] w-[240px] p-[12px] text-[16px] leading-[24px] font-medium rounded-[8px]"
              >
                Confirm
              </button>
            </div>
          </div>
        </Dialog>
      )}
      {showThanks && (
        <Dialog
          id="thanksDialog"
          className="fixed top-0 left-0 bg-[#0000008c] w-screen h-screen flex justify-center items-center"
        >
          <div className="w-[1109px] bg-white pt-[55px] pb-[133px] rounded-[50px]">
            <h1 className="leading-[48px] text-[30px] font-bold text-center mb-[10px]">
              Thanks for voting!
            </h1>
            <Image
              src="/images/verified-check-bold.svg"
              alt="verified"
              className="w-[259px] h-[259px] mx-auto"
              width={259}
              height={259}
            />
            <small className="block text-center font-medium text-[18px] leading-[48px]">
              Your vote has been recorded successfully.
            </small>

            <div className="flex justify-center mt-[42px]">
              <button
                onClick={logout}
                className="cursor-pointer text-[#0FACFF] edit-button mx-[17px] w-[240px] p-[12px] text-[16px] leading-[24px] font-medium rounded-[8px]"
              >
                Logout
              </button>
              <button
                onClick={() => router.push("/dashboard")}
                className="cursor-pointer text-white bg-[#0FACFF] mx-[17px] w-[240px] p-[12px] text-[16px] leading-[24px] font-medium rounded-[8px]"
              >
                Go Home
              </button>
            </div>
          </div>
        </Dialog>
      )}
    </Section2>
  );
}

const Dialog = styled.div`
  backdrop-filter: blur(6px);
  z-index: 1000;

  .edit-button {
    border: 1.5px solid #0facff;
  }
`;

const Section2 = styled.section`
  border-top: 1px solid #0000001a;
  border-bottom: 1px solid #0000001a;

  .vote-button {
    background: rgba(15, 172, 255, 0.65);
  }
`;
