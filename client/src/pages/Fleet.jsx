import React, { useEffect, useState } from 'react';
import Layout from '../components/Layout';
import { ChevronDown, Plus, X } from 'lucide-react';
import useStore from '../store/useStore';

const Fleet = () => {
  const vehicles = useStore(state => state.vehicles);
  const fetchVehicles = useStore(state => state.fetchVehicles);
  const addVehicle = useStore(state => state.addVehicle);
  const deleteVehicle = useStore(state => state.deleteVehicle);

  const [showAddForm, setShowAddForm] = useState(false);
  const [formData, setFormData] = useState({
    regNo: '', model: '', type: 'Heavy', capacity: '', cost: ''
  });
  
  const user = useStore(state => state.user) || { role: 'Fleet Manager' };
  const canEdit = user.role === 'Fleet Manager';

  const handleAdd = async (e) => {
    e.preventDefault();
    if(!formData.regNo || !formData.model) return alert('Reg No and Model required');
    await addVehicle({
      regNo: formData.regNo,
      model: formData.model,
      type: formData.type,
      capacity: formData.capacity,
      odometer: '0',
      cost: formData.cost,
      status: 'Available'
    });
    setShowAddForm(false);
    setFormData({ regNo: '', model: '', type: 'Heavy', capacity: '', cost: '' });
  };

  useEffect(() => {
    fetchVehicles();
  }, [fetchVehicles]);

  return (
    <Layout>
      <div className="flex justify-between items-center mb-8">
        <div className="flex gap-4">
          <div className="relative w-40">
            <select className="w-full px-3 py-2 bg-transparent border border-[#444] rounded text-sm text-gray-300 appearance-none focus:outline-none focus:border-primary">
              <option>Type: All</option>
            </select>
            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none" />
          </div>
          <div className="relative w-40">
            <select className="w-full px-3 py-2 bg-transparent border border-[#444] rounded text-sm text-gray-300 appearance-none focus:outline-none focus:border-primary">
              <option>Status: All</option>
            </select>
            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none" />
          </div>
          <div className="w-48">
            <input 
              type="text" 
              placeholder="Search reg. no..." 
              className="w-full px-3 py-2 bg-transparent border border-[#444] rounded text-sm text-gray-300 focus:outline-none focus:border-primary placeholder:text-gray-600"
            />
          </div>
        </div>
        
        <div className="flex gap-4">
          {canEdit && (
            <button 
              onClick={() => setShowAddForm(!showAddForm)}
              className="px-4 py-2 bg-[#a36109] hover:bg-[#8a5207] text-white text-sm font-medium rounded transition-colors flex items-center gap-2"
            >
              {showAddForm ? <X size={16} /> : <Plus size={16} />}
              {showAddForm ? 'Cancel' : 'Add Vehicle'}
            </button>
          )}
        </div>
      </div>

      {showAddForm && canEdit && (
        <form onSubmit={handleAdd} className="bg-background-light p-6 rounded border border-[#333] mb-8 grid grid-cols-2 md:grid-cols-6 gap-4 items-end">
          <div className="col-span-2 md:col-span-1">
            <label className="text-[10px] text-gray-500 uppercase tracking-widest block mb-1">REG NO.</label>
            <input required type="text" value={formData.regNo} onChange={e => setFormData({...formData, regNo: e.target.value})} className="w-full px-3 py-2 bg-transparent border border-[#444] rounded text-sm text-gray-300 focus:border-primary" />
          </div>
          <div className="col-span-2 md:col-span-1">
            <label className="text-[10px] text-gray-500 uppercase tracking-widest block mb-1">MODEL</label>
            <input required type="text" value={formData.model} onChange={e => setFormData({...formData, model: e.target.value})} className="w-full px-3 py-2 bg-transparent border border-[#444] rounded text-sm text-gray-300 focus:border-primary" />
          </div>
          <div className="col-span-2 md:col-span-1">
            <label className="text-[10px] text-gray-500 uppercase tracking-widest block mb-1">TYPE</label>
            <select required value={formData.type} onChange={e => setFormData({...formData, type: e.target.value})} className="w-full px-3 py-2 bg-background-dark border border-[#444] rounded text-sm text-gray-300 focus:border-primary">
              <option>Heavy</option>
              <option>Medium</option>
              <option>Light</option>
            </select>
          </div>
          <div className="col-span-2 md:col-span-1">
            <label className="text-[10px] text-gray-500 uppercase tracking-widest block mb-1">CAPACITY (KG)</label>
            <input required type="number" min="0" value={formData.capacity} onChange={e => setFormData({...formData, capacity: e.target.value})} placeholder="e.g. 2000" className="w-full px-3 py-2 bg-transparent border border-[#444] rounded text-sm text-gray-300 focus:border-primary" />
          </div>
          <div className="col-span-2 md:col-span-1">
            <label className="text-[10px] text-gray-500 uppercase tracking-widest block mb-1">COST</label>
            <input required type="number" min="0" value={formData.cost} onChange={e => setFormData({...formData, cost: e.target.value})} className="w-full px-3 py-2 bg-transparent border border-[#444] rounded text-sm text-gray-300 focus:border-primary" />
          </div>
          <div className="col-span-2 md:col-span-1">
            <button type="submit" className="w-full py-2 bg-[#10b981] hover:bg-[#059669] text-white rounded text-sm font-medium transition-colors">
              Save
            </button>
          </div>
        </form>
      )}

      <table className="w-full text-left text-sm text-gray-300">
        <thead>
          <tr className="border-b border-[#333]">
            <th className="pb-3 font-normal text-gray-500 uppercase tracking-widest text-xs">REG. NO. (UNIQUE)</th>
            <th className="pb-3 font-normal text-gray-500 uppercase tracking-widest text-xs">NAME/MODE</th>
            <th className="pb-3 font-normal text-gray-500 uppercase tracking-widest text-xs">TYPE</th>
            <th className="pb-3 font-normal text-gray-500 uppercase tracking-widest text-xs">CAPACITY</th>
            <th className="pb-3 font-normal text-gray-500 uppercase tracking-widest text-xs">ODOMETER</th>
            <th className="pb-3 font-normal text-gray-500 uppercase tracking-widest text-xs">ACQ. COST</th>
            <th className="pb-3 font-normal text-gray-500 uppercase tracking-widest text-xs">STATUS</th>
            <th className="pb-3 font-normal text-gray-500 uppercase tracking-widest text-xs">ACTIONS</th>
          </tr>
        </thead>
        <tbody>
          {vehicles.map((row, idx) => (
            <tr key={idx} className="border-b border-[#222]">
              <td className="py-4">{row.regNo}</td>
              <td className="py-4">{row.model}</td>
              <td className="py-4">{row.type}</td>
              <td className="py-4">{row.capacity}</td>
              <td className="py-4">{row.odometer}</td>
              <td className="py-4">{row.cost}</td>
              <td className="py-4">
                <span 
                  className="px-3 py-1 rounded text-white" 
                  style={{ 
                    backgroundColor: 
                      row.status === 'Available' ? '#10b981' : 
                      row.status === 'On Trip' ? '#3b82f6' : 
                      row.status === 'In Shop' ? '#d97706' : '#f87171' 
                  }}
                >
                  {row.status}
                </span>
              </td>
              <td className="py-4 text-gray-400">
                {canEdit ? (
                  <button onClick={() => deleteVehicle(row._id)} className="text-red-400 hover:text-red-300 text-xs font-bold uppercase">Delete</button>
                ) : (
                  '--'
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="mt-4">
        <p className="text-xs text-[#d97706]">Rule: Registration No. must be unique - Retired/In Shop vehicles are hidden from Trip Dispatcher</p>
      </div>
    </Layout>
  );
};

export default Fleet;
