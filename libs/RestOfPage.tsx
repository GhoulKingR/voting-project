"use client";
import Image from "next/image";
import Link from "next/link";
import styled from "styled-components";
import "@carbon/charts-react/styles.css";
import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
import logout from "./logoutAction";

function mobileLinksControllerFactory(
  showMobileLinks: boolean,
  setShowMobileLinks: Dispatch<SetStateAction<boolean>>,
) {
  return function () {
    setShowMobileLinks(!showMobileLinks);
  };
}

type Prop = {
  children: any;
};

export default function RestOfPage({ children }: Prop) {
  const [showMobileLinks, setShowMobileLinks] = useState(false);

  const mySlides = [
    { slide: useRef<HTMLDivElement>(null), dot: useRef<HTMLDivElement>(null) },
    { slide: useRef<HTMLDivElement>(null), dot: useRef<HTMLDivElement>(null) },
    { slide: useRef<HTMLDivElement>(null), dot: useRef<HTMLDivElement>(null) },
  ];

  useEffect(() => {
    let slideIndex = 0;
    showSlides();

    function showSlides() {
      for (let i = 0; i < mySlides.length; i++) {
        const slide = mySlides[i].slide.current;
        if (slide) slide.style.display = "none";
      }
      slideIndex++;
      if (slideIndex > mySlides.length) slideIndex = 1;

      for (let i = 0; i < mySlides.length; i++) {
        const dot = mySlides[i].dot.current;
        if (dot) dot.className = dot.className.replace(" active", "");
      }

      const j = slideIndex - 1;
      const slide = mySlides[j].slide.current;
      if (slide) slide.style.display = "block";

      const dot = mySlides[j].dot.current;
      if (dot) dot.className += " active";

      setTimeout(showSlides, 6000); // Change image every 6 seconds
    }
  }, []);

  return (
    <>
      <Header className="flex md:block xl:flex justify-between items-center p-[20px]">
        <Link
          href="/dashboard"
          className="md:mb-[50px] xl:mb-0 flex items-center"
        >
          <Image
            src="/images/c4bcd117d567f60f81f40bf701cbc96f.png"
            alt="Logo"
            width={40}
            height={40}
          />
          <span className="ml-[20px] inline-block font-medium text-[15px] md:text-[28px] leading-[36px]">
            Unilag Departmental Voting Platform
          </span>
        </Link>

        <nav className="hidden md:flex justify-between">
          <div className="items-center flex">
            <Link href="/dashboard" className="cursor-pointer mr-[40px]">
              Home
            </Link>
			{/*<Link href="/candidates" className="cursor-pointer mr-[40px]">
              Candidates
            </Link>*/}
            <Link href="/history" className="cursor-pointer mr-[40px]">
              Voting History
            </Link>
            <div onClick={logout} className="cursor-pointer mr-[40px] inline">
              Logout
            </div>
          </div>
          <Form className="inline-flex rounded-[6px] p-[8px]">
            <input type="text" placeholder="search in site" />
            <Image
              src="/images/ic-search.svg"
              alt="Search"
              width={20}
              height={20}
            />
          </Form>
        </nav>

        <MobileNav className="md:hidden">
          {showMobileLinks && (
            <div className="list mt-[20px]">
              <Link
                href="/dashboard"
                className="cursor-pointer py-[10px] bg-white text-center text-[12px] font-normal"
              >
                Home
              </Link>
			  {/*<Link
                href="/candidates"
                className="cursor-pointer py-[10px] bg-white text-center text-[12px] font-normal"
              >
                Candidates
              </Link>*/}
              <Link
                href="/history"
                className="cursor-pointer py-[10px] bg-white text-center text-[12px] font-normal"
              >
                Voting History
              </Link>
              <div
                onClick={logout}
                className="cursor-pointer py-[10px] bg-white text-center text-[12px] font-normal"
              >
                Logout
              </div>
              <div className="py-[10px] bg-white text-center text-[12px]">
                <Form className="inline-flex rounded-[6px] p-[8px] w-[90%]">
                  <input
                    type="text"
                    placeholder="search in site"
                    className="flex-grow"
                  />
                  <Image
                    src="/images/ic-search.svg"
                    alt="Search"
                    width={20}
                    height={20}
                  />
                </Form>
              </div>
            </div>
          )}
          <Image
            src="/images/bars-solid.svg"
            alt="menu"
            width={40}
            height={40}
            onClick={mobileLinksControllerFactory(
              showMobileLinks,
              setShowMobileLinks,
            )}
            className="w-[40px] h-[40px]"
          />
        </MobileNav>
      </Header>

      <main>
        {children}

        <Section4 className="p-[60px]">
          <div className="slideshow-container rounded-[6px]">
            {mySlides.map(({ slide }, i) => (
              <div key={i} ref={slide} className="mySlides fade">
                <Image
                  alt="Slideshow"
                  src="/images/0bdfc9164d29f4f3c7943f7a0dd189de.png"
                  className="w-full"
                  width={1000}
                  height={1000}
                />
                <div className="text">
                  <Image
                    src="/images/game-icons_vote.png"
                    alt="votve"
                    width={254}
                    height={254}
                    className="hidden md:block"
                  />
                  <p className="font-semibold text-[20px] md:ml-[99px] w-[501px] leading-[21px] text-center">
                    Exercise your voting rights in the school department
                    elections
                  </p>
                </div>
              </div>
            ))}

            <div className="text-center absolute bottom-[8px] w-full">
              {mySlides.map(({ dot }, i) => (
                <span key={i} ref={dot} className="dot"></span>
              ))}
            </div>
          </div>
        </Section4>
      </main>

      <footer className="py-[60px]">
        <div className="flex justify-center mb-[25px]">
          <Image
            src="/images/facebook.svg"
            width={40}
            height={40}
            alt="facebook"
            className="w-[40px] h-[40px] mx-[12px]"
          />
          <Image
            src="/images/instagram.svg"
            width={40}
            height={40}
            alt="instagram"
            className="w-[40px] h-[40px] mx-[12px]"
          />
          <Image
            src="/images/linkedin.svg"
            width={40}
            height={40}
            alt="linkedin"
            className="w-[40px] h-[40px] mx-[12px]"
          />
          <Image
            src="/images/twitter.svg"
            width={40}
            height={40}
            alt="twitter"
            className="w-[40px] h-[40px] mx-[12px]"
          />
        </div>

        <div className="justify-center mb-[65px] flex text-[#0FACFF]">
          <Link href="/dashboard" className="cursor-pointer mr-[40px]">
            Home
          </Link>
		  {/*<Link href="/candidates" className="cursor-pointer mr-[40px]">
            Candidates
          </Link>*/}
          <Link href="/history" className="cursor-pointer mr-[40px]">
            Voting History
          </Link>
          <div onClick={logout} className="cursor-pointer mr-[40px] inline">
            Logout
          </div>
        </div>

        <small className="block font-normal text-center text-[16px] leading-[100%]">
          (c) 2025. Unilagvoting. All rights reserved.
        </small>
      </footer>
    </>
  );
}

