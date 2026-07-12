import React, { useEffect, useState } from 'react';
import Layout from '../components/Layout';
import { Plus, X } from 'lucide-react';
import useStore from '../store/useStore';

const Drivers = () => {
  const drivers = useStore(state => state.drivers);
  const fetchDrivers = useStore(state => state.fetchDrivers);
  const addDriver = useStore(state => state.addDriver);
  const deleteDriver = useStore(state => state.deleteDriver);

  const [showAddForm, setShowAddForm] = useState(false);
  const [formData, setFormData] = useState({
    name: '', license: '', category: 'Heavy', expiry: '', contact: ''
  });

  const user = useStore(state => state.user) || { role: 'Fleet Manager' };
  const canEdit = user.role === 'Fleet Manager' || user.role === 'Safety Officer';

  const handleAdd = async (e) => {
    e.preventDefault();
    if(!formData.name || !formData.license) return alert('Name and License required');
    await addDriver({
      name: formData.name,
      license: formData.license,
      category: formData.category,
      expiry: formData.expiry,
      contact: formData.contact,
      compl: '0',
      safety: 'Available',
      status: 'Available'
    });
    setShowAddForm(false);
    setFormData({ name: '', license: '', category: 'Heavy', expiry: '', contact: '' });
  };

  useEffect(() => {
    fetchDrivers();
  }, [fetchDrivers]);
  const toggleStats = [
    { label: 'Available', color: '#10b981', text: '#fff' },
    { label: 'On Trip', color: '#60a5fa', text: '#1e3a8a' },
    { label: 'Off Duty', color: '#6b7280', text: '#fff' },
    { label: 'Suspended', color: '#f97316', text: '#fff' },
  ];

  return (
    <Layout>
      <div className="flex justify-end mb-8">
        <div className="flex gap-4">
          {canEdit && (
            <button 
              onClick={() => setShowAddForm(!showAddForm)}
              className="flex items-center gap-2 px-6 py-2 bg-[#a36109] hover:bg-[#8a5207] text-white rounded text-sm font-medium transition-colors"
            >
              {showAddForm ? <X size={16} /> : <Plus size={16} />}
              {showAddForm ? 'Cancel' : 'Add Driver'}
            </button>
          )}
        </div>
      </div>

      {showAddForm && canEdit && (
        <form onSubmit={handleAdd} className="bg-background-light p-6 rounded border border-[#333] mb-8 grid grid-cols-2 md:grid-cols-6 gap-4 items-end">
          <div className="col-span-2 md:col-span-1">
            <label className="text-[10px] text-gray-500 uppercase tracking-widest block mb-1">NAME</label>
            <input required type="text" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="w-full px-3 py-2 bg-transparent border border-[#444] rounded text-sm text-gray-300 focus:border-primary" />
          </div>
          <div className="col-span-2 md:col-span-1">
            <label className="text-[10px] text-gray-500 uppercase tracking-widest block mb-1">LICENSE NO.</label>
            <input required type="text" value={formData.license} onChange={e => setFormData({...formData, license: e.target.value})} className="w-full px-3 py-2 bg-transparent border border-[#444] rounded text-sm text-gray-300 focus:border-primary" />
          </div>
          <div className="col-span-2 md:col-span-1">
            <label className="text-[10px] text-gray-500 uppercase tracking-widest block mb-1">CATEGORY</label>
            <select required value={formData.category} onChange={e => setFormData({...formData, category: e.target.value})} className="w-full px-3 py-2 bg-background-dark border border-[#444] rounded text-sm text-gray-300 focus:border-primary">
              <option>Heavy</option>
              <option>Medium</option>
              <option>Light</option>
            </select>
          </div>
          <div className="col-span-2 md:col-span-1">
            <label className="text-[10px] text-gray-500 uppercase tracking-widest block mb-1">EXPIRY (YEAR)</label>
            <input required type="number" min="2020" max="2100" value={formData.expiry} onChange={e => setFormData({...formData, expiry: e.target.value})} placeholder="e.g. 2028" className="w-full px-3 py-2 bg-transparent border border-[#444] rounded text-sm text-gray-300 focus:border-primary" />
          </div>
          <div className="col-span-2 md:col-span-1">
            <label className="text-[10px] text-gray-500 uppercase tracking-widest block mb-1">CONTACT</label>
            <input required type="tel" value={formData.contact} onChange={e => setFormData({...formData, contact: e.target.value})} className="w-full px-3 py-2 bg-transparent border border-[#444] rounded text-sm text-gray-300 focus:border-primary" />
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
            <th className="pb-3 font-normal text-gray-500 uppercase tracking-widest text-xs">DRIVER</th>
            <th className="pb-3 font-normal text-gray-500 uppercase tracking-widest text-xs">LICENSE NO.</th>
            <th className="pb-3 font-normal text-gray-500 uppercase tracking-widest text-xs">CATEGORY</th>
            <th className="pb-3 font-normal text-gray-500 uppercase tracking-widest text-xs">EXPIRY</th>
            <th className="pb-3 font-normal text-gray-500 uppercase tracking-widest text-xs">CONTACT</th>
            <th className="pb-3 font-normal text-gray-500 uppercase tracking-widest text-xs">TRIP COMPL.</th>
            <th className="pb-3 font-normal text-gray-500 uppercase tracking-widest text-xs">SAFETY</th>
            <th className="pb-3 font-normal text-gray-500 uppercase tracking-widest text-xs">STATUS</th>
            <th className="pb-3 font-normal text-gray-500 uppercase tracking-widest text-xs">ACTIONS</th>
          </tr>
        </thead>
        <tbody>
          {drivers.map((row, idx) => (
            <tr key={idx} className="border-b border-[#222]">
              <td className="py-4">{row.name}</td>
              <td className="py-4">{row.license}</td>
              <td className="py-4">{row.category}</td>
              <td className="py-4">{row.expiry}</td>
              <td className="py-4">{row.contact}</td>
              <td className="py-4">{row.compl}</td>
              <td className="py-4">
                <span 
                  className="px-3 py-1 rounded text-white" 
                  style={{ 
                    backgroundColor: 
                      row.safety === 'Available' ? '#10b981' : 
                      row.safety === 'On Trip' ? '#3b82f6' : '#f97316' 
                  }}
                >
                  {row.safety}
                </span>
              </td>
              <td className="py-4">
                <span 
                  className="px-3 py-1 rounded text-white" 
                  style={{ 
                    backgroundColor: 
                      row.status === 'Available' ? '#10b981' : 
                      row.status === 'On Trip' ? '#3b82f6' : 
                      row.status === 'Suspended' ? '#f97316' : '#6b7280' 
                  }}
                >
                  {row.status}
                </span>
              </td>
              <td className="py-4 text-gray-400">
                {canEdit ? (
                  <button onClick={() => deleteDriver(row._id)} className="text-red-400 hover:text-red-300 text-xs font-bold uppercase">
                    Delete
                  </button>
                ) : (
                  '--'
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="mt-8">
        <p className="text-xs text-gray-500 uppercase tracking-widest mb-3">TOGGLE STAT</p>
        <div className="flex gap-4">
          {toggleStats.map((stat, idx) => (
            <button 
              key={idx}
              className="px-6 py-1.5 rounded text-sm transition-opacity hover:opacity-80 border border-transparent"
              style={{ backgroundColor: stat.color, color: stat.text }}
            >
              {stat.label}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-6">
        <p className="text-xs text-[#d97706]">Rule: Expired license or Suspended status &rarr; blocked from trip assignment</p>
      </div>
    </Layout>
  );
};

export default Drivers;
