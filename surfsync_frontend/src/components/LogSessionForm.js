import React, { useState } from "react";
import { MOODS } from "../theme";
import "./LogSessionForm.css";

/**
 * PUBLIC_INTERFACE
 * LogSessionForm - create or edit a surf session
 * @param {Object} props
 *   initial (object): default values for editing, null for new
 *   onSave (function): called with session data when saved
 *   onCancel (function): closes the form
 */
function LogSessionForm({ initial, onSave, onCancel }) {
  const [form, setForm] = useState(
    initial || {
      date: new Date().toISOString().slice(0, 10),
      spot: "",
      board: "",
      waveCount: "",
      mood: "",
      notes: "",
      conditions: ""
    }
  );

  function change(e) {
    const { name, value } = e.target;
    setForm(f => ({ ...f, [name]: value }));
  }
  function submit(e) {
    e.preventDefault();
    if (!form.date || !form.spot || !form.board || !form.mood) return;
    onSave({ ...form, waveCount: Number(form.waveCount || 0) });
  }

  return (
    <div className="modal-bg" onClick={onCancel}>
      <form
        className="log-form"
        onClick={e => e.stopPropagation()}
        onSubmit={submit}
        autoComplete="off"
      >
        <h2>Log Surf Session</h2>
        <label>
          Date
          <input type="date" name="date" value={form.date} onChange={change} required />
        </label>
        <label>
          Surf Spot
          <input name="spot" placeholder="Beach name..." value={form.spot} onChange={change} required />
        </label>
        <label>
          Surfboard
          <input name="board" placeholder="Board..." value={form.board} onChange={change} required />
        </label>
        <label>
          Wave Count
          <input name="waveCount" type="number" min={0} placeholder="e.g. 10" value={form.waveCount} onChange={change}/>
        </label>
        <label>
          Mood
          <div className="mood-row">
            {MOODS.map(m => (
              <button
                type="button"
                className={`mood-btn${form.mood === m.value ? " selected" : ""}`}
                key={m.value}
                onClick={() => setForm(f => ({ ...f, mood: m.value }))}
                aria-label={m.label}
              >
                {m.icon}
              </button>
            ))}
          </div>
        </label>
        <label>
          Notes
          <textarea name="notes" rows="2" placeholder="Conditions, waves, etc..."
            value={form.notes} onChange={change} maxLength={180}/>
        </label>
        <label>
          Conditions
          <input name="conditions" placeholder="Sunny, Glassy, Crowded..." value={form.conditions} onChange={change} />
        </label>
        <div className="log-actions">
          <button type="button" className="cancel-btn" onClick={onCancel}>Cancel</button>
          <button type="submit" className="save-btn" disabled={!form.date || !form.spot || !form.board || !form.mood}>
            Save
          </button>
        </div>
      </form>
    </div>
  );
}
export default LogSessionForm;
