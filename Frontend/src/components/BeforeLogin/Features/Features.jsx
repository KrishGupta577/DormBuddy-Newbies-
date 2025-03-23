import { Users, CheckSquare, DollarSign, Wrench } from "lucide-react";
import "./Features.css";

const features = [
    {
        icon: <Users size={36} />,
        title: "Smart Roommate Matching",
        description: "Find roommates who share your lifestyle, study habits, and interests with our compatibility algorithm.",
        link: "/features/roommate-matching"
    },
    {
        icon: <CheckSquare size={36} />,
        title: "Task Management",
        description: "Coordinate roommate responsibilities with easy scheduling, reminders, and rotation systems.",
        link: "/features/task-management"
    },
    {
        icon: <DollarSign size={36} />,
        title: "Expense Tracking",
        description: "Split bills fairly, track shared expenses, and settle debts without uncomfortable conversations.",
        link: "/features/expense-tracking"
    },
    {
        icon: <Wrench size={36} />,
        title: "Maintenance Requests",
        description: "Report and track maintenance issues with your dorm room directly through the app.",
        link: "/features/maintenance"
    }
];

const Features = () => {
    return (
        <section id="features" className="landing-page-features">
            <div className="landing-page-container">
                <h2>Everything You Need for Better Dorm Life</h2>
                <div className="landing-page-features-grid">
                    {features.map((feature, index) => (
                        <div key={index} className="landing-page-feature-card">
                            <div className="landing-page-feature-icon">{feature.icon}</div>
                            <h3>{feature.title}</h3>
                            <p>{feature.description}</p>
                            <a href={feature.link} className="landing-page-feature-link">Learn more →</a>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Features;
