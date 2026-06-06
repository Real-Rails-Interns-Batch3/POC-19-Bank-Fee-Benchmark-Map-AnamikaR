from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import requests

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

API_KEY="bdcdc7fce22125c7ce73a9e6"

@app.get("/")

def home():

    return {
        "message":"Bank Fee Benchmark API Running"
    }


@app.get("/api/fees")
def get_fees():
    try:
        response = requests.get(
            f"https://v6.exchangerate-api.com/v6/{API_KEY}/latest/USD",
            timeout=5.0
        )
        if response.status_code == 200:
            data = response.json()
            if data.get("result") == "success":
                rates = data["conversion_rates"]
                sbi_fee = round(rates.get("INR", 83.0) * 1.8, 2)
                hdfc_fee = round(rates.get("EUR", 0.9) * 240.0, 2)
                icici_fee = round(rates.get("GBP", 0.8) * 260.0, 2)
                
                return [
                    {
                        "bank": "SBI",
                        "city": "Mumbai",
                        "fee_type": "Transfer",
                        "lat": 19.0760,
                        "lng": 72.8777,
                        "fee": sbi_fee,
                        "regional_average": 220.0,
                        "status": f"{round(((220 - sbi_fee) / 220) * 100, 1)}% below regional average" if sbi_fee < 220 else f"{round(((sbi_fee - 220) / 220) * 100, 1)}% above regional average"
                    },
                    {
                        "bank": "HDFC",
                        "city": "Delhi",
                        "fee_type": "Wire",
                        "lat": 28.7041,
                        "lng": 77.1025,
                        "fee": hdfc_fee,
                        "regional_average": 220.0,
                        "status": f"{round(((220 - hdfc_fee) / 220) * 100, 1)}% below regional average" if hdfc_fee < 220 else f"{round(((hdfc_fee - 220) / 220) * 100, 1)}% above regional average"
                    },
                    {
                        "bank": "ICICI",
                        "city": "Bangalore",
                        "fee_type": "ATM",
                        "lat": 12.9716,
                        "lng": 77.5946,
                        "fee": icici_fee,
                        "regional_average": 220.0,
                        "status": f"{round(((220 - icici_fee) / 220) * 100, 1)}% below regional average" if icici_fee < 220 else f"{round(((icici_fee - 220) / 220) * 100, 1)}% above regional average"
                    },
                    {
                        "bank": "Axis",
                        "city": "Chennai",
                        "fee_type": "Transfer",
                        "lat": 13.0827,
                        "lng": 80.2707,
                        "fee": 280.0,
                        "regional_average": 220.0,
                        "status": "27.3% above regional average"
                    },
                    {
                        "bank": "PNB",
                        "city": "Kolkata",
                        "fee_type": "ATM",
                        "lat": 22.5726,
                        "lng": 88.3639,
                        "fee": 190.0,
                        "regional_average": 220.0,
                        "status": "13.6% below regional average"
                    },
                    {
                        "bank": "Kotak",
                        "city": "Hyderabad",
                        "fee_type": "Wire",
                        "lat": 17.3850,
                        "lng": 78.4867,
                        "fee": 240.0,
                        "regional_average": 220.0,
                        "status": "9.1% above regional average"
                    }
                ]
    except Exception as e:
        print(f"Error fetching live rates: {e}")
        
    return [
        {
            "bank": "SBI",
            "city": "Mumbai",
            "fee_type": "Transfer",
            "lat": 19.0760,
            "lng": 72.8777,
            "fee": 150.0,
            "regional_average": 220.0,
            "status": "31.8% below regional average"
        },
        {
            "bank": "HDFC",
            "city": "Delhi",
            "fee_type": "Wire",
            "lat": 28.7041,
            "lng": 77.1025,
            "fee": 250.0,
            "regional_average": 220.0,
            "status": "13.6% above regional average"
        },
        {
            "bank": "ICICI",
            "city": "Bangalore",
            "fee_type": "ATM",
            "lat": 12.9716,
            "lng": 77.5946,
            "fee": 210.0,
            "regional_average": 220.0,
            "status": "4.5% below regional average"
        },
        {
            "bank": "Axis",
            "city": "Chennai",
            "fee_type": "Transfer",
            "lat": 13.0827,
            "lng": 80.2707,
            "fee": 280.0,
            "regional_average": 220.0,
            "status": "27.3% above regional average"
        },
        {
            "bank": "PNB",
            "city": "Kolkata",
            "fee_type": "ATM",
            "lat": 22.5726,
            "lng": 88.3639,
            "fee": 190.0,
            "regional_average": 220.0,
            "status": "13.6% below regional average"
        },
        {
            "bank": "Kotak",
            "city": "Hyderabad",
            "fee_type": "Wire",
            "lat": 17.3850,
            "lng": 78.4867,
            "fee": 240.0,
            "regional_average": 220.0,
            "status": "9.1% above regional average"
        }
    ]