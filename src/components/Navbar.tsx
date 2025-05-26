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
    <nav className="flex justify-between items-center mb-8">
    <h1 className="text-3xl text-white rounded-full px-6 py-2 font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-blue-300">
        devprofile-lite
    </h1>
    <button
        onClick={handleLogout}
        className="px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg text-sm font-medium transition-colors cursor-pointer"
    >
        Sair
    </button>
</nav>
  );
}
