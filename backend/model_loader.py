import joblib
import os

def load_model():
    try:
        BASE_DIR = os.path.dirname(os.path.abspath(__file__))
        MODEL_PATH = os.path.join(BASE_DIR, "model", "loan_recovery_model.pkl")
        model = joblib.load(MODEL_PATH)
        return model
    except Exception as e:
        raise Exception(f"Error loading model: {e}")
