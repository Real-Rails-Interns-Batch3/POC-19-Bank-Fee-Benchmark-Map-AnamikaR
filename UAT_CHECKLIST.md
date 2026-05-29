# User Acceptance Testing (UAT) Checklist

**Project Title:** [BANK-01] Bank Fee Benchmark Map
**Execution Date:** May 29, 2026
**QA Lead:** **Anamika R

---

## 🛰️ 1. Core Data Transmission Pipeline

* [ ] **FastAPI Response Validation:** Verify `/api/fees` returns valid JSON with HTTP 200 status.

* [ ] **Frontend API Integration:** Confirm frontend successfully fetches backend data without console errors.

* [ ] **Dynamic Data Synchronization:** Verify changes in backend data appear automatically on dashboard refresh.

---

## 🗺️ 2. Interactive Visualization Layer

* [ ] **Map Rendering:** Confirm map loads correctly with dark theme tiles.

* [ ] **Marker Placement Accuracy:** Verify markers appear in correct geographical positions based on latitude and longitude.

* [ ] **Marker Interaction:** Confirm clicking markers opens bank information popup.

---

## 🎛️ 3. User Interface Inputs & Filters

* [ ] **Bank Filter Functionality:** Verify selecting a bank updates map markers instantly without full page refresh.

* [ ] **Chart Synchronization:** Confirm analytics chart updates dynamically when filters change.

* [ ] **Sidebar Data Synchronization:** Verify sidebar cards update according to selected filters.

---

## 🎯 4. Data Correctness & Business Logic

* [ ] **Regional Average Validation:** Verify displayed regional average matches filtered bank data.

* [ ] **Fee Comparison Accuracy:** Confirm displayed fee values match backend dataset.

* [ ] **Variance Display Accuracy:** Verify bank status indicators correctly represent above/below benchmark values.

---

## 💾 5. Secondary Action Systems

* [ ] **Download Functionality:** Confirm clicking "Download Sample Data" successfully downloads filtered dataset.

* [ ] **Export Validation:** Verify downloaded file contents match visible dashboard data.

---

## 🖥️ 6. Final Dashboard Validation

* [ ] **Layout Validation:** Confirm map occupies approximately 70% width and sidebar occupies approximately 30%.

* [ ] **Theme Validation:** Verify background uses dark fintech styling consistently.

* [ ] **Console Error Check:** Confirm no browser console errors during normal interaction.

* [ ] **End-to-End Workflow:** Verify backend + frontend + filters + charts + map operate together successfully.

---

##
