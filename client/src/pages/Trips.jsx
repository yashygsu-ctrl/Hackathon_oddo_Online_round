import React, { useEffect, useState } from 'react';
import Layout from '../components/Layout';
import { X, Plus } from 'lucide-react';
import useStore from '../store/useStore';

const Trips = () => {
  const trips = useStore(state => state.trips);
  const vehicles = useStore(state => state.vehicles);
  const drivers = useStore(state => state.drivers);
  const fetchTrips = useStore(state => state.fetchTrips);
  const fetchVehicles = useStore(state => state.fetchVehicles);
  const fetchDrivers = useStore(state => state.fetchDrivers);
  const addTrip = useStore(state => state.addTrip);
  const deleteTrip = useStore(state => state.deleteTrip);
  const completeTrip = useStore(state => state.completeTrip);

  const [showAddForm, setShowAddForm] = useState(false);
  const [completionModal, setCompletionModal] = useState({ open: false, tripId: null, odometer: '', fuel: '' });

  const user = useStore(state => state.user) || { role: 'Dispatcher' };
  const canEdit = user.role === 'Dispatcher';

  const [formData, setFormData] = useState({
    source: 'Gandhinagar Depot',
    destination: 'Ahmedabad Hub',
    vehicle: '',
    driver: '',
    weight: '700',
    distance: '38'
  });

  useEffect(() => {
    fetchTrips();
    fetchVehicles();
    fetchDrivers();
  }, [fetchTrips, fetchVehicles, fetchDrivers]);

  const availableVehicles = vehicles.filter(v => v.status === 'Available');
  const availableDrivers = drivers.filter(d => d.status === 'Available');

  const parseCapacity = (capStr) => {
    if (!capStr) return 0;
    const lower = capStr.toLowerCase();
    if (lower.includes('ton')) return parseFloat(lower) * 1000;
    return parseFloat(lower) || 0;
  };
  const selectedVehicleObj = vehicles.find(v => v._id === formData.vehicle);
  const maxCapacity = selectedVehicleObj ? parseCapacity(selectedVehicleObj.capacity) : 0;
  const isOverloaded = formData.weight && maxCapacity > 0 && parseFloat(formData.weight) > maxCapacity;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.vehicle || !formData.driver) return alert("Select vehicle and driver");
    if (isOverloaded) return alert(`Cargo weight (${formData.weight} kg) exceeds vehicle capacity (${maxCapacity} kg)`);
    
    await addTrip({
      tripId: `TR00${Math.floor(Math.random() * 900) + 10}`,
      source: formData.source,
      destination: formData.destination,
      vehicle: formData.vehicle,
      driver: formData.driver,
      weight: formData.weight,
      distance: formData.distance
    });
    setFormData({ ...formData, vehicle: '', driver: '' });
    setShowAddForm(false);
  };
  return (
    <Layout>
      <div className="flex flex-col gap-8">
        
        {/* Header Section */}
        <div className="flex justify-between items-center">
          <div className="mb-8">
            <h3 className="text-xs text-gray-500 uppercase tracking-widest mb-4">TRIP LIFECYCLE</h3>
            <div className="flex items-center px-2">
              <div className="flex flex-col items-center">
                <div className="w-4 h-4 rounded-full bg-[#10b981] mb-2"></div>
                <span className="text-[10px] text-[#10b981] font-bold">Draft</span>
              </div>
              <div className="flex-1 h-[2px] bg-[#333] -mt-5 mx-2"></div>
              
              <div className="flex flex-col items-center">
                <div className="w-4 h-4 rounded-full bg-[#3b82f6] mb-2"></div>
                <span className="text-[10px] text-[#3b82f6] font-bold">Dispatched</span>
              </div>
              <div className="flex-1 h-[2px] bg-[#333] -mt-5 mx-2"></div>
              
              <div className="flex flex-col items-center">
                <div className="w-4 h-4 rounded-full bg-[#4b5563] mb-2"></div>
                <span className="text-[10px] text-gray-500 font-bold">Completed</span>
              </div>
              <div className="flex-1 h-[2px] bg-[#333] -mt-5 mx-2"></div>
              
              <div className="flex flex-col items-center">
                <div className="w-4 h-4 rounded-full bg-[#4b5563] mb-2"></div>
                <span className="text-[10px] text-gray-500 font-bold">Cancelled</span>
              </div>
            </div>
          </div>
          
          {canEdit && (
            <button 
              onClick={() => setShowAddForm(!showAddForm)}
              className="px-4 py-2 bg-[#a36109] hover:bg-[#8a5207] text-white text-sm font-medium rounded transition-colors flex items-center gap-2"
            >
              {showAddForm ? <X size={16} /> : <Plus size={16} />}
              {showAddForm ? 'Cancel' : 'New Trip'}
            </button>
          )}
        </div>

        {showAddForm && canEdit && (
          <div className="mb-6 p-6 border border-[#333] rounded-lg bg-[#1a1a1a]">
            <h3 className="text-sm text-gray-400 uppercase tracking-widest mb-4">CREATE TRIP</h3>
            
            <form className="grid grid-cols-1 md:grid-cols-2 gap-4" onSubmit={handleSubmit}>
              <div>
                <label className="text-[10px] text-gray-500 uppercase tracking-widest block mb-1">SOURCE</label>
                <input required type="text" value={formData.source} onChange={(e) => setFormData({...formData, source: e.target.value})} className="w-full px-3 py-2 bg-transparent border border-[#444] rounded text-sm text-gray-300 focus:outline-none focus:border-primary" />
              </div>
              <div>
                <label className="text-[10px] text-gray-500 uppercase tracking-widest block mb-1">DESTINATION</label>
                <input required type="text" value={formData.destination} onChange={(e) => setFormData({...formData, destination: e.target.value})} className="w-full px-3 py-2 bg-transparent border border-[#444] rounded text-sm text-gray-300 focus:outline-none focus:border-primary" />
              </div>
              <div>
                <label className="text-[10px] text-gray-500 uppercase tracking-widest block mb-1">VEHICLE (AVAILABLE ONLY)</label>
                <select required value={formData.vehicle} onChange={(e) => setFormData({...formData, vehicle: e.target.value})} className="w-full px-3 py-2 bg-background-dark border border-[#444] rounded text-sm text-gray-300 focus:outline-none focus:border-primary">
                  <option value="">Select a vehicle...</option>
                  {availableVehicles.map(v => (
                    <option key={v._id} value={v._id}>{v.model} - {v.capacity} capacity</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="text-[10px] text-gray-500 uppercase tracking-widest block mb-1">DRIVER (AVAILABLE ONLY)</label>
                <select required value={formData.driver} onChange={(e) => setFormData({...formData, driver: e.target.value})} className="w-full px-3 py-2 bg-background-dark border border-[#444] rounded text-sm text-gray-300 focus:outline-none focus:border-primary">
                  <option value="">Select a driver...</option>
                  {availableDrivers.map(d => (
                    <option key={d._id} value={d._id}>{d.name}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="text-[10px] text-gray-500 uppercase tracking-widest block mb-1">CARGO WEIGHT (KG)</label>
                <input required type="number" min="0" value={formData.weight} onChange={(e) => setFormData({...formData, weight: e.target.value})} className="w-full px-3 py-2 bg-transparent border border-[#444] rounded text-sm text-gray-300 focus:outline-none focus:border-primary" />
              </div>
              <div>
                <label className="text-[10px] text-gray-500 uppercase tracking-widest block mb-1">PLANNED DISTANCE (KM)</label>
                <input required type="number" min="0" value={formData.distance} onChange={(e) => setFormData({...formData, distance: e.target.value})} className="w-full px-3 py-2 bg-transparent border border-[#444] rounded text-sm text-gray-300 focus:outline-none focus:border-primary" />
              </div>

              {isOverloaded && (
                <div className="col-span-full border border-red-500/50 rounded p-3">
                  <p className="text-[#f87171] font-bold text-sm mt-1">X Cargo exceeds vehicle maximum capacity ({maxCapacity} kg)</p>
                </div>
              )}

              <div className="col-span-full flex gap-4 pt-2">
                <button type="submit" className="flex-1 py-2 bg-[#f59e0b] hover:bg-[#d97706] text-[#fff] rounded text-sm font-medium transition-colors">
                  Dispatch Trip
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Live Board */}
        <div>
          <h3 className="text-xs text-gray-500 uppercase tracking-widest mb-4">LIVE BOARD</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {trips.map((trip, idx) => (
              <div key={idx} className="border border-dashed border-[#444] p-4 rounded bg-transparent">
                <div className="flex justify-between items-start mb-2">
                  <span className="text-gray-300 text-sm font-bold">{trip.tripId}</span>
                  <span className="text-gray-500 text-xs uppercase tracking-widest">{trip.vehicle?.model} / {trip.driver?.name}</span>
                </div>
                <p className="text-gray-300 text-sm mb-4 font-bold">{trip.source} &rarr; {trip.destination}</p>
                <div className="flex justify-between items-center">
                  <span 
                    className="px-3 py-1 text-[#fff] rounded text-xs font-bold"
                    style={{ 
                      backgroundColor: 
                        trip.status === 'Dispatched' ? '#3b82f6' : 
                        trip.status === 'Draft' ? '#6b7280' : 
                        trip.status === 'Cancelled' ? '#f87171' : '#10b981' 
                    }}
                  >
                    {trip.status}
                  </span>
                  <div className="flex items-center gap-4">
                    <span className="text-gray-500 text-xs">{trip.timeInfo}</span>
                    {canEdit && trip.status === 'Dispatched' && (
                      <button onClick={() => setCompletionModal({ open: true, tripId: trip._id, odometer: '', fuel: '' })} className="text-[#10b981] hover:text-[#059669] text-xs font-bold uppercase">Complete</button>
                    )}
                    {canEdit && <button onClick={() => deleteTrip(trip._id)} className="text-red-400 hover:text-red-300 text-xs font-bold uppercase">Delete</button>}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8">
            <p className="text-[11px] text-gray-500">On Complete: odometer &rarr; Fuel log &rarr; expenses &rarr; Vehicle &amp; Driver Available</p>
          </div>
        </div>
        
        {/* Completion Modal */}
        {completionModal.open && (
          <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50">
            <div className="bg-[#1a1a1a] border border-[#333] p-6 rounded-lg w-96">
              <h3 className="text-sm text-gray-200 uppercase tracking-widest mb-6">Complete Trip</h3>
              <div className="space-y-4">
                <div>
                  <label className="text-[10px] text-gray-500 uppercase tracking-widest block mb-1">Final Odometer</label>
                  <input type="number" value={completionModal.odometer} onChange={e => setCompletionModal({...completionModal, odometer: e.target.value})} className="w-full px-3 py-2 bg-transparent border border-[#444] rounded text-sm text-gray-300 focus:outline-none focus:border-primary" />
                </div>
                <div>
                  <label className="text-[10px] text-gray-500 uppercase tracking-widest block mb-1">Fuel Consumed (Liters)</label>
                  <input type="number" value={completionModal.fuel} onChange={e => setCompletionModal({...completionModal, fuel: e.target.value})} className="w-full px-3 py-2 bg-transparent border border-[#444] rounded text-sm text-gray-300 focus:outline-none focus:border-primary" />
                </div>
                <div className="flex gap-4 pt-4">
                  <button onClick={() => setCompletionModal({ open: false, tripId: null, odometer: '', fuel: '' })} className="flex-1 py-2 border border-[#444] text-gray-400 rounded text-sm font-medium hover:text-white">Cancel</button>
                  <button 
                    onClick={async () => {
                      if (!completionModal.odometer || !completionModal.fuel) return alert("Fill all fields");
                      await completeTrip(completionModal.tripId, completionModal.odometer, completionModal.fuel);
                      setCompletionModal({ open: false, tripId: null, odometer: '', fuel: '' });
                    }} 
                    className="flex-1 py-2 bg-[#10b981] hover:bg-[#059669] text-white rounded text-sm font-medium transition-colors"
                  >
                    Confirm
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

      </div>
    </Layout>
  );
};

export default Trips;
