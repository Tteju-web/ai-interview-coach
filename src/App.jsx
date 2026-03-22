import { useState } from "react";
import Landing from "./components/Landing";
import DomainSelector from "./components/DomainSelector";
import Chat from "./components/Chat";

export default function App() {
  const [page, setPage] = useState("landing");
  const [domain, setDomain] = useState("");

  return (
    <>
      {/* 🏠 Landing Page */}
      {page === "landing" && (
        <Landing onStart={() => setPage("domain")} />
      )}

      {/* 📚 Domain Selection */}
      {page === "domain" && (
        <DomainSelector
          onSelect={(d) => {
            setDomain(d);
            setPage("chat");
          }}
          onBack={() => setPage("landing")} // 🔥 back works
        />
      )}

      {/* 💬 Chat Interview */}
      {page === "chat" && (
        <Chat
          domain={domain}
          onBack={() => setPage("domain")} // 🔥 THIS FIXES YOUR BUTTON
        />
      )}
    </>
  );
}