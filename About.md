#file that illustrates the abouts of our Transit Ops

TransitOps is a centralized, end-to-end platform for managing the complete lifecycle of transport operations — from vehicle and driver management to trip dispatching, maintenance, fuel tracking, and analytics. It replaces spreadsheets and manual logbooks with a digital system that enforces business rules and gives operators real-time visibility into their fleet.

TransitOps solves this by digitizing vehicle, driver, dispatch, maintenance, and expense management in one place — with automatic status transitions and validation rules that prevent human error.

Core Features

🔐 Authentication
Secure login with email and password
Role-Based Access Control (RBAC)
Only authenticated users can access the application
We have to use the following login credentials:-

Fleet Managers (Access to Fleet, Maintenance, Settings):
michael@transitops.com
sarah@transitops.com
david@transitops.com
Dispatchers (Access to Dashboard, Trips, Settings):
emily@transitops.com
james@transitops.com
priya@transitops.com
Safety Officers (Access to Drivers, Compliance, Settings):
robert@transitops.com
aisha@transitops.com
thomas@transitops.com
Financial Analysts (Access to Fuel & Expenses, Analytics, Settings):
jessica@transitops.com
marcus@transitops.com
elena@transitops.com



📊 Dashboard
KPIs: Active Vehicles, Available Vehicles, Vehicles in Maintenance, Active Trips, Pending Trips, Drivers On Duty, Fleet Utilization (%)
Filters by vehicle type, status, and region



🚛 Vehicle Registry
Master list of vehicles with Registration Number (unique), Vehicle Name/Model, Type, Maximum Load Capacity, Odometer, Acquisition Cost, and Status
Status values: Available, On Trip, In Shop, Retired



🧑‍✈️ Driver Management
Driver profiles: Name, License Number, License Category, License Expiry Date, Contact Number, Safety Score, Status
Status values: Available, On Trip, Off Duty, Suspended



🗺️ Trip Management
Create trips by selecting source, destination, available vehicle, available driver, cargo weight, and planned distance
Trip lifecycle: Draft → Dispatched → Completed → Cancelled


Maintenance
Create maintenance records for vehicles
Adding a vehicle to a maintenance log automatically switches its status to In Shop, removing it from the driver's selection pool



⛽ Fuel & Expense Management
Record fuel logs (liters, cost, date) and other expenses (tolls, maintenance, etc.)
Automatically compute total operational cost (Fuel + Maintenance) per vehicle



📈 Reports & Analytics
Fuel Efficiency (Distance / Fuel)
Fleet Utilization
Operational Cost


The platform enforces the following rules automatically:
Vehicle registration numbers must be unique
Retired or In Shop vehicles never appear in the dispatch selection pool
Drivers with expired licenses or Suspended status cannot be assigned to trips
A driver or vehicle already On Trip cannot be assigned to another trip
Cargo weight must not exceed the vehicle's maximum load capacity
Dispatching a trip automatically sets both vehicle and driver status to On Trip
Completing a trip automatically resets both vehicle and driver status to Available
Cancelling a dispatched trip restores the vehicle and driver to Available
Creating an active maintenance record automatically sets vehicle status to In Shop
Closing a maintenance record restores the vehicle to Available (unless retired)

Master list of vehicles with Registration Number (unique), Vehicle Name/Model, Type, Maximum Load Capacity, Odometer, Acquisition Cost, and Status

