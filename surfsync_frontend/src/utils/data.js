//
// PUBLIC_INTERFACE
// Utility for session storage, retrieval, and id helpers

const SESSION_KEY = "surf_sessions";

// PUBLIC_INTERFACE
export function getSessions() {
  const s = localStorage.getItem(SESSION_KEY);
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
