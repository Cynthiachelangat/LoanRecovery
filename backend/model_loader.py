import joblib

def load_model():
    try:
        model = joblib.load("backend/model/loan_recovery_model.pkl")
        return model

    except Exception as e:
        raise Exception(f"Error loading model: {e}")