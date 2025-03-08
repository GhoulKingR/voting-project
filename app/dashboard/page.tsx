"use client";
import { BarChartOptions, SimpleBarChart } from "@carbon/charts-react";
import Image from "next/image";
import Link from "next/link";
import styled from "styled-components";
import '@carbon/charts-react/styles.css'
import { useEffect, useState } from "react";

const options: BarChartOptions = {
  title: 'Current voting analysis',
  legend: {
    enabled: false
  },
  axes: {
    left: {
      title: "Votes",
      mapsTo: 'value'
    },
    bottom: {
      title: "Candidates",
      mapsTo: 'group',
      scaleType: 'labels' as any
    }
  },
  getFillColor() {return "rgba(15, 172, 255, 0.50)"},
  height: '440px',
  width: '1100px',
  resizable: false,
  toolbar: {
    enabled: false,
  },
  canvasZoom: {
    enabled: false,
  },
  bars: {
    width: 94.7,
  },
  accessibility: {
    svgAriaLabel: 'Simple bar chart'
  }
};

export default function Dashboard() {
  const [data, setData] = useState([
    {
      group: 'Person 1',
      value: 65000
    },
    {
      group: 'Person 2',
      value: 29123
    },
    {
      group: 'Person 3',
      value: 35213
    },
    {
      group: 'Person 4',
      value: 51213
    },
    {
      group: 'Person 5',
      value: 16932
    }
  ]);

  useEffect(() => {
    let slideIndex = 0;
    showSlides();
    
    function showSlides() {
      let i;
      let slides = document.getElementsByClassName("mySlides");
      let dots = document.getElementsByClassName("dot");
      for (i = 0; i < slides.length; i++) {
        // @ts-ignore
        slides[i].style.display = "none";  
      }
      slideIndex++;
      if (slideIndex > slides.length) {slideIndex = 1}    
      for (i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace(" active", "");
      }
      // @ts-ignore
      slides[slideIndex-1].style.display = "block";  
      dots[slideIndex-1].className += " active";
      setTimeout(showSlides, 6000); // Change image every 6 seconds
    }
  }, []);

  return (
    <>
      <header className="flex justify-between items-center p-[20px]">
        <Link href="/dashboard" className="flex items-center">
          <Image src="/images/c4bcd117d567f60f81f40bf701cbc96f.png" alt="Logo" width={40} height={40} />
          <span className="ml-[20px] inline-block font-medium text-[28px] leading-[36px]">Unilag Departmental Voting Platform</span>
        </Link>
        <nav>
          <Link href="/dashboard" className="mr-[40px]">Home</Link>
          <Link href="/candidates" className="mr-[40px]">Candidates</Link>
          <Link href="/history" className="mr-[40px]">Voting History</Link>
          <Link href="/auth/logout" className="mr-[40px]">Logout</Link>
          <Form className="inline-flex rounded-[6px] p-[8px]">
            <input type="text" placeholder="search in site" />
            <Image src="/images/ic-search.svg" alt="Search" width={20} height={20} />
          </Form>
        </nav>
      </header>
      <main>
        <Section1 className="p-[60px] text-white text-center">
          <h1 className="font-bold text-[40px] max-w-[520px] mx-auto mb-[24px]">Welcome to CSC Dept. Voting Platform</h1>
          <p className="font-normal text-[16px] leading-[24px] mb-[24px]">Make your voice heard in the departmental elections</p>
          <Link id="vote" href="/vote" className="py-[12px] px-[85px] rounded-[8px] font-semibold text-[16px]">Vote Now</Link>
        </Section1>

        <Section2 className="p-[60px] text-center">
          <h1 className="font-bold text-[40px] leading-[48px] text-[#0FACFF] mb-[24px]">Upcoming elections</h1>
          <p className="font-normal text-[16px] leading-[24px] mb-[60px]">Stay informed about upcoming voting events in the Computer Science Department</p>
          <div className="py-[20px] flex justify-between w-[90%] max-w-[1100px] mx-auto">
            <Link href="/profiles" className="flex text-left vote-card max-w-[530px]">
              <Image src="/images/candidate-profiles.png" width={100} height={100} alt="profiles" className="mr-[16px] w-[100px] h-[100px]" />
              <div>
                <h2 className="font-medium text-[20px] leading-[28px] mb-[8px]">Candidate Profiles</h2>
                <p className="font-normal text-[16px] leading-[24px] mb-[8px]">Explore detailed profiles of the candidates running for office</p>
                <p className="tracking-[8px]">🗳️ 📆</p>
              </div>
            </Link>
            <Link href="/schedules" className="flex text-left vote-card max-w-[530px]">
              <Image src="/images/voting-schedules.png" width={100} height={100} alt="schedules" className="mr-[16px] w-[100px] h-[100px]" />
              <div>
                <h2 className="font-medium text-[20px] leading-[28px] mb-[8px]">Voting Schedule</h2>
                <p className="font-normal text-[16px] leading-[24px] mb-[8px]">View the dates and times for upcoming voting sessions</p>
                <p className="tracking-[8px]">🗳️ 📆</p>
              </div>
            </Link>
          </div>
        </Section2>

        <Section3 className="py-[60px]">
          <p className="text-center mb-[24px]">Click Here to Vote For Eligible Candidates</p>
          <div className="text-center mb-[60px]">
            <Link href="/vote" className="vote-button py-[12px] px-[85px] mx-auto inline-block rounded-[8px] font-semibold text-[16px]">Vote Now</Link>
          </div>
          <div className="w-fit h-fit mx-auto mb-[60px]">
            <SimpleBarChart data={data} options={options}></SimpleBarChart>
          </div>
          <div className="py-[20px] flex justify-between w-[90%] max-w-[1100px] mx-auto">
            <div className="text-left vote-card w-[100%] max-w-[540px] rounded-[6px]">
              <h2 className="font-normal text-[16px] leading-[24px] mb-[8px] text-[#00000080]">Voter Turnout</h2>
              <p className="font-medium text-[28px] leading-[36px] mb-[8px]">75%</p>
              <p className="font-normal text-[16px] leading-[24px]">+5%</p>
            </div>
            <div className="text-left vote-card w-[100%] max-w-[540px] rounded-[6px]">
              <h2 className="font-normal text-[16px] leading-[24px] mb-[8px] text-[#00000080]">Popular candidate</h2>
              <p className="font-medium text-[28px] leading-[36px] mb-[8px]">Bisola Ajay</p>
              <p className="font-normal text-[16px] leading-[24px]">Leading for President</p>
            </div>
          </div>
        </Section3>

        <Section4 className="p-[60px]">
          <div className="slideshow-container rounded-[6px]">
            <div className="mySlides fade">
              <Image alt="Slideshow" src="/images/0bdfc9164d29f4f3c7943f7a0dd189de.png" className="w-full" width={1000} height={1000} />
              <div className="text">
                <Image src="/images/game-icons_vote.png" alt="votve" width={254} height={254}/>
                <p className="font-semibold text-[20px] ml-[99px] w-[501px] leading-[21px] text-center">Exercise your voting rights in the school department elections</p>
              </div>
            </div>

            <div className="mySlides fade">
              <Image alt="Slideshow" src="/images/0bdfc9164d29f4f3c7943f7a0dd189de.png" className="w-full" width={1000} height={1000} />
              <div className="text">
                <Image src="/images/game-icons_vote.png" alt="votve" width={254} height={254}/>
                <p className="font-semibold text-[20px] ml-[99px] w-[501px] leading-[21px] text-center">Exercise your voting rights in the school department elections</p>
              </div>
            </div>

            <div className="mySlides fade">
              <Image alt="Slideshow" src="/images/0bdfc9164d29f4f3c7943f7a0dd189de.png" className="w-full" width={1000} height={1000} />
              <div className="text">
                <Image src="/images/game-icons_vote.png" alt="votve" width={254} height={254}/>
                <p className="font-semibold text-[20px] ml-[99px] w-[501px] leading-[21px] text-center">Exercise your voting rights in the school department elections</p>
              </div>
            </div>

            <div className="text-center absolute bottom-[8px] w-full">
              <span className="dot"></span> 
              <span className="dot"></span> 
              <span className="dot"></span> 
            </div>
          </div>
        </Section4>

      </main>

      <footer className="py-[60px]">
        <div className="w-full max-w-[600px] mx-auto flex justify-between h-[262px] items-center">
          <span>Contact us: vote@unilag.edu</span>
          <span>Follow us: @cscdepartmemnt</span>
        </div>
      </footer>
    </>
  );
}

