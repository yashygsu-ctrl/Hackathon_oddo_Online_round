import React, { useState } from 'react';
import Layout from '../components/Layout';
import useStore from '../store/useStore';

const Settings = () => {
  const settings = useStore(state => state.settings);
  const updateSettings = useStore(state => state.updateSettings);
  
  const [formData, setFormData] = useState(settings);
  const [saved, setSaved] = useState(false);

  const handleSave = (e) => {
    e.preventDefault();
    updateSettings(formData);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const rbacMatrix = [
    { role: 'Fleet Manager', fleet: '✓', drivers: '✓', trips: '--', fuel: '--', analytics: '✓' },
    { role: 'Dispatcher', fleet: 'view', drivers: '--', trips: '✓', fuel: '--', analytics: '--' },
    { role: 'Safety Officer', fleet: '--', drivers: '✓', trips: 'view', fuel: '--', analytics: '--' },
    { role: 'Financial Analyst', fleet: 'view', drivers: '--', trips: '--', fuel: '✓', analytics: '✓' },
  ];

  return (
    <Layout>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
        {/* Left Column - General Settings */}
        <div className="max-w-md">
          <h3 className="text-xs text-gray-500 uppercase tracking-widest mb-6">GENERAL</h3>
          <form className="space-y-4" onSubmit={handleSave}>
            <div>
              <label className="text-[10px] text-gray-500 uppercase tracking-widest block mb-1">DEPOT NAME</label>
              <input type="text" value={formData.depotName} onChange={e => setFormData({...formData, depotName: e.target.value})} className="w-full px-3 py-2 bg-transparent border border-[#444] rounded text-sm text-gray-300 focus:outline-none focus:border-primary" />
            </div>
            <div>
              <label className="text-[10px] text-gray-500 uppercase tracking-widest block mb-1">CURRENCY</label>
              <input type="text" value={formData.currency} onChange={e => setFormData({...formData, currency: e.target.value})} className="w-full px-3 py-2 bg-transparent border border-[#444] rounded text-sm text-gray-300 focus:outline-none focus:border-primary" />
            </div>
            <div>
              <label className="text-[10px] text-gray-500 uppercase tracking-widest block mb-1">DISTANCE UNIT</label>
              <input type="text" value={formData.distanceUnit} onChange={e => setFormData({...formData, distanceUnit: e.target.value})} className="w-full px-3 py-2 bg-transparent border border-[#444] rounded text-sm text-gray-300 focus:outline-none focus:border-primary" />
            </div>

            <div className="pt-2 flex items-center gap-4">
              <button type="submit" className="px-6 py-2 bg-[#60a5fa] hover:bg-[#3b82f6] text-[#000] font-medium rounded text-sm transition-colors">
                Save changes
              </button>
              {saved && <span className="text-xs text-[#10b981]">Settings saved!</span>}
            </div>
          </form>
        </div>

        {/* Right Column - RBAC Matrix */}
        <div>
          <h3 className="text-xs text-gray-500 uppercase tracking-widest mb-6">ROLE-BASED ACCESS (RBAC)</h3>
          <table className="w-full text-left text-sm text-gray-300">
            <thead>
              <tr className="border-b border-[#333]">
                <th className="pb-3 font-normal text-gray-500 uppercase tracking-widest text-[10px]">ROLE</th>
                <th className="pb-3 font-normal text-gray-500 uppercase tracking-widest text-[10px]">FLEET</th>
                <th className="pb-3 font-normal text-gray-500 uppercase tracking-widest text-[10px]">DRIVERS</th>
                <th className="pb-3 font-normal text-gray-500 uppercase tracking-widest text-[10px]">TRIPS</th>
                <th className="pb-3 font-normal text-gray-500 uppercase tracking-widest text-[10px]">FUEL/EXP.</th>
                <th className="pb-3 font-normal text-gray-500 uppercase tracking-widest text-[10px]">ANALYTICS</th>
              </tr>
            </thead>
            <tbody>
              {rbacMatrix.map((row, idx) => (
                <tr key={idx} className="border-b border-[#222]">
                  <td className="py-4">{row.role}</td>
                  <td className="py-4">{row.fleet}</td>
                  <td className="py-4">{row.drivers}</td>
                  <td className="py-4">{row.trips}</td>
                  <td className="py-4">{row.fuel}</td>
                  <td className="py-4">{row.analytics}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </Layout>
  );
};

export default Settings;
