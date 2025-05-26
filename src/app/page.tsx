import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 flex flex-col items-center justify-center p-4 text-white">
      <div className="max-w-md w-full mx-auto text-center">
        {/* Logo/Ícone opcional */}
        <div className="mb-8 flex justify-center">
          <div className="w-24 h-24 rounded-full bg-gradient-to-r from-purple-600 to-blue-500 flex items-center justify-center shadow-lg shadow-purple-500/20">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-12 w-12 text-white"
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
        </div>

        {/* Título */}
        <h1 className="text-4xl text-white rounded-full px-8 py-4 md:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-blue-300">
          devprofile-lite
        </h1>

        {/* Subtítulo */}
        <p className="text-gray-300 mb-10 text-lg">
          Sua plataforma profissional simplificada
        </p>

        {/* Botões de Ação */}
        <div className="flex flex-col space-y-4">
          <Link
            href="/login"
            className="inline-block px-8 py-3 rounded-full bg-gradient-to-r from-purple-600 to-blue-500 text-white font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:from-purple-500 hover:to-blue-400 transform hover:-translate-y-1"
          >
            Fazer Login
          </Link>

          <Link
            href="/register"
            className="inline-block px-8 py-3 rounded-full bg-gradient-to-r from-purple-600 to-blue-500 text-white font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:from-purple-500 hover:to-blue-400 transform hover:-translate-y-1"
          >
            Cadastrar-se
          </Link>
        </div>

        {/* Rodapé */}
        <div className="mt-16 text-sm text-gray-400">
          <p>© {new Date().getFullYear()} DevProfile Lite</p>
        </div>
      </div>
    </div>
  );
}