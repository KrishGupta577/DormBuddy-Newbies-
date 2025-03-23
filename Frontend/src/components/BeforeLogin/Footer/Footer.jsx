import { Facebook, Twitter, Instagram, Linkedin } from "lucide-react";
import "./Footer.css";

const Footer = () => {
    return (
        <footer className="landing-page-footer">
            <div className="landing-page-container">
                <div className="landing-page-footer-content">
                    <h2>DormMate</h2>
                    <p>Making dorm life easier since 2024</p>
                </div>
                <div className="landing-page-social-links">
                    <a href="#"><Facebook size={20} /></a>
                    <a href="#"><Twitter size={20} /></a>
                    <a href="#"><Instagram size={20} /></a>
                    <a href="#"><Linkedin size={20} /></a>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
