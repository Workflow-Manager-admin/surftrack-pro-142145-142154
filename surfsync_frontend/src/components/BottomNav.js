import React from "react";
import { WaveIcon, SurfboardIcon } from "./SurfIcons";
import "./BottomNav.css";

// PUBLIC_INTERFACE
/**
 * BottomNav - switches between Home & Stats
 * @param {String} page - "home" or "stats"
 * @param {Function} setPage
 */
function BottomNav({ page, setPage }) {
  return (
    <nav className="bottom-nav">
      <button
        className={page === "home" ? "active" : ""}
        onClick={() => setPage("home")}
        aria-label="Home"
      >
        <WaveIcon size={25} />
        <span>Home</span>
      </button>
      <button
        className={page === "stats" ? "active" : ""}
        onClick={() => setPage("stats")}
        aria-label="Stats"
      >
        <SurfboardIcon size={23} />
        <span>Stats</span>
      </button>
    </nav>
  );
}

export default BottomNav;
