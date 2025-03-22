import { useState } from 'react';
import './LandingPage.css';
import {
    Users,
    CheckSquare,
    DollarSign,
    Wrench,
    UserPlus,
    UsersRound,
    Home,
    Smile,
    Facebook,
    Twitter,
    Instagram,
    Linkedin
} from 'lucide-react';
import LoginPage from '../../components/AuthenticationPages/LoginPage/LoginPage';

const LandingPage = () => {

    const [showLogIn, setShowLogin] = useState(false)

    return (
        <div className="landing-page-dorm-management">
            {/* Header */}
            <header className="landing-page-header">
                <div className="landing-page-container landing-page-header-container">
                    <div className="landing-page-logo">
                        <h1>DormBuddy</h1>
                    </div>

                    <nav className="landing-page-nav">
                        <ul className="landing-page-nav-links">
                            <li>
                                <a href="#home">Home</a>
                            </li>
                            <li>
                                <a href="#features">Features</a>
                            </li>
                            <li>
                                <a href="#how-it-works">How It Works</a>
                            </li>
                            <li>
                                <a href="#testimonials">Testimonials</a>
                            </li>
                        </ul>
                    </nav>

                    <div className="landing-page-header-buttons">
                        <a onClick={() => setShowLogin(true)} className="landing-page-btn landing-page-btn-secondary">Log In</a>
                    </div>

                </div>
            </header>

            {showLogIn && <LoginPage setShowLogin={setShowLogin} />}

            {/* Hero Section */}
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

            {/* Features Section */}
            <section id="features" className="landing-page-features">
                <div className="landing-page-container">
                    <div className="landing-page-section-header">
                        <h2>Everything You Need for Better Dorm Life</h2>
                        <p>DormMate simplifies every aspect of dorm living with powerful features designed specifically for students.</p>
                    </div>

                    <div className="landing-page-features-grid">
                        <div className="landing-page-feature-card">
                            <div className="landing-page-feature-icon">
                                <Users size={36} />
                            </div>
                            <h3>Smart Roommate Matching</h3>
                            <p>Find roommates who share your lifestyle, study habits, and interests with our compatibility algorithm.</p>
                            <ul className="landing-page-feature-list">
                                <li>Personality matching</li>
                                <li>Lifestyle compatibility scoring</li>
                                <li>Sleep/study habits alignment</li>
                                <li>Secure messaging system</li>
                            </ul>
                            <a href="/features/roommate-matching" className="landing-page-feature-link">Learn more →</a>
                        </div>

                        <div className="landing-page-feature-card">
                            <div className="landing-page-feature-icon">
                                <CheckSquare size={36} />
                            </div>
                            <h3>Task Management</h3>
                            <p>Coordinate roommate responsibilities with easy scheduling, reminders, and rotation systems.</p>
                            <ul className="landing-page-feature-list">
                                <li>Create shared tasks</li>
                                <li>Automated task rotation</li>
                                <li>Reminder notifications</li>
                                <li>Completion tracking</li>
                            </ul>
                            <a href="/features/task-management" className="landing-page-feature-link">Learn more →</a>
                        </div>

                        <div className="landing-page-feature-card">
                            <div className="landing-page-feature-icon">
                                <DollarSign size={36} />
                            </div>
                            <h3>Expense Tracking</h3>
                            <p>Split bills fairly, track shared expenses, and settle debts without uncomfortable conversations.</p>
                            <ul className="landing-page-feature-list">
                                <li>Easy bill splitting</li>
                                <li>Expense history</li>
                                <li>Payment reminders</li>
                                <li>Multiple payment methods</li>
                            </ul>
                            <a href="/features/expense-tracking" className="landing-page-feature-link">Learn more →</a>
                        </div>

                        <div className="landing-page-feature-card">
                            <div className="landing-page-feature-icon">
                                <Wrench size={36} />
                            </div>
                            <h3>Maintenance Requests</h3>
                            <p>Report and track maintenance issues with your dorm room directly through the app.</p>
                            <ul className="landing-page-feature-list">
                                <li>Photo attachments</li>
                                <li>Request status tracking</li>
                                <li>Maintenance history</li>
                                <li>Direct communication</li>
                            </ul>
                            <a href="/features/maintenance" className="landing-page-feature-link">Learn more →</a>
                        </div>
                    </div>
                </div>
            </section>

            {/* How It Works Section */}
            <section id="how-it-works" className="landing-page-how-it-works">
                <div className="landing-page-container">
                    <div className="landing-page-section-header">
                        <h2>How DormMate Works</h2>
                        <p>Getting started with DormMate is easy and takes just minutes.</p>
                    </div>

                    <div className="landing-page-steps">
                        <div className="landing-page-step">
                            <div className="landing-page-step-number">1</div>
                            <div className="landing-page-step-content">
                                <h3>Create Your Profile</h3>
                                <p>Sign up and tell us about your lifestyle, preferences, and what you're looking for in a roommate.</p>
                                <div className="landing-page-step-icon">
                                    <UserPlus size={64} className="landing-page-step-icon-svg" />
                                </div>
                            </div>
                        </div>

                        <div className="landing-page-step">
                            <div className="landing-page-step-number">2</div>
                            <div className="landing-page-step-content">
                                <h3>Find & Connect</h3>
                                <p>Browse compatible roommates or add your existing roommates to create your dorm group.</p>
                                <div className="landing-page-step-icon">
                                    <UsersRound size={64} className="landing-page-step-icon-svg" />
                                </div>
                            </div>
                        </div>

                        <div className="landing-page-step">
                            <div className="landing-page-step-number">3</div>
                            <div className="landing-page-step-content">
                                <h3>Set Up Your Space</h3>
                                <p>Add your dorm details, create task schedules, and start tracking shared expenses.</p>
                                <div className="landing-page-step-icon">
                                    <Home size={64} className="landing-page-step-icon-svg" />
                                </div>
                            </div>
                        </div>

                        <div className="landing-page-step">
                            <div className="landing-page-step-number">4</div>
                            <div className="landing-page-step-content">
                                <h3>Enjoy Better Dorm Life</h3>
                                <p>Use the app to manage daily dorm life with less stress and more coordination.</p>
                                <div className="landing-page-step-icon">
                                    <Smile size={64} className="landing-page-step-icon-svg" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Testimonials Section */}
            <section id="testimonials" className="landing-page-testimonials">
                <div className="landing-page-container">
                    <div className="landing-page-section-header">
                        <h2>What Students Say</h2>
                        <p>Thousands of students are already enjoying a better dorm experience with DormMate.</p>
                    </div>

                    <div className="landing-page-testimonial-cards">
                        <div className="landing-page-testimonial-card">
                            <div className="landing-page-testimonial-content">
                                <p>"DormMate saved my roommate relationships! The expense tracking feature eliminated all those awkward money conversations, and the task schedule keeps our place clean."</p>
                            </div>
                            <div className="landing-page-testimonial-author">
                                <div className="landing-page-author-image">
                                    <Users size={36} className="landing-page-testimonial-icon" />
                                </div>
                                <div className="landing-page-author-info">
                                    <h4>Alex Johnson</h4>
                                    <p>University of Michigan, Junior</p>
                                </div>
                            </div>
                        </div>

                        <div className="landing-page-testimonial-card">
                            <div className="landing-page-testimonial-content">
                                <p>"I was nervous about finding a roommate as a freshman, but DormMate matched me with someone who has become my best friend. We have similar study habits and sleep schedules!"</p>
                            </div>
                            <div className="landing-page-testimonial-author">
                                <div className="landing-page-author-image">
                                    <Users size={36} className="landing-page-testimonial-icon" />
                                </div>
                                <div className="landing-page-author-info">
                                    <h4>Maya Patel</h4>
                                    <p>UCLA, Sophomore</p>
                                </div>
                            </div>
                        </div>

                        <div className="landing-page-testimonial-card">
                            <div className="landing-page-testimonial-content">
                                <p>"The maintenance request feature is amazing! Our shower was fixed in half the time it usually takes because we could send photos and track the status right from the app."</p>
                            </div>
                            <div className="landing-page-testimonial-author">
                                <div className="landing-page-author-image">
                                    <Users size={36} className="landing-page-testimonial-icon" />
                                </div>
                                <div className="landing-page-author-info">
                                    <h4>Tyler Williams</h4>
                                    <p>Boston University, Senior</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Download Section */}
            <section id="download" className="landing-page-download">
                <div className="landing-page-container">
                    <div className="landing-page-download-content">
                        <h2>Ready to Transform Your Dorm Experience?</h2>
                        <p>Join thousands of students who've already simplified their dorm life with DormMate.</p>
                        <div className="landing-page-download-buttons">
                            <a onClick={() => setShowLogin(true)} className="landing-page-btn landing-page-btn-primary landing-page-btn-large">Sign Up Now — It's Free!</a>
                            <p className="landing-page-download-note">Available on web, iOS, and Android</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="landing-page-footer">
                <div className="landing-page-container">
                    <div className="landing-page-footer-content">
                        <div className="landing-page-footer-logo">
                            <h2>DormMate</h2>
                            <p>Making dorm life easier since 2024</p>
                        </div>

                        <div className="landing-page-footer-links">
                            <div className="landing-page-footer-column">
                                <h3>Product</h3>
                                <ul>
                                    <li><a href="#features">Features</a></li>
                                    <li><a href="#how-it-works">How It Works</a></li>
                                    <li><a href="#download">Download</a></li>
                                    <li><a href="#pricing">Pricing</a></li>
                                </ul>
                            </div>

                            <div className="landing-page-footer-column">
                                <h3>Support</h3>
                                <ul>
                                    <li><a href="#faq">FAQ</a></li>
                                    <li><a href="#help">Help Center</a></li>
                                    <li><a href="#contact">Contact Us</a></li>
                                    <li><a href="#privacy">Privacy</a></li>
                                </ul>
                            </div>

                            <div className="landing-page-footer-column">
                                <h3>Company</h3>
                                <ul>
                                    <li><a href="#about">About</a></li>
                                    <li><a href="#blog">Blog</a></li>
                                    <li><a href="#careers">Careers</a></li>
                                    <li><a href="#press">Press</a></li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    <div className="landing-page-footer-bottom">
                        <p>© 2025 DormMate. All rights reserved.</p>
                        <div className="landing-page-social-links">
                            <a href="#" className="landing-page-social-link"><Facebook size={20} /></a>
                            <a href="#" className="landing-page-social-link"><Twitter size={20} /></a>
                            <a href="#" className="landing-page-social-link"><Instagram size={20} /></a>
                            <a href="#" className="landing-page-social-link"><Linkedin size={20} /></a>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default LandingPage;