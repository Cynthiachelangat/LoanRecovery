import React from "react";

export default function AboutPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4">
      <h1 className="text-4xl font-bold mb-6">About Loan Recovery</h1>
      <p className="text-lg text-gray-700 max-w-2xl text-center">
        This Loan Recovery System uses machine learning to predict the recovery status of loans.
        Enter your loan details and receive a prediction along with a confidence level. Our goal is
        to optimize the loan recovery process and provide valuable insights.
      </p>
    </div>
  );
}
