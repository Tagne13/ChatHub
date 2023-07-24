import React, { useState } from "react";
import { Link} from "react-router-dom";
import { auth } from "../../utils/auth";
import "./styles/navbarStyle.css";

function Navbar() {
  return (
    <nav className="navbar">
      <a href="/" className="app-name">
        ChatHub
      </a>
      <button className="home">
        {/* icon from heroicons.com */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          viewBox="0 0 20 20"
          fill="white"
        >
          <path
            fillRule="evenodd"
            d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM9 15a1 1 0 011-1h6a1 1 0 110 2h-6a1 1 0 01-1-1z"
            clipRule="evenodd"
          />
        </svg>
      </button>
      <div
        className="navbar-menu">
        <ul>
          <li>
            <a href="/">Home</a>
          </li>
          <li>
            <a href="https://donate.stripe.com/test_aEUbLP9wB0B2ciAfYY">Donate</a>
          </li>
          <li>
            <a href="#" className="notification">
              <span>Inbox</span>
              <span class="badge">2</span>
            </a>
          </li>
          <li>
            <a href="/">Logout</a>
          </li>
        </ul>
      </div>
      
    </nav>
  );
}

export default Navbar;