import React from "react";
import StripeCheckout from "react-stripe-checkout";
import axios from "axios";

const Stripe = () => {
  const onToken = token => {
    // Stripe token is generated automatically and passed as props to this function
    const body = JSON.stringify(token);
    // We make an call to an endpoint on our server and send the token
    axios
      .post("/api/stripe/payment", body)
      .then(response => {
        console.log(response);
        alert("Payment Success");
      })
      .catch(error => {
        console.log("Payment Error: ", error);
        alert("Payment Error");
      });
  };
  return (
    <StripeCheckout
      label="Go Premium" //Original button
      name="Team Communicator"
      description="Premium Account"
      panelLabel="Go Premium" //Submit button
      amount={999} //Amount in cents $9.99
      billingAddress={false} //Turn on to collect address *recommended(false for testing)
      allowRememberMe={false}
      token={onToken}
      stripeKey="pk_test_ZU3mlTy0q00DATc9EyF9A8jX"
    />
  );
};

export default Stripe;
