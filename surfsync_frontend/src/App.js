import React, { useEffect, useState } from "react";
import "./App.css";
import Home from "./components/Home";
import LogSessionForm from "./components/LogSessionForm";
import SessionDetail from "./components/SessionDetail";
import StatsDashboard from "./components/StatsDashboard";
import BottomNav from "./components/BottomNav";
import { getSessions, addSession, updateSession, deleteSession, getSessionById } from "./utils/data";
import { requestReminderPermission, scheduleDailyReminder } from "./reminder";

// PUBLIC_INTERFACE
// Main App for SurfSync
function App() {
  const [page, setPage] = useState("home"); // "home" | "stats"
  const [sessions, setSessions] = useState(() => getSessions());
  const [showForm, setShowForm] = useState(false);
  const [detailId, setDetailId] = useState(null);

  useEffect(() => {
    setSessions(getSessions());
  }, []);

  // Reminders (once per mount)
  useEffect(() => {
    requestReminderPermission();
    // Schedule a daily notification at 8am
    scheduleDailyReminder(8);
  }, []);

  const handleLog = () => setShowForm(true);

  const handleSave = (newSession) => {
    addSession(newSession);
    setSessions(getSessions());
    setShowForm(false);
  };

  const handleEdit = (id, updatedSession) => {
    updateSession(id, updatedSession);
    setSessions(getSessions());
    setDetailId(null);
  };

  const handleDelete = (id) => {
    if (window.confirm("Delete this session?")) {
      deleteSession(id);
      setSessions(getSessions());
      if (detailId === id) setDetailId(null);
    }
  };

  const handleDetail = (id) => setDetailId(id);

  // Theming: minimal, but respect App.css toggles
  const [theme, setTheme] = useState("light");
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  // Routing logic
  let content;
  if (detailId) {
    const session = getSessionById(detailId);
    if (!session) { setDetailId(null); content = null; }
    else content = (
      <SessionDetail
        session={session}
        onBack={()=>setDetailId(null)}
        onDelete={() => handleDelete(detailId)}
        onEdit={handleEdit}
      />
    );
  } else if (page === "home") {
    content = (
      <Home
        sessions={sessions}
        onLog={handleLog}
        onDetail={handleDetail}
        onDelete={handleDelete}
      />
    );
  } else if (page === "stats") {
    content = <StatsDashboard sessions={sessions} />;
  }

  return (
    <div className="App" style={{ minHeight: "100vh", background: "linear-gradient(120deg, #a1dbef 0%, #013b7e10 100%)" }}>
      <button
        className="theme-toggle"
        onClick={() => setTheme(t => (t === "light" ? "dark" : "light"))}
        aria-label={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
        style={{ zIndex: 20001 }}
      >
        {theme === "light" ? "🌙 Dark" : "☀️ Light"}
      </button>
      {content}
      <BottomNav page={page} setPage={setPage} />
      {showForm &&
        <LogSessionForm
          onSave={handleSave}
          onCancel={() => setShowForm(false)}
        />
      }
    </div>
  );
}

export default App;
