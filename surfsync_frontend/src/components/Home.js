import React from "react";
import SessionCard from "./SessionCard";
import "./Home.css";
import { WaveIcon } from "./SurfIcons";

// PUBLIC_INTERFACE
/** SurfSync App Home - lists surf session cards
 *  @param {Object} props
 *    sessions: Array of logged surf sessions
 *    onLog: function to log a session (shows form)
 *    onDetail: function(sessionId) - view session details
 *    onDelete: function(sessionId) - delete session
 */
function Home({ sessions, onLog, onDetail, onDelete }) {
  return (
    <div className="home">
      <div className="surf-header">
        <div className="logo-row">
          <WaveIcon size={32} />
          <span className="surf-title">SurfSync</span>
        </div>
        <button className="log-btn" onClick={onLog}>
          + Log Session
        </button>
      </div>
      <div className="sessions-list">
        {sessions.length === 0 ? (
          <div className="no-sessions">
            <WaveIcon size={64} color="#1de9b6" />
            <p>Welcome! Start tracking your surf memories 🎉</p>
          </div>
        ) : (
          sessions.map(session => (
            <SessionCard
              key={session.id}
              session={session}
              onDetail={() => onDetail(session.id)}
              onDelete={() => onDelete(session.id)}
            />
          ))
        )}
      </div>
    </div>
  );
}

export default Home;
