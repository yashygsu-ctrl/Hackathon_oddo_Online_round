import React, { useEffect } from 'react';
import Layout from '../components/Layout';
import useStore from '../store/useStore';

const Analytics = () => {
  const expenses = useStore(state => state.expenses);
  const maintenance = useStore(state => state.maintenance);
  const trips = useStore(state => state.trips);
  const vehicles = useStore(state => state.vehicles);
  const fetchExpenses = useStore(state => state.fetchExpenses);
  const fetchMaintenance = useStore(state => state.fetchMaintenance);
  const fetchTrips = useStore(state => state.fetchTrips);
  const fetchVehicles = useStore(state => state.fetchVehicles);

  useEffect(() => {
    fetchExpenses();
    fetchMaintenance();
    fetchTrips();
    fetchVehicles();
  }, [fetchExpenses, fetchMaintenance, fetchTrips, fetchVehicles]);

  // Calculate Operational Cost
  let totalCost = 0;
  expenses.forEach(e => {
    if (e.fuelCost && !isNaN(e.fuelCost)) totalCost += Number(e.fuelCost);
    if (e.toll && !isNaN(e.toll)) totalCost += Number(e.toll);
    if (e.other && !isNaN(e.other)) totalCost += Number(e.other);
  });
  maintenance.forEach(m => {
    if (m.cost && !isNaN(m.cost)) totalCost += Number(m.cost);
  });

  // Calculate Fleet Utilization
  const activeVehicles = vehicles.filter(v => v.status === 'On Trip').length;
  const utilization = vehicles.length > 0 ? Math.round((activeVehicles / vehicles.length) * 100) : 0;

  // Calculate Revenue (Mock: 100 INR per km of completed trips)
  let totalRevenue = 0;
  trips.forEach(t => {
    if (t.status === 'Completed' && t.distance && !isNaN(t.distance)) {
      totalRevenue += Number(t.distance) * 100;
    }
  });

  const roi = totalCost > 0 ? Math.max(0, ((totalRevenue - totalCost) / totalCost) * 100).toFixed(1) : 0;

  const kpis = [
    { label: 'FUEL EFFICIENCY', value: '8.4 km/l', color: '#3b82f6' }, // Hard to calculate without trip fuel mapping, keep static
    { label: 'FLEET UTILIZATION', value: `${utilization}%`, color: '#10b981' },
    { label: 'OPERATIONAL COST', value: totalCost.toLocaleString(), color: '#d97706' },
    { label: 'VEHICLE ROI', value: `${roi}%`, color: '#10b981' }
  ];

  const barChartData = [
    { height: `${Math.min(100, Math.max(10, (trips.length * 10)))}%` },
    { height: '55%' },
    { height: '50%' },
    { height: '70%' },
    { height: '65%' },
    { height: '80%' },
    { height: '75%' },
  ];

  // Calculate Top Costliest Vehicles
  const vehicleCosts = {};
  expenses.forEach(e => {
    if (e.vehicle && e.vehicle._id) {
      if (!vehicleCosts[e.vehicle.model]) vehicleCosts[e.vehicle.model] = 0;
      if (e.fuelCost && !isNaN(e.fuelCost)) vehicleCosts[e.vehicle.model] += Number(e.fuelCost);
      if (e.toll && !isNaN(e.toll)) vehicleCosts[e.vehicle.model] += Number(e.toll);
      if (e.other && !isNaN(e.other)) vehicleCosts[e.vehicle.model] += Number(e.other);
    }
  });
  maintenance.forEach(m => {
    if (m.vehicle && m.vehicle._id) {
      if (!vehicleCosts[m.vehicle.model]) vehicleCosts[m.vehicle.model] = 0;
      if (m.cost && !isNaN(m.cost)) vehicleCosts[m.vehicle.model] += Number(m.cost);
    }
  });

  const sortedVehicles = Object.entries(vehicleCosts).sort((a, b) => b[1] - a[1]).slice(0, 3);
  const maxCost = sortedVehicles.length > 0 ? sortedVehicles[0][1] : 1;
  const colors = ['#f87171', '#d97706', '#60a5fa'];

  const costliestVehicles = sortedVehicles.map((v, idx) => ({
    name: v[0],
    percent: `${Math.round((v[1] / maxCost) * 100)}%`,
    color: colors[idx]
  }));

  return (
    <Layout>
      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-2">
        {kpis.map((kpi, idx) => (
          <div key={idx} className="bg-transparent border border-[#444] p-4" style={{ borderLeft: `4px solid ${kpi.color}` }}>
            <p className="text-[10px] text-gray-500 uppercase tracking-wider mb-2">{kpi.label}</p>
            <h3 className="text-2xl text-gray-200">{kpi.value}</h3>
          </div>
        ))}
      </div>
      
      <p className="text-xs text-gray-500 mb-12">ROI = (Revenue - (Maintenance + Fuel)) / Acquisition Cost</p>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
        {/* Monthly Revenue Bar Chart */}
        <div>
          <h3 className="text-xs text-gray-500 uppercase tracking-widest mb-6">MONTHLY REVENUE</h3>
          <div className="h-48 flex items-end gap-1 border-b border-[#333]">
            {barChartData.map((bar, idx) => (
              <div 
                key={idx} 
                className="flex-1 bg-[#60a5fa] border border-[#1e3a8a]"
                style={{ height: bar.height }}
              ></div>
            ))}
          </div>
        </div>

        {/* Top Costliest Vehicles */}
        <div>
          <h3 className="text-xs text-gray-500 uppercase tracking-widest mb-6">TOP COSTLIEST VEHICLES</h3>
          <div className="space-y-6">
            {costliestVehicles.map((vehicle, idx) => (
              <div key={idx} className="flex items-center gap-4">
                <span className="w-24 text-gray-400 uppercase tracking-widest text-xs">{vehicle.name}</span>
                <div className="flex-1 h-3 bg-[#222] rounded overflow-hidden">
                  <div className="h-full" style={{ width: vehicle.percent, backgroundColor: vehicle.color }}></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Analytics;
