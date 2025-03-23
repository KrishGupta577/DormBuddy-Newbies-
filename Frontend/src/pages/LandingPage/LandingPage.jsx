import { useState } from "react";
import Header from "../../components/BeforeLogin/Header/Header";
import Hero from "../../components/BeforeLogin/Hero/Hero";
import Features from "../../components/BeforeLogin/Features/Features";
import HowItWorks from "../../components/BeforeLogin/howItWorks/HowItWorks";
import Footer from "../../components/BeforeLogin/Footer/Footer";
import LoginPage from "../../components/BeforeLogin/AuthenticationPages/LoginPage/LoginPage";

const LandingPage = () => {
    const [showLogIn, setShowLogin] = useState(false);

    return (
        <div className="landing-page-dorm-management">
            <Header setShowLogin={setShowLogin} />
            {showLogIn && <LoginPage setShowLogin={setShowLogin} />}
            <Hero setShowLogin={setShowLogin} />
            <Features />
            <HowItWorks />
            <Footer />
        </div>
    );
};

export default LandingPage;
