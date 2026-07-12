import React, { useEffect, useState } from 'react';
import Layout from '../components/Layout';
import { Plus, X, Droplet, FileText } from 'lucide-react';
import useStore from '../store/useStore';

const Expenses = () => {
  const expenses = useStore(state => state.expenses);
  const vehicles = useStore(state => state.vehicles);
  const fetchExpenses = useStore(state => state.fetchExpenses);
  const fetchVehicles = useStore(state => state.fetchVehicles);
  const addExpense = useStore(state => state.addExpense);
  const deleteExpense = useStore(state => state.deleteExpense);

  const [showFuelForm, setShowFuelForm] = useState(false);
  const [showOtherForm, setShowOtherForm] = useState(false);

  const user = useStore(state => state.user) || { role: 'Financial Analyst' };
  const canEdit = user.role === 'Financial Analyst';

  const [fuelData, setFuelData] = useState({ vehicle: '', date: '', liters: '', fuelCost: '' });
  const [otherData, setOtherData] = useState({ tripId: '', vehicle: '', toll: '', other: '', maintCost: '' });

  const handleAddFuel = async (e) => {
    e.preventDefault();
    if(!fuelData.vehicle || !fuelData.fuelCost) return alert('Vehicle and Cost required');
    await addExpense({ type: 'Fuel', vehicle: fuelData.vehicle, date: fuelData.date, liters: fuelData.liters, fuelCost: fuelData.fuelCost });
    setShowFuelForm(false);
    setFuelData({ vehicle: '', date: '', liters: '', fuelCost: '' });
  };
  const handleAddOther = async (e) => {
    e.preventDefault();
    await addExpense({ type: 'Other', tripId: otherData.tripId, vehicle: otherData.vehicle, toll: otherData.toll, other: otherData.other, maintCost: otherData.maintCost, totalStatus: 'Completed' });
    setShowOtherForm(false);
    setOtherData({ tripId: '', vehicle: '', toll: '', other: '', maintCost: '' });
  };

  useEffect(() => {
    fetchExpenses();
    fetchVehicles();
  }, [fetchExpenses, fetchVehicles]);

  const fuelLogs = expenses.filter(e => e.type === 'Fuel');
  const otherExpenses = expenses.filter(e => e.type === 'Other');

  return (
    <Layout>
      <div className="flex justify-between items-end mb-8">
        <div>
          <h2 className="text-2xl text-gray-200 mb-1">Expenses & Fuel</h2>
          <p className="text-gray-400 text-sm">Manage operational costs</p>
        </div>
        
        <div className="flex gap-4">
          {canEdit && (
            <>
              <button 
                onClick={() => { setShowFuelForm(!showFuelForm); setShowOtherForm(false); }}
                className="flex items-center gap-2 px-6 py-2 bg-[#10b981] hover:bg-[#059669] text-white rounded text-sm font-medium transition-colors"
              >
                {showFuelForm ? <X size={16} /> : <Droplet size={16} />}
                {showFuelForm ? 'Cancel' : 'Log Fuel'}
              </button>
              <button 
                onClick={() => { setShowOtherForm(!showOtherForm); setShowFuelForm(false); }}
                className="flex items-center gap-2 px-6 py-2 bg-[#a36109] hover:bg-[#8a5207] text-white rounded text-sm font-medium transition-colors"
              >
                {showOtherForm ? <X size={16} /> : <FileText size={16} />}
                {showOtherForm ? 'Cancel' : 'Add Expense'}
              </button>
            </>
          )}
        </div>
      </div>

      {showFuelForm && canEdit && (
        <form onSubmit={handleAddFuel} className="bg-background-light p-6 rounded border border-[#333] mb-8 grid grid-cols-2 md:grid-cols-5 gap-4 items-end">
          <div className="col-span-2 md:col-span-1">
            <label className="text-[10px] text-gray-500 uppercase tracking-widest block mb-1">VEHICLE</label>
            <select required value={fuelData.vehicle} onChange={e => setFuelData({...fuelData, vehicle: e.target.value})} className="w-full px-3 py-2 bg-background-dark border border-[#444] rounded text-sm text-gray-300 focus:border-primary">
              <option value="">Select a vehicle...</option>
              {vehicles.map(v => <option key={v._id} value={v._id}>{v.model}</option>)}
            </select>
          </div>
          <div className="col-span-2 md:col-span-1">
            <label className="text-[10px] text-gray-500 uppercase tracking-widest block mb-1">DATE</label>
            <input required type="date" value={fuelData.date} onChange={e => setFuelData({...fuelData, date: e.target.value})} className="w-full px-3 py-2 bg-transparent border border-[#444] rounded text-sm text-gray-300 focus:border-primary" />
          </div>
          <div className="col-span-2 md:col-span-1">
            <label className="text-[10px] text-gray-500 uppercase tracking-widest block mb-1">LITERS</label>
            <input required type="number" min="0" step="0.1" value={fuelData.liters} onChange={e => setFuelData({...fuelData, liters: e.target.value})} className="w-full px-3 py-2 bg-transparent border border-[#444] rounded text-sm text-gray-300 focus:border-primary" />
          </div>
          <div className="col-span-2 md:col-span-1">
            <label className="text-[10px] text-gray-500 uppercase tracking-widest block mb-1">COST</label>
            <input required type="number" min="0" value={fuelData.fuelCost} onChange={e => setFuelData({...fuelData, fuelCost: e.target.value})} className="w-full px-3 py-2 bg-transparent border border-[#444] rounded text-sm text-gray-300 focus:border-primary" />
          </div>
          <div className="col-span-2 md:col-span-1">
            <button type="submit" className="w-full py-2 bg-[#10b981] hover:bg-[#059669] text-white rounded text-sm font-medium transition-colors">Save Fuel</button>
          </div>
        </form>
      )}

      {showOtherForm && canEdit && (
        <form onSubmit={handleAddOther} className="bg-background-light p-6 rounded border border-[#333] mb-8 grid grid-cols-2 md:grid-cols-6 gap-4 items-end">
          <div className="col-span-2 md:col-span-1">
            <label className="text-[10px] text-gray-500 uppercase tracking-widest block mb-1">TRIP ID (OPTIONAL)</label>
            <input type="text" value={otherData.tripId} onChange={e => setOtherData({...otherData, tripId: e.target.value})} className="w-full px-3 py-2 bg-transparent border border-[#444] rounded text-sm text-gray-300 focus:border-primary" />
          </div>
          <div className="col-span-2 md:col-span-1">
            <label className="text-[10px] text-gray-500 uppercase tracking-widest block mb-1">VEHICLE</label>
            <select required value={otherData.vehicle} onChange={e => setOtherData({...otherData, vehicle: e.target.value})} className="w-full px-3 py-2 bg-background-dark border border-[#444] rounded text-sm text-gray-300 focus:border-primary">
              <option value="">Select a vehicle...</option>
              {vehicles.map(v => <option key={v._id} value={v._id}>{v.model}</option>)}
            </select>
          </div>
          <div className="col-span-2 md:col-span-1">
            <label className="text-[10px] text-gray-500 uppercase tracking-widest block mb-1">TOLL</label>
            <input required type="number" min="0" value={otherData.toll} onChange={e => setOtherData({...otherData, toll: e.target.value})} className="w-full px-3 py-2 bg-transparent border border-[#444] rounded text-sm text-gray-300 focus:border-primary" />
          </div>
          <div className="col-span-2 md:col-span-1">
            <label className="text-[10px] text-gray-500 uppercase tracking-widest block mb-1">OTHER</label>
            <input required type="number" min="0" value={otherData.other} onChange={e => setOtherData({...otherData, other: e.target.value})} className="w-full px-3 py-2 bg-transparent border border-[#444] rounded text-sm text-gray-300 focus:border-primary" />
          </div>
          <div className="col-span-2 md:col-span-1">
            <label className="text-[10px] text-gray-500 uppercase tracking-widest block mb-1">MAINT COST</label>
            <input required type="number" min="0" value={otherData.maintCost} onChange={e => setOtherData({...otherData, maintCost: e.target.value})} className="w-full px-3 py-2 bg-transparent border border-[#444] rounded text-sm text-gray-300 focus:border-primary" />
          </div>
          <div className="col-span-2 md:col-span-1">
            <button type="submit" className="w-full py-2 bg-[#10b981] hover:bg-[#059669] text-white rounded text-sm font-medium transition-colors">Save Exp</button>
          </div>
        </form>
      )}

      <div className="mb-12">
        <table className="w-full text-left text-sm text-gray-300">
          <thead>
            <tr className="border-b border-[#333]">
              <th className="pb-3 font-normal text-gray-500 uppercase tracking-widest text-xs">VEHICLE</th>
              <th className="pb-3 font-normal text-gray-500 uppercase tracking-widest text-xs">DATE</th>
              <th className="pb-3 font-normal text-gray-500 uppercase tracking-widest text-xs">LITERS</th>
              <th className="pb-3 font-normal text-gray-500 uppercase tracking-widest text-xs">FUEL COST</th>
              <th className="pb-3 font-normal text-gray-500 uppercase tracking-widest text-xs">ACTIONS</th>
            </tr>
          </thead>
          <tbody>
            {fuelLogs.map((row, idx) => (
              <tr key={idx} className="border-b border-[#222]">
                <td className="py-4">{row.vehicle?.model || 'Unknown'}</td>
                <td className="py-4">{row.date}</td>
                <td className="py-4">{row.liters}</td>
                <td className="py-4">{row.fuelCost}</td>
                <td className="py-4 text-gray-400">
                  {canEdit ? (
                    <button onClick={() => deleteExpense(row._id)} className="text-red-400 hover:text-red-300 text-xs font-bold uppercase">Delete</button>
                  ) : (
                    '--'
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mb-6">
        <h3 className="text-xs text-gray-500 uppercase tracking-widest mb-4">OTHER EXPENSES (TOLL / MISC)</h3>
        <table className="w-full text-left text-sm text-gray-300">
          <thead>
            <tr className="border-b border-[#333]">
              <th className="pb-3 font-normal text-gray-500 uppercase tracking-widest text-xs">TRIP</th>
              <th className="pb-3 font-normal text-gray-500 uppercase tracking-widest text-xs">VEHICLE</th>
              <th className="pb-3 font-normal text-gray-500 uppercase tracking-widest text-xs">TOLL</th>
              <th className="pb-3 font-normal text-gray-500 uppercase tracking-widest text-xs">OTHER</th>
              <th className="pb-3 font-normal text-gray-500 uppercase tracking-widest text-xs">MAINT. (LINKED)</th>
              <th className="pb-3 font-normal text-gray-500 uppercase tracking-widest text-xs">TOTAL</th>
              <th className="pb-3 font-normal text-gray-500 uppercase tracking-widest text-xs">ACTIONS</th>
            </tr>
          </thead>
          <tbody>
            {otherExpenses.map((row, idx) => (
              <tr key={idx} className="border-b border-[#222]">
                <td className="py-4">{row.trip?.tripId || '--'}</td>
                <td className="py-4">{row.vehicle?.model || '--'}</td>
                <td className="py-4">{row.toll}</td>
                <td className="py-4">{row.other}</td>
                <td className="py-4">{row.maintCost}</td>
                <td className="py-4">
                  <span 
                    className="px-3 py-1 rounded text-[#fff]" 
                    style={{ backgroundColor: row.totalStatus === 'Completed' ? '#65a30d' : '#10b981' }}
                  >
                    {row.totalStatus}
                  </span>
                </td>
                <td className="py-4 text-gray-400">
                  {canEdit ? (
                    <button onClick={() => deleteExpense(row._id)} className="text-red-400 hover:text-red-300 text-xs font-bold uppercase">Delete</button>
                  ) : (
                    '--'
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="border-t border-[#fff] pt-4 mt-16 flex justify-between items-center text-sm">
        <span className="text-gray-300 uppercase tracking-widest text-xs font-bold">TOTAL OPERATIONAL COST (AUTO) = FUEL + MAINT</span>
        <span className="text-[#a36109] font-bold text-lg tracking-wider">34,070</span>
      </div>
    </Layout>
  );
};

export default Expenses;
