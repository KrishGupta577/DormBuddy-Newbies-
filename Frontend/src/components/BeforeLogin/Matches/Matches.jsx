import React, { useState, useContext } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "./Matches.css";
import { StoreContext } from "../../../context/StoreContext";
import { useNavigate } from "react-router-dom";

const MatchRoommate = () => {
    const { url, matches, setMatches, userInfo, token } = useContext(StoreContext); // Ensure userInfo is retrieved
    const [loading, setLoading] = useState(false);
    const [filter, setFilter] = useState("");
    const [selectedMatch, setSelectedMatch] = useState(null);
    const [showPopup, setShowPopup] = useState(false);
    const [isProcessing, setIsProcessing] = useState(false);
    const navigate = useNavigate();

    console.log(matches)

    // Filter matches by name or occupation
    const filteredMatches = matches.filter(match =>
        match.name.toLowerCase().includes(filter.toLowerCase()) ||
        match.occupation.toLowerCase().includes(filter.toLowerCase())
    );

    const handleCardClick = (match) => {
        setSelectedMatch(match);
        setShowPopup(true);
    };

    const closePopup = () => {
        setShowPopup(false);
        setSelectedMatch(null);
        setIsProcessing(false);
    };

    const handleConfirmMatch = async () => {
        if (!selectedMatch || !userInfo) {
            toast.error("Invalid match selection.");
            return;
        }

        setIsProcessing(true);

        try {
            const response = await axios.post(`${url}/dormRoom/add-roommate`, {
                roommateId: selectedMatch._id,
                dormId: selectedMatch.dormId
            },{headers:{token}});

            if (response.data.success) {
                toast.success("Roommate successfully assigned!");
                navigate('/dashboard'); // Redirect to dashboard or room info page
            } else {
                toast.error(response.data.message);
            }
        } catch (error) {
            console.error("Error confirming match:", error);
            toast.error("Failed to confirm match. Please try again.");
        } finally {
            setIsProcessing(false);
        }
    };

    return (
        <div className="matches-container">
            <div className="matches-header">
                <h2>Matching Roommates</h2>
                <div className="matches-search">
                    <input
                        type="text"
                        placeholder="Search by name or occupation..."
                        value={filter}
                        onChange={(e) => setFilter(e.target.value)}
                        className="matches-search-input"
                    />
                </div>
            </div>

            {loading ? (
                <div className="matches-loading">
                    <div className="matches-loading-spinner"></div>
                    <p>Finding your perfect roommates...</p>
                </div>
            ) : filteredMatches.length > 0 ? (
                <div className="matches-grid">
                    {filteredMatches.map((match) => (
                        <div
                            key={match._id}
                            className="matches-card"
                            onClick={() => handleCardClick(match)}
                        >
                            <div className="matches-card-header">
                                <h3>{match.name}</h3>
                                <span className="matches-badge">{match.occupation}</span>
                            </div>

                            <div className="matches-card-body">
                                <div className="matches-info-group">
                                    <div className="matches-info-item">
                                        <span className="matches-info-label">Budget:</span>
                                        <span className="matches-info-value">&#8377; {match.budget}</span>
                                    </div>
                                    <div className="matches-info-item">
                                        <span className="matches-info-label">Location:</span>
                                        <span className="matches-info-value">{match.location}</span>
                                    </div>
                                </div>

                                <div className="matches-preferences">
                                    <h4>Preferences</h4>
                                    <div className="matches-preferences-grid">
                                        <div className="matches-preference-item">
                                            <span className="matches-preference-icon">🌙</span>
                                            <span>{match.sleepSchedule}</span>
                                        </div>
                                        <div className="matches-preference-item">
                                            <span className="matches-preference-icon">🧹</span>
                                            <span>{match.cleanliness}</span>
                                        </div>
                                        <div className="matches-preference-item">
                                            <span className="matches-preference-icon">👥</span>
                                            <span>{match.socialPreference}</span>
                                        </div>
                                        <div className="matches-preference-item">
                                            <span className="matches-preference-icon">🚬</span>
                                            <span>{match.smoking ? "Smoker" : "Non-smoker"}</span>
                                        </div>
                                        <div className="matches-preference-item">
                                            <span className="matches-preference-icon">🍷</span>
                                            <span>{match.drinking ? "Drinks" : "Non-drinker"}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="matches-empty">
                    <div className="matches-empty-icon">🏠</div>
                    <h3>No matches found</h3>
                    <p>Try adjusting your search criteria or check back later.</p>
                </div>
            )}

            {/* Payment Popup */}
            {showPopup && selectedMatch && (
                <div className="payment-popup-overlay" onClick={closePopup}>
                    <div className="payment-popup" onClick={(e) => e.stopPropagation()}>
                        <button className="payment-popup-close" onClick={closePopup}>×</button>

                        <div className="payment-initial-content">
                            <div className="payment-popup-header">
                                <div className="payment-popup-emoji">🤝</div>
                                <h3>Your Perfect Match Awaits!</h3>
                            </div>

                            <div className="payment-popup-message">
                                <p>We've found that you and {selectedMatch.name} are <strong>93% compatible</strong>! Ready to take the next step toward your ideal living situation?</p>

                                <div className="payment-benefits">
                                    <div className="payment-benefit-item">
                                        <div className="payment-benefit-icon">📱</div>
                                        <span>Phone & Email</span>
                                    </div>
                                    <div className="payment-benefit-item">
                                        <div className="payment-benefit-icon">🔒</div>
                                        <span>Verified Profile</span>
                                    </div>
                                </div>
                            </div>

                            <button 
                                className="payment-button pulse-animation" 
                                onClick={handleConfirmMatch} 
                                disabled={isProcessing}
                            >
                                {isProcessing ? "Processing..." : "Make Payment"}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default MatchRoommate;
