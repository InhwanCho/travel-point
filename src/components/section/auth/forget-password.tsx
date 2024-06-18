import Link from "next/link";

export default function ForgotPasswordLink() {
  return (
    <div className="text-sm">
      <Link className="font-medium text-blue-600 hover:text-blue-500" href="">
        비밀번호를 잊으셨나요?
      </Link>
    </div>
  );
}
