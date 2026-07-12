# TransitOps Enterprise Fleet & Logistics Console 🚛
An enterprise-grade, role-based Headless Transit & Fleet Management system built for high-performance logistics tracking and real-time operational analytics.

---

## 🏗️ Architecture & Technologies Used

TransitOps is built using a modern **Decoupled (Headless) Architecture** to ensure fast load times, modular scalability, and strict security boundaries.

### 1. Frontend Client Layer
* **Language:** JavaScript (ES6+), HTML5, CSS3
* **Framework:** React.js (v18+) bundled with **Vite** for optimized assets hot-reloading.
* **Styling (CSS):** Custom **Tailwind CSS** implementation utilizing a premium, high-contrast dark theme.
  * *Base background:* Midnight-Black (`bg-[#09090b]`)
  * *Card surfaces:* Deep Charcoal Grey (`bg-[#141414]`)
  * *Action elements:* Amber-Orange Gradient (`from-amber-600 to-amber-500`)
* **Libraries:**
  * `lucide-react`: For iconography (trucks, indicators, shields, alerts).
  * Native CSS & SVG: For responsive, animated vertical bar graphs (Monthly Revenue) and leaderboard meters.

### 2. Backend Database & Relational Layer
* **Language:** Python (v3.10+)
* **Structure:** Designed to mirror native Odoo framework models. Relational mapping defines schemas for:
  * `transit.vehicle`: Vehicle registration, capacity, odometer, and status.
  * `transit.driver`: Operator details, license categories, expiry dates, safety scores, and status.
  * `transit.trip`: Logistic dispatches linking vehicles, drivers, cargo weights, planned distances, and pipeline status.
  * `transit.maintenance` & `transit.expense`: Operational logs tracking maintenance isolating, tolls, and fuel consumption metrics.

### 3. API Communication Layer
* **Language:** JavaScript
* **Protocol:** JSON-RPC / REST endpoints. Abstractions in `src/api/transitApi.js` map React client mutations to the Odoo backend database routes asynchronously.

---

## 👥 Role-Based Access Control (RBAC) Directory

The platform secures operational features based on signed-in credentials. All accounts share the same default password:

🔐 **Password for all users:** `password123`

| Role | Username / Email | Allowed Navigation Views |
| :--- | :--- | :--- |
| **Fleet Managers** | `michael@transitops.com`<br>`sarah@transitops.com`<br>`david@transitops.com` | Vehicle Registry, Maintenance Logs, System Settings |
| **Dispatchers** | `emily@transitops.com`<br>`james@transitops.com`<br>`priya@transitops.com` | Live Dispatch Board, Trip Creator, System Settings |
| **Safety Officers** | `robert@transitops.com`<br>`aisha@transitops.com`<br>`thomas@transitops.com` | Driver Profiles, License Compliance Alerts, System Settings |
| **Financial Analysts** | `jessica@transitops.com`<br>`marcus@transitops.com`<br>`elena@transitops.com` | Fuel & Expense Ledger, Telemetry Analytics, System Settings |

---

## 🗺️ Navigational Pathways per Role

Here is how each user role traverses the website and interacts with specific features:

### 1. Fleet Manager Pathway
> **Goal:** Register vehicles, manage physical assets, and log maintenance events.

* **Step 1: Authenticate**
  * Log in using `michael@transitops.com` / `password123`.
* **Step 2: Vehicle Registry Dashboard**
  * View the list of all fleet vehicles. 
  * Click **"+ Register Vehicle"** in the top right to open the form. Register a new truck by entering a *Unique Reg Number*, *Vehicle Model*, *Max Load Capacity (kg)*, *Odometer (km)*, and *Acquisition Cost ($)*.
  * Highlight any vehicle to view its specifications and document vault.
  * Identify *Predictive Alerts* (vehicles with odometers exceeding 90,000 km showing the `⚠️ Service Due` tag).
