// components/Navbar.tsx
'use client'
import { signOut } from "firebase/auth";
import { auth } from "@/lib/firebase";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const router = useRouter();

  const handleLogout = async () => {
    await signOut(auth);
    Cookies.remove("token");
    router.push("/login");
  };

  return (
    <nav>
      <button onClick={handleLogout}>Logout</button>
    </nav>
  );
}
