export default function Landing({ onStart }) {

  // ✅ FIX: scroll function
  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#020617] via-[#020617] to-[#0f172a] text-white">

      {/* 🔷 Navbar */}
      <nav className="sticky top-0 backdrop-blur bg-black/30 z-50 flex justify-between items-center px-10 py-5 border-b border-white/10">
        <h1 className="text-lg font-bold">AI Coach</h1>

        <div className="flex gap-6 text-sm text-gray-400">

          <button onClick={() => scrollTo("home")} className="hover:text-white">
            Home
          </button>

          <button onClick={() => scrollTo("features")} className="hover:text-white">
            Features
          </button>

          <button onClick={() => scrollTo("stats")} className="hover:text-white">
            Stats
          </button>

        </div>

        <button
          onClick={onStart}
          className="bg-blue-500 px-4 py-2 rounded-lg hover:bg-blue-600"
        >
          Get Started
        </button>
      </nav>

      {/* 🔥 Hero Section */}
      <div id="home" className="relative flex flex-col md:flex-row items-center justify-between px-10 py-20">

        {/* Glow Effect */}
        <div className="absolute top-20 right-20 w-72 h-72 bg-blue-500 opacity-20 blur-3xl rounded-full"></div>

        {/* LEFT TEXT */}
        <div className="max-w-xl z-10">
          <p className="text-green-400 text-sm mb-2">
            AI Powered Interview Practice
          </p>

          <h1 className="text-4xl font-bold mb-4 leading-tight">
            Build AI Interview Coach <br />
            for your career 🚀
          </h1>

          <p className="text-gray-400 mb-6">
            Practice technical interviews with structured questions,
            real-time feedback, and better UX.
          </p>

          <button
            onClick={onStart}
            className="bg-blue-500 px-6 py-3 rounded-xl hover:bg-blue-600"
          >
            Start Practicing
          </button>
        </div>

        {/* RIGHT CHAT MOCKUP */}
        <div className="mt-10 md:mt-0 z-10">
          <div className="bg-white/5 border border-white/10 backdrop-blur-lg p-6 rounded-2xl shadow-xl w-[300px]">

            <div className="text-sm text-gray-300 mb-4">
              AI Interview Coach
            </div>

            <div className="space-y-2 text-sm">
              <div className="bg-white/10 p-2 rounded">
                What is REST API?
              </div>
              <div className="bg-blue-500 p-2 rounded text-white ml-auto w-fit">
                It is communication between client and server
              </div>
              <div className="bg-white/10 p-2 rounded">
                Good answer 👍
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* ✨ Features Section */}
      <div id="features" className="px-10 pb-20">

        <h2 className="text-center text-2xl font-bold mb-10">
          Smarter than a chatbot
        </h2>

        <div className="grid md:grid-cols-3 gap-6">

          <div className="bg-white/5 p-6 rounded-xl border border-white/10 hover:scale-105 transition duration-300">
            <h3 className="font-semibold mb-2">Domain Based</h3>
            <p className="text-gray-400 text-sm">
              Choose interview domain like Full Stack, Java, Python.
            </p>
          </div>

          <div className="bg-white/5 p-6 rounded-xl border border-white/10 hover:scale-105 transition duration-300">
            <h3 className="font-semibold mb-2">Smart Feedback</h3>
            <p className="text-gray-400 text-sm">
              Get instant feedback based on your answers.
            </p>
          </div>

          <div className="bg-white/5 p-6 rounded-xl border border-white/10 hover:scale-105 transition duration-300">
            <h3 className="font-semibold mb-2">Real Experience</h3>
            <p className="text-gray-400 text-sm">
              Feels like real interview environment.
            </p>
          </div>

        </div>
      </div>

      {/* 📊 Stats Section */}
      <div id="stats" className="px-10 pb-20">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">

          <div>
            <h3 className="text-3xl font-bold text-blue-500">10K+</h3>
            <p className="text-gray-400 text-sm">Users Practicing</p>
          </div>

          <div>
            <h3 className="text-3xl font-bold text-green-400">95%</h3>
            <p className="text-gray-400 text-sm">Success Rate</p>
          </div>

          <div>
            <h3 className="text-3xl font-bold text-purple-400">50+</h3>
            <p className="text-gray-400 text-sm">Domains Covered</p>
          </div>

          <div>
            <h3 className="text-3xl font-bold text-pink-400">24/7</h3>
            <p className="text-gray-400 text-sm">AI Availability</p>
          </div>

        </div>
      </div>

    </div>
  );
}