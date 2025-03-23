import { useState } from "react";
import "./Header.css";

const Header = ({ setShowLogin }) => {
    return (
        <header className="landing-page-header">
            <div className="landing-page-container landing-page-header-container">
                <div className="landing-page-logo">
                    <h1>DormBuddy</h1>
                </div>
                <nav className="landing-page-nav">
                    <ul className="landing-page-nav-links">
                        <li><a href="#home">Home</a></li>
                        <li><a href="#features">Features</a></li>
                        <li><a href="#how-it-works">How It Works</a></li>
                        <li><a href="#testimonials">Testimonials</a></li>
                    </ul>
                </nav>
                <div className="landing-page-header-buttons">
                    <a onClick={() => setShowLogin(true)} className="landing-page-btn landing-page-btn-secondary">Log In</a>
                </div>
            </div>
        </header>
    );
};

export default Header;
