"use client";

import React from "react";
import LoanForm from "../components/LoanForm";

export default function HomePage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4 space-y-6">
      <h1 className="text-4xl font-bold">Welcome to Loan Recovery Optimization</h1>
      <LoanForm />
    </div>
  );
}
