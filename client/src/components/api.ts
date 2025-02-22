export const predictLoanRecovery = async (loanData: Record<string, any>) => {
    try {
      const response = await fetch("http://127.0.0.1:5000/api/predict", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(loanData)
      });
      return await response.json();
    } catch (error) {
      console.error("API Error:", error);
      return { error: "Request failed" };
    }
  };
  