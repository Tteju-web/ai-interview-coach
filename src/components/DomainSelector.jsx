export default function DomainSelector({ onSelect, onBack }) {
  const domains = [
    "Full Stack Developer",
    "Java Developer",
    "Python Developer",
    "C / C++",
    "C# Developer",
  ];

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#020617] via-[#020617] to-[#0f172a] text-white relative">

      {/* 🔙 BACK BUTTON */}
      <button
        onClick={onBack}
        className="absolute top-6 left-6 text-gray-400 hover:text-white transition"
      >
        ← Back
      </button>

      {/* MAIN CARD */}
      <div className="bg-white/5 border border-white/10 backdrop-blur-lg p-10 rounded-2xl shadow-xl text-center">

        <h1 className="text-3xl font-bold mb-2">
          AI Interview Coach 🚀
        </h1>

        <p className="text-gray-400 mb-6">
          Practice interviews with AI feedback
        </p>

        {/* DOMAIN BUTTONS */}
        <div className="grid grid-cols-2 gap-4">

          {domains.map((domain, i) => (
            <button
              key={i}
              onClick={() => onSelect(domain)}
              className="bg-white/10 hover:bg-blue-500 hover:scale-105 transition p-4 rounded-xl text-sm"
            >
              {domain}
            </button>
          ))}

        </div>
      </div>
    </div>
  );
}