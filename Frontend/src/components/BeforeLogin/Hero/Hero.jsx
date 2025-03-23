import "./Hero.css";

const Hero = ({ setShowLogin }) => {
    return (
        <section id="home" className="landing-page-hero">
            <div className="landing-page-container landing-page-hero-container">
                <div className="landing-page-hero-content">
                    <h1>Simplify Your Dorm Life</h1>
                    <p>The all-in-one platform that helps you find compatible roommates, manage tasks, split bills, and handle maintenance requests.</p>
                    <div className="landing-page-hero-buttons">
                        <a onClick={() => setShowLogin(true)} className="landing-page-btn landing-page-btn-primary landing-page-btn-large">Get Started</a>
                    </div>
                    <div className="landing-page-hero-stats">
                        <div className="landing-page-stat">
                            <span className="landing-page-stat-number">10,000+</span>
                            <span className="landing-page-stat-label">Students</span>
                        </div>
                        <div className="landing-page-stat">
                            <span className="landing-page-stat-number">250+</span>
                            <span className="landing-page-stat-label">Universities</span>
                        </div>
                        <div className="landing-page-stat">
                            <span className="landing-page-stat-number">4.8/5</span>
                            <span className="landing-page-stat-label">User Rating</span>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Hero;
