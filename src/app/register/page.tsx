'use client'

import { useState } from "react";
import { auth } from "@/lib/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function RegisterPage() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [confirmarSenha, setConfirmarSenha] = useState("");
  const [mensagem, setMensagem] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleCadastro = async () => {
    if (senha !== confirmarSenha) {
      setMensagem("As senhas não coincidem!");
      return;
    }

    setIsLoading(true);
    try {
      await createUserWithEmailAndPassword(auth, email, senha);
      setMensagem("Cadastro realizado com sucesso! Redirecionando...");
      setTimeout(() => router.push("/login"), 1500);
    } catch (error) {
      if (error instanceof Error) {
        setMensagem(formatFirebaseError(error.message));
      } else {
        setMensagem("Erro desconhecido ao cadastrar");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const formatFirebaseError = (message: string) => {
    if (message.includes("weak-password")) {
      return "Senha muito fraca (mínimo 6 caracteres)";
    }
    if (message.includes("email-already-in-use")) {
      return "Este email já está cadastrado";
    }
    if (message.includes("invalid-email")) {
      return "Email inválido";
    }
    return "Erro no cadastro: " + message;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 flex flex-col items-center justify-center p-6 text-white">
      <div className="w-full max-w-md bg-gray-800/50 backdrop-blur-sm rounded-xl p-8 shadow-2xl border border-gray-700">
        {/* Logo/Cabeçalho */}
        <div className="mb-8 text-center">
          <div className="mx-auto w-16 h-16 rounded-full bg-gradient-to-r from-purple-600 to-blue-500 flex items-center justify-center mb-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-8 w-8 text-white"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
              />
            </svg>
          </div>
          <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-blue-300 mb-2">
            devprofile-lite
          </h1>
          <p className="text-gray-400">Crie sua conta</p>
        </div>

        {/* Formulário */}
        <div className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1">
              Email
            </label>
            <input
              id="email"
              type="email"
              placeholder="seu@email.com"
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-white placeholder-gray-400 transition-all"
            />
          </div>

          <div>
            <label htmlFor="senha" className="block text-sm font-medium text-gray-300 mb-1">
              Senha
            </label>
            <input
              id="senha"
              type="password"
              placeholder="•••••••• (mínimo 6 caracteres)"
              onChange={(e) => setSenha(e.target.value)}
              className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-white placeholder-gray-400 transition-all"
            />
          </div>

          <div>
            <label htmlFor="confirmarSenha" className="block text-sm font-medium text-gray-300 mb-1">
              Confirmar Senha
            </label>
            <input
              id="confirmarSenha"
              type="password"
              placeholder="••••••••"
              onChange={(e) => setConfirmarSenha(e.target.value)}
              className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-white placeholder-gray-400 transition-all"
            />
          </div>

          {mensagem && (
            <div className={`text-sm text-center py-2 px-3 rounded-lg ${
              mensagem.includes("sucesso") 
                ? "text-green-400 bg-green-900/30" 
                : "text-red-400 bg-red-900/30"
            }`}>
              {mensagem}
            </div>
          )}

          <button
            onClick={handleCadastro}
            disabled={isLoading}
            className={`w-full py-3 px-4 rounded-lg font-semibold text-white transition-all cursor-pointer ${
              isLoading
                ? "bg-gray-600 cursor-not-allowed"
                : "bg-gradient-to-r from-purple-600 to-blue-500 hover:from-purple-500 hover:to-blue-400 shadow-lg hover:shadow-xl"
            }`}
          >
            {isLoading ? (
              <span className="flex items-center justify-center">
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Criando conta...
              </span>
            ) : (
              'Cadastrar'
            )}
          </button>

          <div className="text-center text-sm text-gray-400 pt-4">
            Já tem uma conta?{" "}
            <Link href="/login" className="text-purple-400 hover:text-purple-300 transition-colors">
              Faça login
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}