import LoginModal from "@/components/Modal/LoginModal";
import { getServerSession } from "next-auth";
import { useSession } from "next-auth/react";

export default function LoginPage() {
  return (
    <>
      <LoginModal />
    </>
  );
}
