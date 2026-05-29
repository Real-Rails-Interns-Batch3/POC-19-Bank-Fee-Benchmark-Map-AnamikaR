# Bank Fee Benchmark Map

## Project Overview

The Bank Fee Benchmark Map is a fintech intelligence dashboard designed to visualize and compare banking fee structures geographically. The system combines interactive mapping, analytics, and filtering mechanisms to provide infrastructure-level insights into banking fee distributions across regions.

---

# Objectives

* Visualize banking fee benchmarks geographically
* Compare transfer fee structures between institutions
* Provide infrastructure-level financial insights
* Demonstrate full-stack financial dashboard architecture

---

# Features

## Backend Features

* FastAPI REST API architecture
* Structured JSON data delivery
* Cross-Origin Resource Sharing (CORS) support
* Benchmark dataset API endpoints

## Frontend Features

* Next.js App Router architecture
* Interactive geographical visualization using Leaflet
* Real-time filtering without page refresh
* Dynamic analytics dashboard
* Downloadable benchmark datasets

## Dashboard Features

* Interactive map visualization
* Banking fee comparison charts
* Dynamic regional averages
* Bank filtering system
* Infrastructure intelligence sidebar

---

# Technology Stack

## Frontend

* Next.js
* TypeScript
* Tailwind CSS
* Leaflet
* React Leaflet
* Recharts
* Axios

## Backend

* FastAPI
* Python
* Uvicorn

---

# Project Structure

```text
bank-fee-benchmark/

├── backend/
│   └── main.py

├── frontend/
│   ├── src/
│   │   ├── app/
│   │   └── components/
│   │
│   └── package.json

├── screenshots/

├── README.md

├── VAR_REPORT.md

└── UAT_CHECKLIST.md
```

---

# Installation Guide

## Backend Setup

```bash
cd backend

python -m venv venv

venv\Scripts\activate

pip install fastapi uvicorn

uvicorn main:app --reload
```

Backend runs at:

```text
http://127.0.0.1:8000
```

---

## Frontend Setup

```bash
cd frontend

npm install

npm run dev
```

Frontend runs at:

```text
http://localhost:3000
```

---

# API Endpoints

## Home Endpoint

```text
GET /
```

Returns API status.

## Fee Dataset Endpoint

```text
GET /api/fees
```

Returns banking benchmark dataset.

---

# Dashboard Workflow

1. Backend serves fee benchmark data
2. Frontend requests data using Axios
3. Dashboard renders markers dynamically
4. Filters update charts and maps instantly
5. Users download filtered benchmark datasets

---

# Future Improvements

* Live banking API integration
* Region-based filtering
* Heatmap visualizations
* GeoJSON support
* Advanced benchmarking analytics

---

# Final Deliverables

* Production Source Code
* Validation Report
* UAT Documentation
* Dashboard Screenshot
* Repository Documentation

---

# Author

**Anamika R**

BTech Student — Computer Science Engineering
