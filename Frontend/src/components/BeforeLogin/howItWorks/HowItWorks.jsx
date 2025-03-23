import { UserPlus, UsersRound, Home, Smile } from "lucide-react";
import "./HowItWorks.css";

const HowItWorks = () => {
    return (
        <section id="how-it-works" className="landing-page-how-it-works">
            <div className="landing-page-container">
                <h2>How DormMate Works</h2>
                <div className="landing-page-steps">
                    {[
                        { step: 1, title: "Create Your Profile", icon: <UserPlus size={64} /> },
                        { step: 2, title: "Find & Connect", icon: <UsersRound size={64} /> },
                        { step: 3, title: "Set Up Your Space", icon: <Home size={64} /> },
                        { step: 4, title: "Enjoy Better Dorm Life", icon: <Smile size={64} /> }
                    ].map((item, index) => (
                        <div key={index} className="landing-page-step">
                            <div className="landing-page-step-number">{item.step}</div>
                            <div className="landing-page-step-content">
                                <h3>{item.title}</h3>
                                <div className="landing-page-step-icon">{item.icon}</div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default HowItWorks;
