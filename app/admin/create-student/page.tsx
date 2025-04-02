import { addUser } from "@/database";
import { validateToken } from "@/libs/JWTUtility";
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
  const message = (await searchParams).message || null;
  let user = null;
  try {
    user = validateToken((await cookies()).get("token")!.value) as any;
  } catch (error) {
    console.log(error);
    redirect("/");
  }
  if (!user.admin) redirect("/?error=Only+admins+can+add+students");

  async function submitForm(formData: FormData) {
    "use server";

    const matricNumber = formData.get("matric-number")?.toString();
    const name = formData.get("name")?.toString();
    const password = formData.get("password")?.toString();
    const cks = await cookies();

    if (!matricNumber || !name || !password) {
      redirect("/admin/create-student?error=Matric/Application+number+and+password+are+required");
    }

	try{
		validateToken(cks.get("token")!.value);
		addUser(matricNumber, name, password, false);
	  } catch (error) {
		console.log(error);
		redirect("/admin/create-student?error=Failed+to+add+student.+Check+that+there+isn't+already+isn't+already+an+account+with+the+same+matric+number");
	  }
	redirect("/admin/create-student?message=Student+account+created+successfully");
  }

  return (
    <Main>
      <Form
        className="rounded-[22px] px-[63px] pt-[15px] pb-[74px] w-[90%] max-w-[646px]"
        action={submitForm}
      >
	  	<Link href="/admin/dashboard" className="block mt-[20px] mb-[10px] underline text-[#0FACFF]">&lt; Back</Link>

        <Image
          src="/images/c4bcd117d567f60f81f40bf701cbc96f.png"
          alt="Logo"
          width={99.14}
          height={103}
          className="mx-auto mb-[12px]"
        />
        <h1 className="text-[40px] leading-[48px] font-semibold text-center mb-[44px]">
			Add a student
        </h1>
        {error && (
          <p style={{ color: "red", display: "block", marginBottom: "10px" }}>
            {error}
          </p>
        )}
        {message && (
          <p style={{ color: "green", display: "block", marginBottom: "10px" }}>
            {message}
          </p>
        )}

        <label
          htmlFor="matric-input"
          className="font-medium text-[14px] leading-[20px] block"
        >
          Student Matric/Application Number
        </label>
        <Input
          type="text"
          placeholder="Enter student Matric/Application Number"
          name="matric-number"
          id="matric-input"
          className="block w-full bg-white rounded-[6px] py-[8px] px-[12px] mb-[40px]"
        />

        <label
          htmlFor="student-name"
          className="font-medium text-[14px] leading-[20px] block"
        >
          Student Name
        </label>
        <Input
          type="text"
          placeholder="Enter Student Name"
          name="name"
          id="student-name"
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
          placeholder="Enter student password"
          className="block w-full bg-white rounded-[6px] py-[8px] px-[12px] mb-[40px]"
        />

        <button
          type="submit"
          className="w-full py-[12px] mb-[35px] bg-[#0FACFF] text-white rounded-[8px] font-semibold text-[16px] leading-[24px]"
        >
			Create Student Account
        </button>
      </Form>
    </Main>
  );
}