const Header = styled.header`
  box-shadow: 0 0 6px 0 #0000001f;
`;

const MobileNav = styled.nav`
  position: relative;

  .list {
    position: absolute;
    top: 100%;
    right: -20px;
    width: 100vw;
    border-top: 1px solid rgba(0, 0, 0, 0.1);

    & > * {
      position: relative;
      z-index: 100;
      display: block;
      border-bottom: 1px solid rgba(0, 0, 0, 0.1);
    }
  }
`;

const Form = styled.form`
  border: 1px solid rgba(0, 0, 0, 0.1);
  input:focus {
    outline: none;
  }
`;

const Section4 = styled.section`
  border-bottom: 1px solid #0000001a;

  * {
    box-sizing: border-box;
  }
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
    background-color: #0000007d;
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
    transition:
      background-color 0.6s ease,
      width 0.6s ease;
  }

  .active {
    background-color: #ffffff;
    width: 20px;
  }

  /* Fading animation */
  .fade {
    animation-name: fade;
    animation-duration: 1.5s;
  }

  @keyframes fade {
    from {
      opacity: 0.4;
    }
    to {
      opacity: 1;
    }
  }

  /* On smaller screens, decrease text size */
  @media only screen and (max-width: 300px) {
    .text {
      font-size: 11px;
    }
  }
`;
