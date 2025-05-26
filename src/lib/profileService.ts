// lib/profileService.ts
import { db } from "@/lib/firebase";
import { doc, getDoc } from "firebase/firestore";

export interface Perfil {
  nomeCompleto: string;
  bioCurta: string;
  linkPortfolio: string;
}

export async function buscarPerfilPorUID(uid: string): Promise<Perfil | null> {
  const docRef = doc(db, "userProfiles", uid);
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    return docSnap.data() as Perfil;
  }
  return null;
}
