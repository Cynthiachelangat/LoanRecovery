from flask import Flask, request, jsonify
from flask_cors import CORS
import numpy as np
import pandas as pd
from model_loader import load_model
from database import create_database, save_prediction

app = Flask(__name__)
CORS(app)


model = load_model()


create_database()

features = ['Loan_Amount', 'Interest_Rate', 'Loan_Tenure', 'Employment_Type', 
            'Monthly_Income', 'Num_Missed_Payments', 'Days_Past_Due', 'Collateral_Value']

def preprocess_input(data):
    try:
        df = pd.DataFrame([data])
        df['Employment_Type'] = df['Employment_Type'].map({"Salaried": 0, "self-Employment": 1, "Business Owner":2})
        df = df.fillna(0)
        return df
    except Exception as e:
        return str(e)

@app.route('/predict', methods=['POST'])
def predict():
    try:
        data = request.get_json()

        missing_fields = [field for field in features if field not in data]
        if missing_fields:
            return jsonify({"error": f"Missing fields: {missing_fields}"}), 400
        
        input_data = preprocess_input(data)
        if isinstance(input_data, str):
            return jsonify({"error": input_data}), 400

        prediction = model.predict(input_data)
        prediction_proba = model.predict_proba(input_data)

        status_mapping = {0: "Fully Recovered", 1: "Partially Recovered", 2: "Written Off"}
        predicted_status = status_mapping[prediction[0]]
        confidence = np.max(prediction_proba[0])

       
        save_prediction(data, predicted_status, round(float(confidence), 2))

        return jsonify({
            "loan_recovery_status": predicted_status,
            "confidence": round(float(confidence), 2)
        })
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)
