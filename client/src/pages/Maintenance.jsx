import React, { useEffect, useState } from 'react';
import Layout from '../components/Layout';
import { ArrowRight, X, Plus } from 'lucide-react';
import useStore from '../store/useStore';

const Maintenance = () => {
  const maintenance = useStore(state => state.maintenance);
  const vehicles = useStore(state => state.vehicles);
  const fetchMaintenance = useStore(state => state.fetchMaintenance);
  const fetchVehicles = useStore(state => state.fetchVehicles);
  const addMaintenanceLog = useStore(state => state.addMaintenanceLog);
  const deleteMaintenanceLog = useStore(state => state.deleteMaintenanceLog);

  const [showAddForm, setShowAddForm] = useState(false);

  const user = useStore(state => state.user) || { role: 'Fleet Manager' };
  const canEdit = user.role === 'Fleet Manager';

  const [formData, setFormData] = useState({
    vehicle: '',
    service: 'Oil Change',
    cost: '2500',
    date: new Date().toISOString().split('T')[0]
  });

  useEffect(() => {
    fetchMaintenance();
    fetchVehicles();
  }, [fetchMaintenance, fetchVehicles]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.vehicle) return alert("Select vehicle");
    
    await addMaintenanceLog({
      vehicle: formData.vehicle,
      service: formData.service,
      cost: formData.cost,
      date: formData.date
    });
    setFormData({ ...formData, vehicle: '' });
    setShowAddForm(false);
  };

  return (
    <Layout>
      <div className="flex justify-between items-end mb-8">
        <div>
          <h2 className="text-2xl text-gray-200 mb-1">Maintenance Log</h2>
          <p className="text-gray-400 text-sm">Track vehicle service history</p>
        </div>
        
        <div className="flex gap-4">
          {canEdit && (
            <button 
              onClick={() => setShowAddForm(!showAddForm)}
              className="flex items-center gap-2 px-6 py-2 bg-[#a36109] hover:bg-[#8a5207] text-white rounded text-sm font-medium transition-colors"
            >
              {showAddForm ? <X size={16} /> : <Plus size={16} />}
              {showAddForm ? 'Cancel' : 'Log Maintenance'}
            </button>
          )}
        </div>
      </div>

      {showAddForm && canEdit && (
        <form onSubmit={handleSubmit} className="bg-background-light p-6 rounded border border-[#333] mb-8 grid grid-cols-2 md:grid-cols-5 gap-4 items-end">
          <div className="col-span-2 md:col-span-1">
            <label className="text-[10px] text-gray-500 uppercase tracking-widest block mb-1">VEHICLE</label>
            <select required value={formData.vehicle} onChange={(e) => setFormData({...formData, vehicle: e.target.value})} className="w-full px-3 py-2 bg-background-dark border border-[#444] rounded text-sm text-gray-300 focus:outline-none focus:border-primary">
              <option value="">Select a vehicle...</option>
              {vehicles.map(v => (
                <option key={v._id} value={v._id}>{v.model} ({v.regNo})</option>
              ))}
            </select>
          </div>
          <div className="col-span-2 md:col-span-1">
            <label className="text-[10px] text-gray-500 uppercase tracking-widest block mb-1">SERVICE TYPE</label>
            <input required type="text" value={formData.service} onChange={(e) => setFormData({...formData, service: e.target.value})} className="w-full px-3 py-2 bg-transparent border border-[#444] rounded text-sm text-gray-300 focus:outline-none focus:border-primary" />
          </div>
          <div className="col-span-2 md:col-span-1">
            <label className="text-[10px] text-gray-500 uppercase tracking-widest block mb-1">COST</label>
            <input required type="number" min="0" value={formData.cost} onChange={(e) => setFormData({...formData, cost: e.target.value})} className="w-full px-3 py-2 bg-transparent border border-[#444] rounded text-sm text-gray-300 focus:outline-none focus:border-primary" />
          </div>
          <div className="col-span-2 md:col-span-1">
            <label className="text-[10px] text-gray-500 uppercase tracking-widest block mb-1">DATE</label>
            <input required type="date" value={formData.date} onChange={(e) => setFormData({...formData, date: e.target.value})} className="w-full px-3 py-2 bg-transparent border border-[#444] rounded text-sm text-gray-300 focus:outline-none focus:border-primary" />
          </div>
          <div className="col-span-2 md:col-span-1">
            <button type="submit" className="w-full py-2 bg-[#a36109] hover:bg-[#8a5207] text-white rounded text-sm font-medium transition-colors mt-2">
              Save Log
            </button>
          </div>
        </form>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* Left Column - State transitions */}
        <div className="max-w-md">
          <h3 className="text-xs text-gray-500 uppercase tracking-widest mb-4">LIFECYCLE</h3>
          <div className="space-y-8 text-sm">
            <div className="flex items-center justify-between">
              <span className="text-[#10b981] w-20 text-center">Available</span>
              <div className="flex-1 flex flex-col items-center justify-center relative">
                <span className="text-[10px] text-gray-500 mb-1 absolute -top-4">Creating active record</span>
                <div className="w-full h-px bg-gray-500 relative">
                  <ArrowRight className="absolute -right-1 top-1/2 -translate-y-1/2 text-gray-500 w-4 h-4" />
                </div>
              </div>
              <span className="text-[#d97706] w-20 text-center">In Shop</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-[#d97706] w-20 text-center">In Shop</span>
              <div className="flex-1 flex flex-col items-center justify-center relative">
                <span className="text-[10px] text-gray-500 mb-1 absolute -top-4">Closing record (not retired)</span>
                <div className="w-full h-px bg-gray-500 relative">
                  <ArrowRight className="absolute -right-1 top-1/2 -translate-y-1/2 text-gray-500 w-4 h-4" />
                </div>
              </div>
              <span className="text-[#10b981] w-20 text-center">Available</span>
            </div>
          </div>
          <p className="text-xs text-[#d97706] mt-8">Note: In Shop vehicles are removed from the dispatch pool.</p>
        </div>

        {/* Right Column - Table */}
        <div>
          <h3 className="text-xs text-gray-500 uppercase tracking-widest mb-4">SERVICE LOG</h3>
          <table className="w-full text-left text-sm text-gray-300">
            <thead>
              <tr className="border-b border-[#333]">
                <th className="pb-3 font-normal text-gray-500 uppercase tracking-widest text-xs">VEHICLE</th>
                <th className="pb-3 font-normal text-gray-500 uppercase tracking-widest text-xs">SERVICE</th>
                <th className="pb-3 font-normal text-gray-500 uppercase tracking-widest text-xs">COST</th>
                <th className="pb-3 font-normal text-gray-500 uppercase tracking-widest text-xs">STATUS</th>
                <th className="pb-3 font-normal text-gray-500 uppercase tracking-widest text-xs">ACTIONS</th>
              </tr>
            </thead>
            <tbody>
              {maintenance.map((row, idx) => (
                <tr key={idx} className="border-b border-[#222]">
                  <td className="py-4">{row.vehicle?.model || 'Unknown'}</td>
                  <td className="py-4">{row.service}</td>
                  <td className="py-4">{row.cost}</td>
                  <td className="py-4">
                    <span 
                      className="px-3 py-1 rounded text-white" 
                      style={{ 
                        backgroundColor: 
                          row.status === 'Completed' ? '#65a30d' : 
                          row.status === 'Active' ? '#3b82f6' : '#d97706' 
                      }}
                    >
                      {row.status}
                    </span>
                  </td>
                  <td className="py-4 text-gray-400">
                    {canEdit ? (
                      <button onClick={() => deleteMaintenanceLog(row._id)} className="text-red-400 hover:text-red-300 text-xs font-bold uppercase">Delete</button>
                    ) : (
                      '--'
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </Layout>
  );
};

export default Maintenance;
