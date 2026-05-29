# Validation, Assumptions & Risk (VAR) Report

**Project Title:** [BANK-01] Bank Fee Benchmark Map
**Report Date:** May 29, 2026
**Prepared By:** Anamika R

---

# 1. Validation Summary

## Backend Validation

* FastAPI backend successfully initializes and exposes REST endpoints.
* `/api/fees` endpoint returns structured JSON responses correctly.
* Cross-Origin Resource Sharing (CORS) configuration allows frontend communication.

## Frontend Validation

* Next.js frontend successfully consumes backend APIs.
* Interactive dashboard renders without blocking issues.
* Dynamic filtering updates visualizations without page refresh.

## Visualization Validation

* Interactive map successfully renders geographical bank locations.
* Marker interactions display fee benchmark information correctly.
* Analytics charts correctly reflect filtered banking datasets.

---

# 2. Project Assumptions

## Data Assumptions

* Banking fee data used during development represents benchmark sample values.
* Latitude and longitude coordinates accurately represent city locations.
* Regional averages are calculated using currently available datasets.

## Infrastructure Assumptions

* Backend server remains accessible during normal dashboard operation.
* Browser environments support modern JavaScript features required by Next.js.
* Internet connectivity exists for map tile loading.

---

# 3. Risk Assessment

| Risk                        | Impact                            | Mitigation                        |
| --------------------------- | --------------------------------- | --------------------------------- |
| Backend service unavailable | Dashboard data unavailable        | Introduce mock fallback datasets  |
| Small dataset size          | Reduced analytical accuracy       | Expand benchmark dataset coverage |
| Large dataset rendering     | Reduced visualization performance | Filtering and incremental loading |
| Third-party map tile issues | Reduced map functionality         | Support alternate tile providers  |

---

# 4. Technical Constraints

* Dashboard currently uses benchmark sample data rather than live banking APIs.
* Geographic visualization depends on external tile services.
* Real-time fee updates are not implemented in current scope.

---

# 5. Final Assessment

The Bank Fee Benchmark dashboard successfully demonstrates:

* Interactive financial infrastructure visualization
* Geographic benchmarking capability
* Dynamic filtering and analytics
* End-to-end backend/frontend integration

Overall project status:

**Status: VALIDATED FOR DEMONSTRATION AND SUBMISSION**