const Form = styled.form`
    border: 1px solid rgba(0,0,0,.1);
    input:focus {
        outline: none;
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

const Section2 = styled.section`
  .vote-card {
    border: 1px solid rgba(0,0,0,.1);
    padding: 16px;
  }
`;

const Section3 = styled.section`
  border-top: 1px solid #0000001A;
  border-bottom: 1px solid #0000001A;

  .vote-button {
    background: rgba(15, 172, 255, 0.65);
  }

  .vote-card {
    border: 1px solid rgba(0,0,0,.1);
    padding: 16px;
  }
`;

const Section4 = styled.section`
  border-bottom: 1px solid #0000001A;

  * {box-sizing: border-box;}
  .mySlides {
    display: none;
    position: relative;
    height: 292px;
  }

  /* Slideshow container */
  .slideshow-container {
    max-width: 1000px;
    height: 292px;
    overflow: hidden;
    position: relative;
    margin: auto;
  }

  /* Caption text */
  .text {
    background-color: #0000007D;
    color: #f2f2f2;
    font-size: 15px;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  /* The dots/bullets/indicators */
  .dot {
    height: 4px;
    width: 4px;
    margin: 0 2px;
    background-color: #bbb;
    border-radius: 100px;
    display: inline-block;
    transition: background-color 0.6s ease, width 0.6s ease;
  }

  .active {
    background-color: #FFFFFF;
    width: 20px;
  }

  /* Fading animation */
  .fade {
    animation-name: fade;
    animation-duration: 1.5s;
  }

  @keyframes fade {
    from {opacity: .4} 
    to {opacity: 1}
  }

  /* On smaller screens, decrease text size */
  @media only screen and (max-width: 300px) {
    .text {font-size: 11px}
  }
`;