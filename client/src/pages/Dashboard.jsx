import React, { useEffect, useState } from 'react';
import Layout from '../components/Layout';
import { ChevronDown } from 'lucide-react';
import useStore from '../store/useStore';

const Dashboard = () => {
  const [typeFilter, setTypeFilter] = useState('All');
  const [statusFilter, setStatusFilter] = useState('All');
  const [regionFilter, setRegionFilter] = useState('All');
  const vehicles = useStore(state => state.vehicles);
  const drivers = useStore(state => state.drivers);
  const trips = useStore(state => state.trips);
  
  const fetchVehicles = useStore(state => state.fetchVehicles);
  const fetchDrivers = useStore(state => state.fetchDrivers);
  const fetchTrips = useStore(state => state.fetchTrips);

  useEffect(() => {
    fetchVehicles();
    fetchDrivers();
    fetchTrips();
  }, [fetchVehicles, fetchDrivers, fetchTrips]);

  const filteredVehicles = vehicles.filter(v => {
    if (typeFilter !== 'All' && v.type !== typeFilter) return false;
    if (statusFilter !== 'All' && v.status !== statusFilter) return false;
    return true;
  });

  const filteredTrips = trips.filter(t => {
    if (regionFilter !== 'All' && !t.source.includes(regionFilter) && !t.destination.includes(regionFilter)) return false;
    return true;
  });

  const activeVehicles = filteredVehicles.filter(v => v.status === 'On Trip').length;
  const availableVehicles = filteredVehicles.filter(v => v.status === 'Available').length;
  const maintVehicles = filteredVehicles.filter(v => v.status === 'In Shop').length;
  const retiredVehicles = filteredVehicles.filter(v => v.status === 'Retired').length;

  const activeTrips = filteredTrips.filter(t => t.status === 'Dispatched').length;
  const pendingTrips = filteredTrips.filter(t => t.status === 'Draft').length;
  const driversOnDuty = drivers.filter(d => d.status === 'On Trip').length;
  
  const util = filteredVehicles.length > 0 ? Math.round((activeVehicles / filteredVehicles.length) * 100) : 0;

  const kpis = [
    { label: 'ACTIVE VEHICLES', value: activeVehicles < 10 ? `0${activeVehicles}` : activeVehicles, color: '#3b82f6' },
    { label: 'AVAILABLE VEHICLES', value: availableVehicles < 10 ? `0${availableVehicles}` : availableVehicles, color: '#10b981' },
    { label: 'VEHICLES IN MAINTENANCE', value: maintVehicles < 10 ? `0${maintVehicles}` : maintVehicles, color: '#f59e0b' },
    { label: 'ACTIVE TRIPS', value: activeTrips < 10 ? `0${activeTrips}` : activeTrips, color: '#3b82f6' },
    { label: 'PENDING TRIPS', value: pendingTrips < 10 ? `0${pendingTrips}` : pendingTrips, color: '#3b82f6' },
    { label: 'DRIVERS ON DUTY', value: driversOnDuty < 10 ? `0${driversOnDuty}` : driversOnDuty, color: '#3b82f6' },
    { label: 'FLEET UTILIZATION', value: `${util}%`, color: '#10b981' }
  ];

  const recentTrips = filteredTrips.slice(0, 5).map(t => ({
    trip: t.tripId,
    vehicle: t.vehicle?.model || '--',
    driver: t.driver?.name || '--',
    status: t.status,
    eta: t.status === 'Completed' ? '--' : t.status === 'Draft' ? 'Awaiting Dispatch' : t.timeInfo || '1h 10m',
    color: t.status === 'Completed' ? '#65a30d' : t.status === 'Dispatched' ? '#3b82f6' : t.status === 'Draft' ? '#4b5563' : '#f87171',
    text: t.status === 'Draft' ? '#d1d5db' : '#fff'
  }));

  const calcPct = (val) => filteredVehicles.length > 0 ? Math.round((val / filteredVehicles.length) * 100) : 0;
  const vehicleStatus = [
    { label: 'Available', percent: `${calcPct(availableVehicles)}%`, color: '#10b981' },
    { label: 'On Trip', percent: `${calcPct(activeVehicles)}%`, color: '#60a5fa' },
    { label: 'In Shop', percent: `${calcPct(maintVehicles)}%`, color: '#d97706' },
    { label: 'Retired', percent: `${calcPct(retiredVehicles)}%`, color: '#f87171' },
  ];

  return (
    <Layout>
      {/* Filters */}
      <div className="mb-8">
        <h3 className="text-xs text-gray-500 uppercase tracking-widest mb-2">Filters</h3>
        <div className="flex gap-4">
          <div className="relative w-48">
            <select value={typeFilter} onChange={e => setTypeFilter(e.target.value)} className="w-full px-3 py-1.5 bg-transparent border border-[#444] rounded text-sm text-gray-300 appearance-none focus:outline-none focus:border-primary">
              <option className="bg-[#111]" value="All">Vehicle Type: All</option>
              <option className="bg-[#111]" value="Van">Van</option>
              <option className="bg-[#111]" value="Truck">Truck</option>
              <option className="bg-[#111]" value="Mini">Mini</option>
            </select>
            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none" />
          </div>
          <div className="relative w-48">
            <select value={statusFilter} onChange={e => setStatusFilter(e.target.value)} className="w-full px-3 py-1.5 bg-transparent border border-[#444] rounded text-sm text-gray-300 appearance-none focus:outline-none focus:border-primary">
              <option className="bg-[#111]" value="All">Status: All</option>
              <option className="bg-[#111]" value="Available">Available</option>
              <option className="bg-[#111]" value="On Trip">On Trip</option>
              <option className="bg-[#111]" value="In Shop">In Shop</option>
            </select>
            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none" />
          </div>
          <div className="relative w-48">
            <select value={regionFilter} onChange={e => setRegionFilter(e.target.value)} className="w-full px-3 py-1.5 bg-transparent border border-[#444] rounded text-sm text-gray-300 appearance-none focus:outline-none focus:border-primary">
              <option className="bg-[#111]" value="All">Region: All</option>
              <option className="bg-[#111]" value="Gandhinagar">Gandhinagar</option>
              <option className="bg-[#111]" value="Ahmedabad">Ahmedabad</option>
              <option className="bg-[#111]" value="Vatva">Vatva</option>
            </select>
            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none" />
          </div>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="flex flex-wrap gap-4 mb-12">
        {kpis.map((kpi, idx) => (
          <div key={idx} className="bg-transparent border border-[#444] p-4 w-40" style={{ borderLeft: `4px solid ${kpi.color}` }}>
            <p className="text-[10px] text-gray-500 uppercase tracking-wider mb-2">{kpi.label}</p>
            <h3 className="text-2xl text-gray-200">{kpi.value}</h3>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Recent Trips Table */}
        <div className="lg:col-span-2">
          <h3 className="text-sm text-gray-400 uppercase tracking-widest mb-4">Recent Trips</h3>
          <table className="w-full text-left text-sm text-gray-300">
            <thead>
              <tr className="border-b border-[#333]">
                <th className="pb-2 font-normal text-gray-500">TRIP</th>
                <th className="pb-2 font-normal text-gray-500">VEHICLE</th>
                <th className="pb-2 font-normal text-gray-500">DRIVER</th>
                <th className="pb-2 font-normal text-gray-500">STATUS</th>
                <th className="pb-2 font-normal text-gray-500">ETA</th>
              </tr>
            </thead>
            <tbody>
              {recentTrips.map((row, idx) => (
                <tr key={idx} className="border-b border-[#222]">
                  <td className="py-4">{row.trip}</td>
                  <td className="py-4">{row.vehicle}</td>
                  <td className="py-4">{row.driver}</td>
                  <td className="py-4">
                    <span 
                      className="px-3 py-1 rounded" 
                      style={{ backgroundColor: row.color, color: row.text }}
                    >
                      {row.status}
                    </span>
                  </td>
                  <td className="py-4 text-gray-400">{row.eta}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Vehicle Status */}
        <div>
          <h3 className="text-sm text-gray-400 uppercase tracking-widest mb-4">Vehicle Status</h3>
          <div className="space-y-6">
            {vehicleStatus.map((status, idx) => (
              <div key={idx} className="flex items-center gap-4">
                <span className="w-20 text-sm text-gray-400">{status.label}</span>
                <div className="flex-1 h-3 bg-[#222] rounded overflow-hidden">
                  <div className="h-full" style={{ width: status.percent, backgroundColor: status.color }}></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;
