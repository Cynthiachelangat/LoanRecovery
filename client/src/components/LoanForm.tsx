"use client";

import React, { useState } from "react";
import { predictLoanRecovery } from "../utils/api";
import { FormData, PredictionResult } from "../types";

const LoanForm: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    Loan_Amount: "",
    Interest_Rate: "",
    Loan_Tenure: "",
    Employment_Type: "",
    Monthly_Income: "",
    Num_Missed_Payments: "",
    Days_Past_Due: "",
    Collateral_Value: "",
  });
  const [result, setResult] = useState<PredictionResult | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await predictLoanRecovery(formData);
      setResult(response);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="p-4">
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="number"
          name="Loan_Amount"
          placeholder="Loan Amount"
          value={formData.Loan_Amount}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
        <input
          type="number"
          name="Interest_Rate"
          placeholder="Interest Rate"
          value={formData.Interest_Rate}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
        <input
          type="number"
          name="Loan_Tenure"
          placeholder="Loan Tenure"
          value={formData.Loan_Tenure}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
        <select
          name="Employment_Type"
          value={formData.Employment_Type}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        >
          <option value="">Select Employment Type</option>
          <option value="Salaried">Salaried</option>
          <option value="Self-Employment">Self-Employment</option>
          <option value="Business Owner">Business Owner</option>
        </select>
        <input
          type="number"
          name="Monthly_Income"
          placeholder="Monthly Income"
          value={formData.Monthly_Income}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
        <input
          type="number"
          name="Num_Missed_Payments"
          placeholder="Number of Missed Payments"
          value={formData.Num_Missed_Payments}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
        <input
          type="number"
          name="Days_Past_Due"
          placeholder="Days Past Due"
          value={formData.Days_Past_Due}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
        <input
          type="number"
          name="Collateral_Value"
          placeholder="Collateral Value"
          value={formData.Collateral_Value}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
        <button
          type="submit"
          className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
        >
          Predict
        </button>
      </form>
      {result && (
        <div className="mt-4 p-4 bg-green-100 border-l-4 border-green-500 text-green-700">
          <p>Loan Recovery Status: {result.loan_recovery_status}</p>
          <p>Confidence: {result.confidence}</p>
        </div>
      )}
    </div>
  );
};

export default LoanForm;
