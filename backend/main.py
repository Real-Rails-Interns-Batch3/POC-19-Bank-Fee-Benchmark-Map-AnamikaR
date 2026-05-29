from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()


# CORS Configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# Home Route
@app.get("/")
def home():

    return {
        "message": "Bank Fee Benchmark API Running"
    }


# Fee Data API
@app.get("/api/fees")
def get_fees():

    data = [

        {
            "bank": "SBI",
            "city": "Mumbai",
            "lat": 19.0760,
            "lng": 72.8777,
            "fee": 150,
            "regional_average": 220,
            "status": "32% below regional average"
        },

        {
            "bank": "HDFC",
            "city": "Delhi",
            "lat": 28.7041,
            "lng": 77.1025,
            "fee": 250,
            "regional_average": 220,
            "status": "13% above regional average"
        },

        {
            "bank": "ICICI",
            "city": "Bangalore",
            "lat": 12.9716,
            "lng": 77.5946,
            "fee": 210,
            "regional_average": 220,
            "status": "4% below regional average"
        },

        {
            "bank": "Axis",
            "city": "Chennai",
            "lat": 13.0827,
            "lng": 80.2707,
            "fee": 280,
            "regional_average": 220,
            "status": "27% above regional average"
        },

        {
            "bank": "PNB",
            "city": "Kolkata",
            "lat": 22.5726,
            "lng": 88.3639,
            "fee": 190,
            "regional_average": 220,
            "status": "14% below regional average"
        },

        {
            "bank": "Kotak",
            "city": "Hyderabad",
            "lat": 17.3850,
            "lng": 78.4867,
            "fee": 240,
            "regional_average": 220,
            "status": "9% above regional average"
        }

    ]

    return data