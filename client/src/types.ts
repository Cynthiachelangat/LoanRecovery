export interface FormData {
    Loan_Amount: string;
    Interest_Rate: string;
    Loan_Tenure: string;
    Employment_Type: string;
    Monthly_Income: string;
    Num_Missed_Payments: string;
    Days_Past_Due: string;
    Collateral_Value: string;
  }
  
  export interface PredictionResult {
    loan_recovery_status: string;
    confidence: number;
  }