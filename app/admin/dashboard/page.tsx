import Image from "next/image";
import Link from "next/link";
import RestOfPage from "@/libs/RestOfPage";
import VoteResult from "@/libs/VoteResults";
import { redirect } from "next/navigation";
import {
  Section1,
  Section2,
  Section3,
  Section4,
} from "@/libs/AdminDashboardComponents";
import { validateToken } from "@/libs/JWTUtility";
import { cookies } from "next/headers";
import { addCandidate, addElection, User } from "@/database";
import CreateElection from "@/libs/CreateElection";

export default async function Dashboard({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string }>;
}) {
  let user = null;
  try {
    user = validateToken((await cookies()).get("token")!.value) as User;
  } catch (error) {
    console.log(error);
    redirect("/");
  }
  if (!user.admin) redirect("/dashboard");

  const message = (await searchParams).message || null;

  const electionTypes = [
    { id: 0, name: "Department Executives" },
    { id: 1, name: "Class Representatives" },
    { id: 2, name: "Student Council" },
    { id: 3, name: "Other" },
  ];

  async function addElectionSubmit(formdata: FormData) {
    "use server";
	const electionType = formdata.get("Type of Election")?.toString();
	if (electionType === undefined) redirect("/admin/dashboard/?message=Election+type+required");

	const electionTitle = formdata.get("title")?.toString();
	if (electionTitle === undefined) redirect("/admin/dashboard/?message=Election+type+required");

	const electionid = await addElection(electionTitle, electionTypes[parseInt(electionType)].name);
	for (let i = 0;; i++) {
		const candidate = formdata.get(`candidate-${i}`)?.toString();
		if (candidate) {
			await addCandidate(candidate, electionid);
		} else break;
	}
	redirect("/admin/dashboard/?message=Election+added+successfully");
  }

  return (
    <RestOfPage>
	  {message && <div className="hidden" onLoad={() => alert(`${message}`)}></div>}
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
              {user.name}
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

      <CreateElection addElection={addElectionSubmit} electionTypes={electionTypes} />

      <Section3 className="py-[60px]">
        <VoteResult />
      </Section3>
    </RestOfPage>
  );
}
