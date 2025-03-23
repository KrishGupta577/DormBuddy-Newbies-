import React, { useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements, useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import axios from "axios";
import "./StripeGateway.css"; // We'll create this CSS file next

// Replace with your actual publishable key from Stripe Dashboard
const stripePromise = loadStripe("your_publishable_key");

// Custom styling for the CardElement
const CARD_ELEMENT_OPTIONS = {
  style: {
    base: {
      color: "#32325d",
      fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
      fontSmoothing: "antialiased",
      fontSize: "16px",
      "::placeholder": {
        color: "#aab7c4"
      }
    },
    invalid: {
      color: "#fa755a",
      iconColor: "#fa755a"
    }
  }
};

const CheckoutForm = ({ amount = 5000, onSuccess }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [cardComplete, setCardComplete] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    if (!stripe || !elements || !cardComplete) return;

    setLoading(true);
    setError(null);

    try {
      // Create a payment intent on your server
      const { data } = await axios.post("/api/create-payment-intent", {
        amount, // amount in smallest currency unit (cents/paise)
      });

      const { error: confirmError, paymentIntent } = await stripe.confirmCardPayment(
        data.clientSecret,
        {
          payment_method: {
            card: elements.getElement(CardElement),
          },
        }
      );

      if (confirmError) {
        setError(confirmError.message);
      } else if (paymentIntent.status === "succeeded") {
        setSuccess(true);
        if (onSuccess) onSuccess(paymentIntent);
      }
    } catch (err) {
      console.error("Payment error:", err);
      setError("Payment failed. Please try again.");
    }

    setLoading(false);
  };

  const handleCardChange = (event) => {
    setCardComplete(event.complete);
    setError(event.error ? event.error.message : "");
  };

  return (
    <div className="stripe-payment-container">
      {!success ? (
        <form onSubmit={handleSubmit} className="stripe-payment-form">
          <div className="form-header">
            <h3>Complete Your Payment</h3>
            <div className="secure-badge">
              <span className="lock-icon">🔒</span>
              <span>Secure Payment</span>
            </div>
          </div>
          
          <div className="payment-amount">
            <span>Payment Amount:</span>
            <span className="amount-value">₹{(amount / 100).toFixed(2)}</span>
          </div>
          
          <div className="card-element-container">
            <label>Card Details</label>
            <CardElement 
              options={CARD_ELEMENT_OPTIONS} 
              onChange={handleCardChange}
              className="card-element"
            />
          </div>
          
          {error && <div className="error-message">{error}</div>}
          
          <button 
            type="submit" 
            className={`payment-button ${loading ? 'loading' : ''}`}
            disabled={!stripe || loading || !cardComplete}
          >
            {loading ? (
              <>
                <div className="spinner"></div>
                <span>Processing...</span>
              </>
            ) : (
              "Pay Now"
            )}
          </button>
          
          <div className="payment-info">
            <div className="card-icons">
              <span className="card-icon">💳</span>
              <span>We accept all major credit cards</span>
            </div>
          </div>
        </form>
      ) : (
        <div className="payment-success">
          <div className="success-icon">✓</div>
          <h3>Payment Successful!</h3>
          <p>Thank you for your payment. Your transaction has been completed.</p>
          <p className="transaction-id">Transaction ID: {Math.random().toString(36).substring(2, 10).toUpperCase()}</p>
        </div>
      )}
    </div>
  );
};

const StripePayment = ({ amount, onSuccess }) => {
  return (
    <div className="stripe-wrapper">
      <Elements stripe={stripePromise}>
        <CheckoutForm amount={amount} onSuccess={onSuccess} />
      </Elements>
    </div>
  );
};

export default StripePayment;