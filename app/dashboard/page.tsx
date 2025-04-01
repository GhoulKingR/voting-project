import Image from "next/image";
import Link from "next/link";
import RestOfPage from "@/libs/RestOfPage";
import VoteResult from "@/libs/VoteResults";
import { redirect } from "next/navigation";
import { Section1, Section3 } from "@/libs/DashboardComponents";
import { cookies } from "next/headers";
import { validateToken } from "@/libs/JWTUtility";
import { User } from "@/database";
import { Section4 } from "@/libs/AdminDashboardComponents";

export default async function Dashboard() {
  let user = null;
  try {
    user = validateToken((await cookies()).get("token")!.value) as User;
  } catch (error) {
    console.log(error);
    redirect("/");
  }
  if (user.admin) redirect("/admin/dashboard");

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

	  {/*<Section2 className="p-[60px] text-center">
        <h1 className="font-bold text-[40px] leading-[48px] text-[#0FACFF] mb-[24px]">
          Upcoming elections
        </h1>
        <p className="font-normal text-[16px] leading-[24px] mb-[60px]">
          Stay informed about upcoming voting events in the Computer Science
          Department
        </p>
        <div className="py-[20px] flex flex-col lg:flex-row justify-between w-[90%] max-w-[1100px] mx-auto">
          <Link
            href="/profiles"
            className="flex text-left vote-card w-full mb-[20px] lg:mb-0 lg:w-[46%] lg:max-w-[530px]"
          >
            <Image
              src="/images/candidate-profiles.png"
              width={100}
              height={100}
              alt="profiles"
              className="mr-[16px] w-[100px] h-[100px]"
            />
            <div>
              <h2 className="font-medium text-[20px] leading-[28px] mb-[8px]">
                Candidate Profiles
              </h2>
              <p className="font-normal text-[16px] leading-[24px] mb-[8px]">
                Explore detailed profiles of the candidates running for office
              </p>
              <p className="tracking-[8px]">🗳️ 📆</p>
            </div>
          </Link>
          <Link
            href="/schedules"
            className="flex text-left vote-card w-full lg:w-[46%] lg:max-w-[530px]"
          >
            <Image
              src="/images/voting-schedules.png"
              width={100}
              height={100}
              alt="schedules"
              className="mr-[16px] w-[100px] h-[100px]"
            />
            <div>
              <h2 className="font-medium text-[20px] leading-[28px] mb-[8px]">
                Voting Schedule
              </h2>
              <p className="font-normal text-[16px] leading-[24px] mb-[8px]">
                View the dates and times for upcoming voting sessions
              </p>
              <p className="tracking-[8px]">🗳️ 📆</p>
            </div>
          </Link>
        </div>
      </Section2>*/}

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

      <Section3 className="py-[60px]">
        <p className="text-center mb-[24px]">
          Click Here to Vote For Eligible Candidates
        </p>
        <div className="text-center mb-[60px]">
          <Link
            href="/vote"
            className="vote-button py-[12px] px-[85px] mx-auto inline-block rounded-[8px] font-semibold text-[16px]"
          >
            Vote Now
          </Link>
        </div>
        <VoteResult />
      </Section3>
    </RestOfPage>
  );
}
