import axios from "axios";
import { FormData, PredictionResult } from "../types";

const API_URL = "http://localhost:5000"; // Replace with your backend URL

export const predictLoanRecovery = async (data: FormData): Promise<PredictionResult> => {
  try {
    const response = await axios.post<PredictionResult>(`${API_URL}/predict`, data);
    return response.data;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
};