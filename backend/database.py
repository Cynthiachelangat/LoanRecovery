import sqlite3
import os

BASE_DIR = os.path.dirname(os.path.abspath(__file__))  
DB_PATH = os.path.join(BASE_DIR, "loan_recovery.db")  

def create_database():
    """Creates the database and the predictions table if it doesn't exist."""
    conn = sqlite3.connect(DB_PATH)
    cursor = conn.cursor()
    cursor.execute("""
        CREATE TABLE IF NOT EXISTS predictions (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            loan_amount REAL,
            interest_rate REAL,
            loan_tenure INTEGER,
            employment_type TEXT,
            monthly_income REAL,
            num_missed_payments INTEGER,
            days_past_due INTEGER,
            collateral_value REAL,
            predicted_status TEXT,
            confidence REAL
        )
    """)
    conn.commit()
    conn.close()
    print(f"Database created successfully at {DB_PATH}")

def save_prediction(data, predicted_status, confidence):
    """Saves a loan prediction to the database."""
    conn = sqlite3.connect(DB_PATH)
    cursor = conn.cursor()
    cursor.execute("""
        INSERT INTO predictions (loan_amount, interest_rate, loan_tenure, 
            employment_type, monthly_income, num_missed_payments, 
            days_past_due, collateral_value, predicted_status, confidence)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    """, (
        data["Loan_Amount"], data["Interest_Rate"], data["Loan_Tenure"], 
        data["Employment_Type"], data["Monthly_Income"], 
        data["Num_Missed_Payments"], data["Days_Past_Due"], 
        data["Collateral_Value"], predicted_status, confidence
    ))
    conn.commit()
    conn.close()
    print("Prediction saved successfully.")

if __name__ == "__main__":
    create_database()
