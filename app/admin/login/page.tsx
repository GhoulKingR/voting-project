import { getUser, validateUser } from "@/database";
import { generateToken, validateToken } from "@/libs/JWTUtility";
import { Form, Input, Main } from "@/libs/LoginComponents";
import { cookies } from "next/headers";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function AdminLogin({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string }>;
}) {
  const error = (await searchParams).error || null;
  const token = (await cookies()).get("token");

  if (token?.value) {
    let obj = null;
    try {
      obj = validateToken(token.value);
    } catch (error) {
      console.log(error);
    }
    if (obj !== null) redirect("/admin/dashboard");
  }

  async function submitForm(formData: FormData) {
    "use server";

    const staffId = formData.get("staffid")?.toString();
    const password = formData.get("password")?.toString();
    const cks = await cookies();

    if (!staffId || !password) {
      redirect("/admin/login?error=Username+and+password+are+required");
    }

    if (await validateUser(staffId, password)) {
      const user = await getUser(staffId);
      cks.set("token", generateToken(user!));
      redirect("/admin/dashboard");
    } else {
      redirect("/admin/login/?error=Incorrect+username+or+password");
    }
  }

  return (
    <Main>
      <Form
        className="rounded-[22px] px-[63px] pt-[15px] pb-[74px] w-[90%] max-w-[646px]"
        action={submitForm}
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
        {error && (
          <p style={{ color: "red", display: "block", marginBottom: "10px" }}>
            {error}
          </p>
        )}

        <label
          htmlFor="matric-input"
          className="font-medium text-[14px] leading-[20px] block"
        >
          Staff ID
        </label>
        <Input
          type="text"
          placeholder="Enter your Staff ID"
          name="staffid"
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
          name="password"
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
