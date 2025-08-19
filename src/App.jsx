import { useState } from "react";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import Chat from "./pages/Chat";

export default function App() {
  const [tab, setTab] = useState("home");

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar tab={tab} setTab={setTab} />
      <main className="flex-1">
        {tab === "home" && <Home goAsk={() => setTab("chat")} goRead={() => setTab("profile")} />}
        {tab === "profile" && <Profile />}
        {tab === "chat" && <Chat />}
      </main>
      <footer className="border-t border-neutral-800 py-6 text-center text-xs muted">
        © {new Date().getFullYear()} Hareekrishna V S · Work in progress
      </footer>
    </div>
  );
}
