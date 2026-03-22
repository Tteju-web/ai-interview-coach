import { useState, useEffect } from "react";
import Chart from "./Chart";

const questions = {
  "Full Stack Developer": [
    "Explain how REST APIs work in a real project.",
    "How does React lifecycle work in real apps?",
    "Where would you use JWT authentication?",
    "Explain frontend vs backend with example.",
    "How do you manage state in large React apps?",
    "Explain useEffect with real use-case.",
    "What is MVC and where is it used?",
    "What problem does CORS solve?",
    "How do you make a website responsive?",
    "SQL vs NoSQL — when to use each?"
  ],
  "Java Developer": [
    "Explain JVM in simple terms.",
    "Explain OOP concepts with examples.",
    "Where is inheritance useful?",
    "Difference between JDK, JRE, JVM?",
    "Explain multithreading in real-world.",
    "How does exception handling work?",
    "What is garbage collection?",
    "Interface vs abstract class?",
    "What is Spring Boot used for?",
    "Explain constructors."
  ],
  "Python Developer": [
    "List vs Tuple — when to use?",
    "Explain decorators with example.",
    "Where is Python used?",
    "What is lambda function?",
    "Explain OOP in Python.",
    "What is PEP 8?",
    "List vs Dictionary?",
    "Virtual environments?",
    "Explain generators.",
    "Exception handling?"
  ],
  "C / C++": [
    "What is pointer?",
    "C vs C++ difference?",
    "Memory allocation?",
    "What is struct?",
    "What is class?",
    "Explain polymorphism.",
    "What is inheritance?",
    "Stack vs Heap?",
    "Function overloading?",
    "What is recursion?"
  ],
  "C# Developer": [
    "What is .NET?",
    "Explain async/await.",
    "What is CLR?",
    "Explain LINQ.",
    "Value vs reference types?",
    "Dependency injection?",
    "MVC in .NET?",
    "Exception handling?",
    "What is delegate?",
    "Entity Framework?"
  ],
};

export default function Chat({ domain, onBack }) {
  const domainQuestions = domain ? questions[domain] : [];

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [input, setInput] = useState("");
  const [feedback, setFeedback] = useState("");
  const [score, setScore] = useState(0);
  const [completed, setCompleted] = useState(false);
  const [timeLeft, setTimeLeft] = useState(30);

  const progress =
    domainQuestions.length > 0
      ? ((currentQuestion + 1) / domainQuestions.length) * 100
      : 0;

  // ⏱ Timer
  useEffect(() => {
    if (completed) return;

    if (timeLeft === 0) {
      handleNext();
      setTimeLeft(30);
      return;
    }

    const timer = setTimeout(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearTimeout(timer);
  }, [timeLeft, currentQuestion, completed]);

  const handleSubmitInterview = () => setCompleted(true);

  const handleSend = async () => {
    if (!input.trim()) return;

    try {
      const res = await fetch("/api/evaluate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          question: domainQuestions[currentQuestion],
          answer: input,
        }),
      });

      const data = await res.json();

      setScore((prev) => prev + (data.score || 0));
      setFeedback(data.feedback || "No feedback");
    } catch {
      setFeedback("⚠️ AI not responding.");
    }

    setInput("");
    setTimeLeft(30);

    setTimeout(() => {
      if (currentQuestion < domainQuestions.length - 1) {
        setCurrentQuestion((prev) => prev + 1);
        setFeedback("");
      }
    }, 1200);
  };

  const handleNext = () => {
    if (currentQuestion < domainQuestions.length - 1) {
      setCurrentQuestion((prev) => prev + 1);
      setFeedback("");
      setTimeLeft(30);
    }
  };

  // 🎉 RESULT SCREEN
  if (completed) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#020617] text-white p-6">

        <button
          onClick={onBack}
          className="absolute top-6 left-6 text-gray-400 hover:text-white"
        >
          ← Back
        </button>

        <h1 className="text-3xl font-bold mb-4">🎉 Interview Completed</h1>

        <p className="text-lg mb-2">
          Score: {score} / {domainQuestions.length * 2}
        </p>

        <div className="w-[300px] mt-6">
          <Chart score={score} total={domainQuestions.length * 2} />
        </div>

        <button
          onClick={() => window.location.reload()}
          className="mt-6 bg-blue-500 px-6 py-2 rounded-lg hover:scale-105 transition"
        >
          Restart
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#020617] via-[#020617] to-[#0f172a] text-white flex flex-col items-center p-6">

      {/* 🔙 BACK */}
      <button
        onClick={onBack}
        className="self-start mb-4 text-gray-400 hover:text-white transition"
      >
        ← Back
      </button>

      <h1 className="text-2xl font-bold mb-4">{domain} Interview</h1>

      {/* Progress */}
      <div className="w-full max-w-3xl mb-2">
        <div className="w-full bg-white/10 rounded-full h-2">
          <div
            className="bg-green-500 h-2 rounded-full transition-all duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Timer */}
      <div className="w-full max-w-3xl mb-4 flex justify-between items-center">
        <p className="text-sm text-gray-400">⏱ {timeLeft}s</p>
        <div className="w-32 h-2 bg-white/10 rounded-full">
          <div
            className={`h-2 rounded-full ${
              timeLeft < 10 ? "bg-red-500" : "bg-green-500"
            }`}
            style={{ width: `${(timeLeft / 30) * 100}%` }}
          />
        </div>
      </div>

      {/* Question */}
      <div className="w-full max-w-3xl bg-white/5 border border-white/10 rounded-2xl p-10 text-center shadow-lg">
        <p className="text-xl">
          👨‍💼 {domainQuestions[currentQuestion]}
        </p>
      </div>

      {/* Feedback */}
      {feedback && (
        <p className="mt-3 text-sm text-gray-300 animate-pulse">
          {feedback}
        </p>
      )}

      {/* Skip */}
      <button
        onClick={handleNext}
        className="mt-4 text-xs px-4 py-1 bg-white/10 rounded hover:bg-white/20"
      >
        Skip →
      </button>

      {/* Input */}
      <div className="flex gap-2 mt-6 w-full max-w-3xl">
        <input
          className="bg-white/10 border border-white/20 text-white p-3 flex-1 rounded-xl"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type your answer..."
        />

        <button
          onClick={handleSend}
          className="bg-blue-500 px-6 rounded-xl hover:scale-105"
        >
          Send
        </button>

        <button
          onClick={handleSubmitInterview}
          className="bg-green-500 px-6 rounded-xl hover:scale-105"
        >
          Submit
        </button>
      </div>
    </div>
  );
}