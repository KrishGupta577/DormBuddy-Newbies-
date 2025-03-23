import React, { useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements, PaymentElement, useStripe, useElements } from "@stripe/react-stripe-js";
import "./stripeGateway.css"; // Import the CSS file

const stripePromise = loadStripe("pk_test_51R5TNCR6XzBxnHc8Bcijq7jeySKZ1wiynXdmfwvu5g4x8d08a1pFToCdaB4ihaNaCf87zyBFggrFrIgN0TFokyS500rR2gDhRG");

const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const [errorMessage, setErrorMessage] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!stripe || !elements) return;

    setIsProcessing(true);
    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: "https://example.com/success",
      },
    });

    if (error) {
      setErrorMessage(error.message);
    } else {
      alert("Payment Successful (Demo Mode)");
    }
    setIsProcessing(false);
  };

  return (
    <form onSubmit={handleSubmit} className="checkout-form">
      <h2 className="checkout-title">Checkout</h2>

      <div className="payment-element-container">
        <PaymentElement />
      </div>

      {errorMessage && <p className="error-message">{errorMessage}</p>}

      <button
        type="submit"
        disabled={!stripe || !elements || isProcessing}
        className="pay-button"
      >
        {isProcessing ? (
          <span className="processing-indicator">
            <svg className="spinner" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="spinner-circle" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="spinner-path" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Processing...
          </span>
        ) : (
          "Pay Now"
        )}
      </button>
    </form>
  );
};

const StripeGateway = () => {
  const options = {
    mode: "payment",
    amount: 1099, // $10.99
    currency: "usd",
  };

  return (
    <div className="stripe-gateway-container">
      <div className="payment-header">
        <h1 className="payment-heading">Complete Your Purchase</h1>
        <p className="payment-subheading">Secure payment powered by Stripe</p>
        <div className="payment-total">
          <span className="total-badge">Total: $10.99</span>
        </div>
      </div>
      
      <Elements stripe={stripePromise} options={options}>
        <CheckoutForm />
      </Elements>
      
      <div className="payment-footer">
        <div className="security-badge">
          <span className="lock-icon">🔒</span> Secure Checkout
        </div>
      </div>
    </div>
  );
};

export default StripeGateway;