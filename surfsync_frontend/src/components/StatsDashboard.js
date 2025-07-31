import React, { useMemo, useState } from "react";
import { getAllSpotsAndBoards } from "../utils/data";
import "./StatsDashboard.css";
import { MOODS } from "../theme";
import { WaveIcon } from "./SurfIcons";

// PUBLIC_INTERFACE
/**
 * StatsDashboard - Show surfing stats, filters, and charts
 * @param {Object} props
 *   sessions: array of session objects
 */
function StatsDashboard({ sessions }) {
  const [filters, setFilters] = useState({ spot: "", board: "", mood: "" });
  const { spots, boards } = getAllSpotsAndBoards(sessions);

  // Filters
  const filtered = useMemo(() => {
    return sessions.filter(s =>
      (!filters.spot || s.spot === filters.spot) &&
      (!filters.board || s.board === filters.board) &&
      (!filters.mood || s.mood === filters.mood)
    );
  }, [filters, sessions]);

  // Stats calculations
  const totalWaves = filtered.reduce((sum, s) => sum + Number(s.waveCount || 0), 0);
  const bySpot = {};
  filtered.forEach(s => bySpot[s.spot] = (bySpot[s.spot] || 0) + 1);

  const byBoard = {};
  filtered.forEach(s => byBoard[s.board] = (byBoard[s.board] || 0) + 1);

  const byMood = {};
  filtered.forEach(s => byMood[s.mood] = (byMood[s.mood] || 0) + 1);

  return (
    <div className="stats-bg">
      <div className="stats-header">
        <WaveIcon size={30} /> <span>Stats Dashboard</span>
      </div>
      <div className="filters-row">
        <select value={filters.spot} onChange={e => setFilters(f => ({ ...f, spot: e.target.value }))}>
          <option value="">All Spots</option>
          {spots.map(spot => <option key={spot}>{spot}</option>)}
        </select>
        <select value={filters.board} onChange={e => setFilters(f => ({ ...f, board: e.target.value }))}>
          <option value="">All Boards</option>
          {boards.map(board => <option key={board}>{board}</option>)}
        </select>
        <select value={filters.mood} onChange={e => setFilters(f => ({ ...f, mood: e.target.value }))}>
          <option value="">All Moods</option>
          {MOODS.map(m => <option value={m.value} key={m.value}>{m.label}</option>)}
        </select>
      </div>
      <div className="stats-cards-row">
        <div className="stats-card">
          <strong>{filtered.length}</strong>
          <div>Sessions</div>
        </div>
        <div className="stats-card">
          <strong>{totalWaves}</strong>
          <div>Total Waves</div>
        </div>
        <div className="stats-card">
          <strong>{
            Array.from(new Set(filtered.map(s => s.spot))).length
          }</strong>
          <div>Spots Surfed</div>
        </div>
      </div>
      <div className="charts-grid">
        <div className="chart-block">
          <h4>Sessions per Spot</h4>
          {Object.keys(bySpot).length === 0 ? (
            <div className="chart-empty">No Data</div>
          ) : (
            Object.entries(bySpot).map(([spot, count]) =>
              <BarLine key={spot} label={spot} value={count} max={Math.max(...Object.values(bySpot))} color="#017ea2" />)
          )}
        </div>
        <div className="chart-block">
          <h4>Board Usage</h4>
          {Object.keys(byBoard).length === 0 ? (
            <div className="chart-empty">No Data</div>
          ) : (
            Object.entries(byBoard).map(([board, count]) =>
              <BarLine key={board} label={board} value={count} max={Math.max(...Object.values(byBoard))} color="#1de9b6" />)
          )}
        </div>
        <div className="chart-block">
          <h4>Mood Trends</h4>
          {Object.keys(byMood).length === 0 ? (
            <div className="chart-empty">No Data</div>
          ) : (
            Object.entries(byMood).map(([mood, count]) => {
              const moodObj = MOODS.find(m => m.value === mood);
              return <BarLine key={mood} label={moodObj ? moodObj.icon : mood} value={count}
                max={Math.max(...Object.values(byMood))} color="#f1e9d1" />;
            })
          )}
        </div>
      </div>
    </div>
  );
}

function BarLine({ label, value, max, color }) {
  // UI for one bar in charts
  const percent = max ? (value / max * 100) : 0;
  return (
    <div className="bar-row">
      <span className="bar-label">{label}</span>
      <div className="bar-outer">
        <div className="bar-inner" style={{ width: `${percent}%`, background: color }}></div>
      </div>
      <span className="bar-count">{value}</span>
    </div>
  );
}

export default StatsDashboard;
