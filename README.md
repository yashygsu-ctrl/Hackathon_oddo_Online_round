# TransitOps 🚛
An enterprise-grade, full-stack Headless Fleet & Transit Management system featuring a highly responsive React/Tailwind CSS frontend communicating with a custom Python Odoo backend module engine.

---

## 🏗️ Architecture Overview
TransitOps is engineered using a **Decoupled (Headless) Architecture** built to isolate front-facing presentation layers from background processing components:
* **Frontend UI Desk:** Built with React.js, Vite, and Tailwind CSS, presenting a premium, interactive dark-mode telemetry application.
* **Backend Module Engine:** Built using custom Python object structures matching native Odoo framework models.
* **Database Ledger Layer:** Backed by an active PostgreSQL framework managing relational operations seamlessly.

---

## 👥 Targeted Enterprise Roles & Access Control
The system natively implements granular logic blocks satisfying four designated role workflows:
1. **Fleet Manager:** Full administrative CRUD access over all vehicle registry files and team dispatches.
2. **Driver:** Restricted, focused views to see assigned logistics pipelines and update trip lifecycles.
3. **Safety Officer:** Direct tracking authority over driver categories, safety score metrics, and license compliance states.
4. **Financial Analyst:** Read-only analytical tracking over fuel expenses, maintenance service logs, and capital yield margins.

---

## 🚀 Key Features & Validation Constraints
* **Interactive Mission Control Pipeline:** A multi-stage visual tracking board (`Draft` -> `Dispatched` -> `Completed` -> `Cancelled`) to monitor active transport lines.
* **Automated Workflow Rules:** Backend validations that prevent overloaded cargo profiles, block drivers with expired licenses, and automatically isolate vehicles under servicing into an `In Shop` state.
* **Dynamic Executive Analytics:** Real-time computations tracking aggregate system overhead, global fuel efficiency scales ($km/L$), and asset Return on Investment (ROI) formulas.
* **Professional Export to CSV Engine:** A clean, data-oriented export utility that compiles active tables into standard spreadsheet-ready `.csv` reports on demand.

---

## 📂 Project Directory Structure

```text
Hackathon_oddo_Online_round/
├── client/                     # React/Vite Frontend Application
│   ├── src/
│   │   ├── api/
│   │   │   └── transitApi.js   # Asynchronous backend connection routing layer
│   │   ├── components/
│   │   │   ├── Analytics.jsx   # Telemetry, live SVG charts, and CSV exporting
│   │   │   ├── Dashboard.jsx   # Micro-cards and operational summaries
│   │   │   ├── FleetDesk.jsx   # Interactive vehicle registry data tables
│   │   │   └── TripsDesk.jsx   # Drag-and-drop style mission control pipeline
│   │   ├── data/
│   │   │   └── mockData.js     # Fallback local data arrays for sandboxed testing
│   │   ├── App.jsx             # Main router shell and sidebar frame navigation
│   │   ├── index.css           # Global custom styles and dark-mode parameters
│   │   └── main.jsx
│   ├── package.json
│   └── tailwind.config.js      # Premium black-and-amber theme parameters
│
├── server/                     # Custom Python Odoo Framework Backend
│   └── transit_ops/            # Custom Odoo Module Core
│       ├── models/
│       │   ├── __init__.py
│       │   ├── vehicle.py      # transit.vehicle data schemas
│       │   ├── driver.py       # transit.driver data schemas
│       │   └── trip.py         # transit.trip workflow engine & validations
│       ├── security/
│       │   └── ir.model.access.csv  # Role-Based Access Control list (RBAC)
│       ├── __init__.py
│       └── __manifest__.py     # Module manifest descriptor
│
└── README.md                   # Core Architecture, Roles & Development Roadmap
