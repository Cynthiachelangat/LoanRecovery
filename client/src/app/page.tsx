"use client";

import React, { useState } from "react";
import { predictLoanRecovery } from "../components/api";

export default function HomePage() {
  const [data, setData] = useState("");
  const [predictionResult, setPredictionResult] = useState<{
    loan_recovery_status: string;
    confidence: number;
  } | null>(null);

  // Test GET endpoint
  const fetchData = async () => {
    try {
      const response = await fetch("http://127.0.0.1:5000/api/data");
      const result = await response.json();
      setData(result.message);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  // Send POST request to /api/predict with sample loan data
  const sendPrediction = async () => {
    const loanData = {
      Loan_Amount: "8000", // Try changing this value to test different predictions
      Interest_Rate: "5.5",
      Loan_Tenure: "36",
      Employment_Type: "Salaried",
      Monthly_Income: "3000",
      Num_Missed_Payments: "0",
      Days_Past_Due: "0",
      Collateral_Value: "5000"
    };
    try {
      const response = await fetch("http://127.0.0.1:5000/api/predict", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(loanData)
      });
      const result = await response.json();
      setPredictionResult(result);
    } catch (error) {
      console.error("Error sending prediction request:", error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4 space-y-6">
      <h1 className="text-4xl font-bold">Welcome to Loan Recovery Optimization</h1>
      <div className="flex flex-col space-y-4">
        <button 
          onClick={fetchData} 
          className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
        >
          Test GET from Backend
        </button>
        {data && <p className="text-lg">{data}</p>}
      </div>
      <div className="flex flex-col space-y-4">
        <button 
          onClick={sendPrediction} 
          className="px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600"
        >
          Send Prediction Request
        </button>
        {predictionResult && (
          <div className="p-4 bg-gray-100 rounded-md">
            <p className="font-semibold">
              Prediction: {predictionResult.loan_recovery_status}
            </p>
            <p>
              Confidence: {(predictionResult.confidence * 100).toFixed(2)}%
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
