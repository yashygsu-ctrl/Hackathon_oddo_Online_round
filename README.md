# Hackathon_odoo_Online_round

Official repository for my Odoo Hackathon 2026 online round submission. 

## 🚀 Project Overview: TransitOps
**TransitOps** is a centralized, full-stack Smart Transport Operations Platform designed to streamline logistics infrastructure. The platform completely digitizes fleet registry records, driver availability states, trip dispatches, ongoing maintenance logging, and operating expense loops while programmatically enforcing strict business rules to prevent resource scheduling conflicts[cite: 2].

---

## 🛠️ Core Tech Stack
*   **Frontend:** React (Vite ecosystem), TypeScript, Tailwind CSS
*   **Backend:** Node.js (Express framework), TypeScript
*   **Environment Configuration:** Dotenv variables configuration

---

## ✨ System Architecture & Core Modules

### 1. Fleet Registry & Vehicle Tracking[cite: 2]
*   Maintains structured profiles including unique Registration Numbers, Model Names, Load Capacity limits, current Odometer logs, Acquisition Costs, and operational status states (`Available`, `On Trip`, `In Shop`, `Retired`)[cite: 2].

### 2. Driver Management System[cite: 2]
*   Tracks essential operator details: License IDs, expiration limits, safety compliance ratings, and assignment status states (`Available`, `On Trip`, `Off Duty`, `Suspended`)[cite: 2].

### 3. Smart Trip Dispatch Engine[cite: 2]
*   Enforces algorithmic compliance checks mapping weight thresholds against load limits and validates current operator/asset availability statuses prior to trip authorization[cite: 2].
*   Executes automated dual-state lifecycle changes between `Available` and `On Trip` across active records upon creation, cancellation, or successful trip wrap-ups[cite: 2].

### 4. Maintenance Workflow Automation[cite: 2]
*   Isolates assets requiring attention into a designated "Maintenance Log", triggering an instant status update to `In Shop` that locks and filters the vehicle from active dispatch pools until the log is resolved[cite: 2].

### 5. Expense Metrics & Analytics Dashboards[cite: 2]
*   Aggregates live fuel tracking logs and toll expenditures alongside basic maintenance investments to automatically compute complete operational costs and real-time Vehicle ROI metrics[cite: 2].

---

## 🚦 Hardcoded Business Validation Rules[cite: 2]
The backend dynamically intercepts requests to enforce the following operational guardrails:
*   **Uniqueness Enforcement:** Every registered vehicle license identifier must be distinct across the schema[cite: 2].
*   **Dispatch Filtering:** Assets marked as `Retired` or locked `In Shop` are stripped from selection pools[cite: 2].
*   **Operator Compliance:** Drivers carrying expired credentials or actively flagged as `Suspended` are blocked from route assignments[cite: 2].
*   **Capacity Guardrails:** Trips attempting to register cargo weights exceeding an asset's listed Maximum Load Capacity are rejected automatically[cite: 2].
*   **Double-Booking Prevention:** Any asset or operator actively bound to an ongoing `On Trip` lifecycle state cannot be mapped to concurrent routes[cite: 2].

---

## 📦 Workspace Layout

```text
├── backend/
│   ├── src/
│   │   ├── controllers/   # Data validation logic & rules execution[cite: 2]
│   │   ├── routes/        # Express API router definitions[cite: 2]
│   │   └── server.ts      # Core application configuration endpoint
│   ├── package.json
│   └── tsconfig.json
├── frontend/
│   ├── src/
│   │   ├── components/    # Reusable structural UI modules[cite: 2]
│   │   ├── views/         # Dashboard layout assemblies[cite: 2]
│   │   └── App.tsx        # Central view layout mount
│   ├── package.json
│   └── tailwind.config.js
└── README.md
