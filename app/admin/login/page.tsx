"use client";
import { decode } from "@/libs/ClientJWTUtility";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, RefObject, useEffect, useRef } from "react";
import styled from "styled-components";

function submitFactory(
  router: AppRouterInstance,
  staffIDField: RefObject<HTMLInputElement | null>,
  passwordField: RefObject<HTMLInputElement | null>,
) {
  return function (e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    fetch("/api/auth/login", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        matric: staffIDField.current?.value,
        password: passwordField.current?.value,
        adminLogin: true,
      }),
    })
      .then(async (res) => {
        if (res.status === 200) {
          const data = await res.json();
          localStorage.setItem("token", data["token"]);
          router.push("/admin/dashboard");
        } else {
          alert("Couldn't log you in");
        }
      })
      .catch(console.error);
  };
}

export default function Home() {
  const router = useRouter();

  const staffIDField = useRef<HTMLInputElement>(null);
  const passwordField = useRef<HTMLInputElement>(null);

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
              if (decode(token).admin) router.push("/admin/dashboard");
              else router.push("/dashboard");
            } catch (error) {
              localStorage.removeItem("token");
            }
          } else localStorage.removeItem("token");
        })
        .catch(console.error);
    }
  }, []);

  return (
    <Main>
      <Form
        className="rounded-[22px] px-[63px] pt-[15px] pb-[74px] w-[90%] max-w-[646px]"
        onSubmit={submitFactory(router, staffIDField, passwordField)}
      >
        <Image
          src="/images/c4bcd117d567f60f81f40bf701cbc96f.png"
          alt="Logo"
          width={99.14}
          height={103}
          className="mx-auto mb-[12px]"
        />
        <h1 className="text-[40px] leading-[48px] font-semibold text-center mb-[44px]">
          Admin Login
        </h1>

        <label
          htmlFor="matric-input"
          className="font-medium text-[14px] leading-[20px] block"
        >
          Staff ID
        </label>
        <Input
          type="text"
          placeholder="Enter Staff ID"
          ref={staffIDField}
          id="matric-input"
          className="block w-full bg-white rounded-[6px] py-[8px] px-[12px] mb-[40px]"
        />

        <label
          htmlFor="password-input"
          className="font-medium text-[14px] leading-[20px] block"
        >
          Password
        </label>
        <Input
          type="password"
          id="password-input"
          ref={passwordField}
          placeholder="Enter your password"
          className="block w-full bg-white rounded-[6px] py-[8px] px-[12px] mb-[40px]"
        />

        <div className="text-right text-[#0FACFF] font-medium text-[14px] leading-[24px] mb-[24px]">
          Forgot password
        </div>

        <button
          type="submit"
          className="w-full py-[12px] mb-[35px] bg-[#0FACFF] text-white rounded-[8px] font-semibold text-[16px] leading-[24px]"
        >
          Log In
        </button>

        <Link href="/" className="font-medium block text-center underline">
          Student Login
        </Link>
      </Form>
    </Main>
  );
}

const Main = styled.main`
  background-image: url("/images/6e2529d06601b42a402d5b2e4ce4ac9e.jpeg");
  background-repeat: no-repeat;
  background-attachment: fixed;
  background-size: cover;
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Form = styled.form`
  background: rgba(255, 255, 255, 0.9);
`;

const Input = styled.input`
  border: 1px solid rgba(0, 0, 0, 0.1);
`;
