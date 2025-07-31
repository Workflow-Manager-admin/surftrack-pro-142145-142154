//
// PUBLIC_INTERFACE
// Utility for session storage, retrieval, and id helpers

const SESSION_KEY = "surf_sessions";

/**
 * PUBLIC_INTERFACE
 * getSessions will auto-populate realistic sample surf sessions if none exist for first-time users.
 */
export function getSessions() {
  let s = localStorage.getItem(SESSION_KEY);
  if (!s) {
    // --- SAMPLE DATA: 8 sessions, varied spots/boards/moods/dates/conditions ---
    const sampleSessions = [
      {
        id: "s1001",
        date: new Date(Date.now() - 86400000 * 1).toISOString().slice(0, 10), // yesterday
        spot: "Malibu Beach",
        board: "Longboard",
        waveCount: 10,
        mood: "happy",
        notes: "Glass off at sunset 🌅, mellow crowd, dolphins spotted.",
        conditions: "Sunny, Glassy, Small waves"
      },
      {
        id: "s1002",
        date: new Date(Date.now() - 86400000 * 6).toISOString().slice(0, 10), // last week
        spot: "Pipeline",
        board: "Shortboard",
        waveCount: 5,
        mood: "stoked",
        notes: "Epic barrels, but super crowded. Caught a screamer!",
        conditions: "Overhead, Offshore winds, Clean"
      },
      {
        id: "s1003",
        date: new Date(Date.now() - 86400000 * 13).toISOString().slice(0, 10), // 2 weeks ago
        spot: "Trestles",
        board: "Fish",
        waveCount: 8,
        mood: "tired",
        notes: "Paddled a lot, plenty of fun sections, a bit bumpy.",
        conditions: "Cloudy, Bumpy, Warm water"
      },
      {
        id: "s1004",
        date: new Date(Date.now() - 86400000 * 20).toISOString().slice(0, 10), // 3 weeks ago
        spot: "Waikiki",
        board: "Soft Top",
        waveCount: 12,
        mood: "happy",
        notes: "Took Parker surfing for the first time. Party waves, fun vibes.",
        conditions: "Sunny, Gentle, Busy lineups"
      },
      {
        id: "s1005",
        date: new Date(Date.now() - 86400000 * 3).toISOString().slice(0, 10), // 3 days ago
        spot: "Rincon Point",
        board: "Shortboard",
        waveCount: 7,
        mood: "frustrated",
        notes: "Missed takeoffs, wind picked up, tough paddle out.",
        conditions: "Choppy, Onshore wind"
      },
      {
        id: "s1006",
        date: new Date(Date.now() - 86400000 * 30).toISOString().slice(0, 10), // about 1 month ago
        spot: "J-Bay",
        board: "Fish",
        waveCount: 6,
        mood: "scared",
        notes: "Long walls, saw a fin (just a dolphin?), super fast sections!",
        conditions: "Cold, Clean faces"
      },
      {
        id: "s1007",
        date: new Date(Date.now() - 86400000 * 17).toISOString().slice(0, 10), // ~2.5 weeks ago
        spot: "Black's Beach",
        board: "Shortboard",
        waveCount: 11,
        mood: "stoked",
        notes: "Uncrowded for once! A-frames rolling in, got worked once.",
        conditions: "Sunny, Fun, Light offshore wind"
      },
      {
        id: "s1008",
        date: new Date(Date.now() - 86400000 * 8).toISOString().slice(0, 10), // over a week ago
        spot: "Scripps Pier",
        board: "Longboard",
        waveCount: 9,
        mood: "tired",
        notes: "Cross-shore, lots of waves, arms feel like noodles.",
        conditions: "Cloudy, Cross-shore, Shoulder-high"
      }
    ];
    localStorage.setItem(SESSION_KEY, JSON.stringify(sampleSessions));
    return sampleSessions;
  }
  try {
    return s ? JSON.parse(s) : [];
  } catch {
    return [];
  }
}

// PUBLIC_INTERFACE
export function saveSessions(sessions) {
  localStorage.setItem(SESSION_KEY, JSON.stringify(sessions));
}

// PUBLIC_INTERFACE
export function addSession(session) {
  const all = getSessions();
  all.unshift({ ...session, id: Date.now().toString() });
  saveSessions(all);
}

// PUBLIC_INTERFACE
export function updateSession(id, session) {
  const all = getSessions();
  const idx = all.findIndex(x => x.id === id);
  if (idx !== -1) {
    all[idx] = { ...all[idx], ...session };
    saveSessions(all);
  }
}

// PUBLIC_INTERFACE
export function deleteSession(id) {
  const all = getSessions().filter(x => x.id !== id);
  saveSessions(all);
}

// PUBLIC_INTERFACE
export function getSessionById(id) {
  return getSessions().find(x => x.id === id);
}

// PUBLIC_INTERFACE
// Helper: get session fields for filtering
export function getAllSpotsAndBoards(sessions) {
  const spots = Array.from(new Set(sessions.map(s => s.spot).filter(Boolean)));
  const boards = Array.from(new Set(sessions.map(s => s.board).filter(Boolean)));
  return { spots, boards };
}
