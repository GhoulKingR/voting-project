"use client";
import Image from "next/image";
import Link from "next/link";
import styled from "styled-components";
import "@carbon/charts-react/styles.css";
import { useEffect, useState } from "react";
import RestOfPage from "@/libs/RestOfPage";
import VoteResult from "@/libs/VoteResults";
import { decode } from "@/libs/ClientJWTUtility";
import { useRouter } from "next/navigation";

export default function Dashboard() {
  useEffect(() => {
    let slideIndex = 0;
    showSlides();

    function showSlides() {
      let i;
      const slides = document.getElementsByClassName("mySlides");
      const dots = document.getElementsByClassName("dot");
      for (i = 0; i < slides.length; i++) {
        // @ts-ignore
        slides[i].style.display = "none";
      }
      slideIndex++;
      if (slideIndex > slides.length) {
        slideIndex = 1;
      }
      for (i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace(" active", "");
      }
      // @ts-ignore
      slides[slideIndex - 1].style.display = "block";
      dots[slideIndex - 1].className += " active";
      setTimeout(showSlides, 6000); // Change image every 6 seconds
    }
  }, []);

  const [user, setUser] = useState<any>({});
  const router = useRouter();

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
              if (decode(token).admin) {
              	router.push("/admin/dashboard");
			  }
            } catch (error) {
              localStorage.removeItem("token");
			  router.push("/login");
            }
          } else {
			  localStorage.removeItem("token");
			  router.push("/login");
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

      <Section2 className="p-[60px] text-center">
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
      </Section2>

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

const Section1 = styled.section`
  background-image: url("/images/ae3dc66705e6e9f48b0b6397b95fb991.jpeg");
  background-repeat: no-repeat;
  background-attachment: fixed;
  background-size: cover;

  #vote {
    background: rgba(15, 172, 255, 0.65);
  }
`;

const Section2 = styled.section`
  .vote-card {
    border: 1px solid rgba(0, 0, 0, 0.1);
    padding: 16px;
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