* **Step 3: Maintenance View**
  * Switch to the **Maintenance** tab via the sidebar.
  * Under **"Log Service Record"**, select a vehicle (e.g. `Truck-01`) and select a service action (e.g. *Brake Pad replacement*), enter the estimated cost, and click **"Log Maintenance"**.
  * The vehicle's database status automatically toggles to `In Shop`, preventing dispatchers from assigning it to new trips.
  * View the historical service log on the right grid, and click **"Complete"** when servicing is finished to return the asset to `Available`.

---

### 2. Dispatcher Pathway
> **Goal:** Plan, dispatch, and track live cargo deliveries.

* **Step 1: Authenticate**
  * Log in using `emily@transitops.com` / `password123`.
* **Step 2: Trip Creator**
  * Switch to the **Trips** tab via the sidebar.
  * Fill out the **"Create Trip"** form: enter the *Source*, *Destination*, and select an *Available Vehicle* and *Available Driver* from the dropdowns. Enter the *Cargo Weight (kg)* and *Distance (km)*.
  * Review live pre-flight warning banners (e.g., if cargo weight exceeds maximum vehicle payload, it blocks dispatch).
  * Click the orange **"Dispatch Trip"** button. This mutates the trip status to `Dispatched` and automatically flags the assigned vehicle and driver status as `On Trip` in the database.
* **Step 3: Live Board Tracking**
  * View the active cards in the **"Live Board"** column on the right.
  * Monitor real-time progress, route info, assigned operator, and the dynamically calculated ETA.
  * Once the cargo arrives at the destination, click the green **"Complete"** button to log fuel consumed and final odometer readings, returning the driver and vehicle status to `Available`.

---

### 3. Safety Officer Pathway
> **Goal:** Manage driver rosters, verify compliance records, and enforce safety scores.

* **Step 1: Authenticate**
  * Log in using `robert@transitops.com` / `password123`.
* **Step 2: Driver Management Registry**
  * View all operators, their license numbers, category classification (e.g., *Class A Commercial*), and contact details.
  * Click **"+ Add Driver"** to insert a new profile into the roster.
  * Filter operators by status (*Available*, *On Trip*, *Off Duty*, *Suspended*) to check roster allocation.
* **Step 3: Compliance & Alerts**
  * Monitor the **"Driver License Compliance Alerts"** card in the right column.
  * Any driver with an expired license date triggers an active warning badge (e.g., *Expired 58 days ago*).
  * Click the **"Remind"** button next to their name to log an automated compliance warning notification.
  * The system will block dispatchers from assigning expired or suspended driver profiles to new dispatches.

---

### 4. Financial Analyst Pathway
> **Goal:** Monitor overhead costs, audit fuel logs, calculate margins, and export reports.

* **Step 1: Authenticate**
  * Log in using `jessica@transitops.com` / `password123`.
* **Step 2: Fuel & Expenses Ledger**
  * Navigate to the **Fuel & Expenses** view.
  * View active lists for *Fuel Logs* and *Tolls/Misc Expenses*.
  * Audits aggregated operational overhead totals calculated dynamically from the ledger records.
* **Step 3: Telemetry & Analytics Dashboard**
  * View **"Fleet Telemetry & Operational Analytics"** to inspect:
    * *Utilization Rate (81%)*, *Global Fuel Efficiency (8.4 km/L)*, *Overhead Costs*, and *Fleet ROI %*.
    * *Monthly Revenue Distributions* vertical bar chart (sapphire blue bars with hover-amber highlights and exact value tooltips).
    * *Top Costliest Assets Leaderboard* horizontal progress rows.
    * *Asset Profitability & Capital Efficiency Matrix* table. Margin rows show green (`text-emerald-400`) for profitable routes and amber (`text-amber-500`) for high-depreciation profiles.
* **Step 4: Report Generation**
  * Click **"CSV Export"** in the upper right. The browser automatically downloads a file named `TransitOps_Fleet_Analytics_Report.csv` with structured headers: `Vehicle, Capital_Cost, Logistics_Revenue, Fuel_Consumed, Maintenance_Ratio, Net_Margin`.
