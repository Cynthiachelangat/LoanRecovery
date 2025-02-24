"use client"; 

import React, { useState } from "react";
import { predictLoanRecovery } from "../../utils/api";
import { FormData, PredictionResult } from "../../types";

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
        {/* Form fields go here */}
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