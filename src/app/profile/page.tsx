'use client'
import { useEffect, useState } from "react";
import { auth } from "@/lib/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { useRouter } from "next/navigation";
import { buscarPerfilPorUID, Perfil } from "@/lib/profileService";
import Link from "next/link";

export default function ProfilePage() {
    const [perfil, setPerfil] = useState<Perfil | null>(null);
    const [mensagem, setMensagem] = useState("Carregando seu perfil...");
    const [isLoading, setIsLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            if (!user) {
                router.push("/login");
                return;
            }

            try {
                const perfilData = await buscarPerfilPorUID(user.uid);
                if (perfilData) {
                    setPerfil(perfilData);
                } else {
                    setMensagem("Perfil ainda não configurado.");
                }
            } catch (err) {
                console.error("Erro ao carregar perfil:", err);
                setMensagem("Erro ao carregar perfil. Tente novamente mais tarde.");
            } finally {
                setIsLoading(false);
            }
        });

        return () => unsubscribe();
    }, [router]);

    if (isLoading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 flex items-center justify-center">
                <div className="text-center">
                    <div className="w-16 h-16 border-4 border-purple-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                    <p className="text-gray-300 text-lg">{mensagem}</p>
                </div>
            </div>
        );
    }

    if (!perfil) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 flex items-center justify-center">
                <div className="text-center p-8 max-w-md">
                    <div className="w-20 h-20 bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-4">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                        </svg>
                    </div>
                    <h2 className="text-2xl font-bold text-gray-200 mb-2">Perfil não encontrado</h2>
                    <p className="text-gray-400 mb-6">{mensagem}</p>
                    <Link
                        href="/editar-perfil"
                        className="inline-block px-6 py-2 bg-gradient-to-r from-purple-600 to-blue-500 rounded-lg text-white font-medium hover:shadow-lg transition-all"
                    >
                        Criar Perfil
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
                {/* Cabeçalho */}
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-blue-300">
                        devprofile-lite
                    </h1>
                    <Link
                        href="/editar-perfil"
                        className="px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg text-sm font-medium transition-colors"
                    >
                        Sair
                    </Link>
                </div>

                {/* Card do Perfil */}
                <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl shadow-2xl border border-gray-700 overflow-hidden">
                    {/* Banner */}
                    <div className="h-48 relative">
                        {perfil.capa ? (
                            // Se existir imagem de capa
                            <div className="w-full h-full bg-gray-700 overflow-hidden">
                                <img
                                    src={perfil.capa}
                                    alt="Capa do perfil"
                                    className="w-full h-full object-cover"
                                />
                                {/* Overlay escuro para melhor contraste */}
                                <div className="absolute inset-0 bg-black/30"></div>
                            </div>
                        ) : (
                            // Fallback com gradiente se não tiver capa
                            <div className="w-full h-full bg-gradient-to-r from-purple-900/30 to-blue-900/30"></div>
                        )}

                        {/* Foto do perfil (círculo) */}
                        <div className="absolute -bottom-16 left-6">
                            <div className="w-32 h-32 rounded-full border-4 border-gray-800 bg-gray-700 overflow-hidden">
                                {perfil.foto ? (
                                    <img src={perfil.foto} alt="Foto do perfil" className="w-full h-full object-cover" />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center bg-gray-600">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                        </svg>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Conteúdo */}
                    <div className="pt-20 px-6 pb-8">
                        <div className="mb-6">
                            <h2 className="text-2xl font-bold text-white">{perfil.nomeCompleto}</h2>
                            <p className="text-purple-400 font-medium">{perfil.cargo || 'Desenvolvedor'}</p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* Seção Esquerda */}
                            <div>
                                <div className="mb-6">
                                    <h3 className="text-lg font-semibold text-gray-300 mb-3 flex items-center">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-purple-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                        Sobre
                                    </h3>
                                    <p className="text-gray-400">{perfil.bioCurta || 'Nenhuma bio disponível'}</p>
                                </div>

                                <div className="mb-6">
                                    <h3 className="text-lg font-semibold text-gray-300 mb-3 flex items-center">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                                        </svg>
                                        Links
                                    </h3>
                                    <div className="space-y-2">
                                        {perfil.linkPortfolio && (
                                            <a
                                                href={perfil.linkPortfolio}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="flex items-center text-blue-400 hover:text-blue-300 transition-colors"
                                            >
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                                </svg>
                                                Portfólio
                                            </a>
                                        )}
                                    </div>
                                </div>
                            </div>

                            {/* Seção Direita */}
                            <div>
                                <div className="mb-6">
                                    <h3 className="text-lg font-semibold text-gray-300 mb-3 flex items-center">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-purple-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                                        </svg>
                                        Habilidades
                                    </h3>
                                    <div className="flex flex-wrap gap-2">
                                        {perfil.habilidades && perfil.habilidades.length > 0 ? (
                                            perfil.habilidades.map((habilidade, index) => (
                                                <span
                                                    key={index}
                                                    className="px-3 py-1 bg-gray-700 rounded-full text-sm text-gray-200"
                                                >
                                                    {habilidade}
                                                </span>
                                            ))
                                        ) : (
                                            <p className="text-gray-500">Nenhuma habilidade cadastrada</p>
                                        )}
                                    </div>
                                </div>

                                <div className="mb-6">
                                    <h3 className="text-lg font-semibold text-gray-300 mb-3 flex items-center">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                                        </svg>
                                        Experiência
                                    </h3>
                                    {perfil.experiencia && perfil.experiencia.length > 0 ? (
                                        <ul className="space-y-3">
                                            {perfil.experiencia.map((exp, index) => (
                                                <li key={index} className="text-gray-400">
                                                    <p className="font-medium text-white">{exp.cargo}</p>
                                                    <p>{empresa} • {exp.periodo}</p>
                                                </li>
                                            ))}
                                        </ul>
                                    ) : (
                                        <p className="text-gray-500">Nenhuma experiência cadastrada</p>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}