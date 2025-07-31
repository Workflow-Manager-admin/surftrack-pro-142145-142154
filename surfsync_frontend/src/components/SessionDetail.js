import React, { useState } from "react";
import { MOODS } from "../theme";
import "./SessionDetail.css";
import LogSessionForm from "./LogSessionForm";
import { SurfboardIcon, SurfSunIcon, WaveIcon } from "./SurfIcons";

// PUBLIC_INTERFACE
/**
 * SessionDetail - single session viewing w/ edit
 * @param {{
 *  session: object, onBack: func, onDelete: func, onEdit: func
 * }}
 */
function SessionDetail({ session, onBack, onDelete, onEdit }) {
  const [editing, setEditing] = useState(false);
  if (!session) return null;
  const mood = MOODS.find(m => m.value === session.mood);

  return editing ? (
    <LogSessionForm
      initial={session}
      onSave={s => {
        setEditing(false);
        onEdit(session.id, s);
      }}
      onCancel={() => setEditing(false)}
    />
  ) : (
    <div className="detail-bg">
      <div className="detail-card">
        <button className="back-btn" onClick={onBack}>← Back</button>
        <div className="detail-top-row">
          <span className="mood-emoji">{mood ? mood.icon : ""}</span>
          <div className="detail-title">{session.spot}</div>
        </div>
        <div className="detail-list">
          <div>
            <SurfSunIcon /> <span>Date:</span> {new Date(session.date).toLocaleDateString()}
          </div>
          <div>
            <SurfboardIcon /> <span>Board:</span> {session.board}
          </div>
          <div>
            <WaveIcon /> <span>Waves:</span> {session.waveCount}
          </div>
          <div>
            <span>Conditions:</span> {session.conditions || "n/a"}
          </div>
          <div>
            <span>Notes:</span> {session.notes || "none"}
          </div>
        </div>
        <div className="detail-actions">
          <button className="edit-btn" onClick={() => setEditing(true)}>Edit</button>
          <button className="delete-btn" onClick={onDelete}>Delete</button>
        </div>
      </div>
    </div>
  );
}

export default SessionDetail;
