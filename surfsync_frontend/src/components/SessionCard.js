import React from "react";
import { SurfboardIcon, SurfSunIcon } from "./SurfIcons";
import { MOODS } from "../theme";
import "./SessionCard.css";

/**
 * PUBLIC_INTERFACE
 * SessionCard - stylized card with session info and actions.
 * @param {{session: object, onDetail: func, onDelete: func}}
 */
function SessionCard({ session, onDetail, onDelete }) {
  const moodObj = MOODS.find(m => m.value === session.mood);

  return (
    <div className="session-card" onClick={onDetail}>
      <div className="session-card-top">
        <span className="session-mood">{moodObj ? moodObj.icon : ""}</span>
        <span className="session-date">
          {new Date(session.date).toLocaleDateString()}
        </span>
        <button className="delete-btn" title="Delete session" onClick={e => { e.stopPropagation(); onDelete(); }}>✕</button>
      </div>
      <div className="session-details">
        <div className="detail-row">
          <SurfboardIcon size={20} /> <span>{session.board}</span>
        </div>
        <div className="detail-row">
          <SurfSunIcon size={18} /> <span>{session.spot}</span>
        </div>
        <div className="detail-row">
          <span>🌊 {session.waveCount} waves</span>
        </div>
        <div className="detail-row note">
          {session.notes && (
            <span title="Notes">📝 {session.notes.slice(0, 40)}{session.notes.length > 40 ? "..." : ""}</span>
          )}
        </div>
      </div>
    </div>
  );
}

export default SessionCard;
