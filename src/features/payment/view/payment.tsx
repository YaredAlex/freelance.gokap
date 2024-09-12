import React, { useState } from "react";
import {
  Elements,
  CardElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import axios from "axios";

// Load Stripe with your publishable key
const stripePromise = loadStripe(
  "pk_test_51PZ8pIRwCvqMHLCJ34VKWJx5tfTPNswtAjYVUdkIbhav0RPJvGsiClSwOcmK5Eyu71nfOTD0epYZHeesGvmU3M9p00EyoIXNLb"
);

const Payment: React.FC = () => {
  return (
    <Elements stripe={stripePromise}>
      <PaymentForm />
    </Elements>
  );
};

export default Payment;

export const PaymentForm: React.FC = () => {
  const stripe = useStripe();
  const elements = useElements();
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsProcessing(true);

    if (!stripe || !elements) {
      setError("Stripe.js hasn't loaded yet.");
      setIsProcessing(false);
      return;
    }

    const cardElement = elements.getElement(CardElement);

    if (!cardElement) {
      setError("Card element not found.");
      setIsProcessing(false);
      return;
    }

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: cardElement,
    });

    if (error) {
      setError(error.message || "An error occurred.");
      setIsProcessing(false);
      return;
    }

    try {
      // Create a payment intent by making a request to the Django backend
      const {
        data: { clientSecret },
      } = await axios.post<{ clientSecret: string }>(
        "/create-payment-intent/",
        {
          amount: 1000, // e.g., $10.00
        }
      );

      const result = await stripe.confirmCardPayment(clientSecret, {
        payment_method: paymentMethod.id,
      });

      if (result.error) {
        setError(result.error.message || "Payment confirmation failed.");
      } else {
        if (result.paymentIntent.status === "succeeded") {
          alert("Payment successful!");
        }
      }
    } catch (err) {
      if (axios.isAxiosError(err) && err.response) {
        setError(err.response.data.error || "Payment failed.");
      } else {
        setError("An unexpected error occurred.");
      }
    } finally {
      setIsProcessing(false);
    }
  };

  const cardElementStyle = {
    base: {
      fontSize: "16px",
      color: "#424770",
      "::placeholder": {
        color: "#aab7c4",
      },
    },
    invalid: {
      color: "#9e2146",
    },
  };

  const formStyle: React.CSSProperties = {
    maxWidth: "400px",
    margin: "0 auto",
    padding: "20px",
    border: "1px solid #ddd",
    borderRadius: "4px",
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
  };

  const labelStyle: React.CSSProperties = {
    display: "block",
    marginBottom: "10px",
    fontSize: "14px",
    fontWeight: "bold",
    color: "#424770",
  };

  const cardElementContainerStyle: React.CSSProperties = {
    padding: "10px",
    border: "1px solid #ccc",
    borderRadius: "4px",
    marginBottom: "20px",
  };

  const buttonStyle: React.CSSProperties = {
    backgroundColor: "#6772e5",
    color: "#ffffff",
    padding: "10px 15px",
    fontSize: "16px",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
  };

  const errorStyle: React.CSSProperties = {
    color: "#9e2146",
    marginTop: "10px",
  };

  return (
    <form onSubmit={handleSubmit} style={formStyle}>
      <label style={labelStyle}>
        Card details
        <div style={cardElementContainerStyle}>
          <CardElement options={{ style: cardElementStyle }} />
        </div>
      </label>
      <button style={buttonStyle} disabled={isProcessing || !stripe}>
        {isProcessing ? "Processing…" : "Pay"}
      </button>
      {error && <div style={errorStyle}>{error}</div>}
    </form>
  );
};
