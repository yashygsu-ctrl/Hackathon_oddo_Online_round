import { create } from 'zustand';
import axios from 'axios';

// Add a request interceptor to attach JWT token to all requests
axios.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

const useStore = create((set, get) => ({
  user: null,
  token: localStorage.getItem('token') || null,
  
  vehicles: [],
  drivers: [],
  trips: [],
  maintenance: [],
  expenses: [],
  
  loading: false,
  error: null,

  login: async (email, password) => {
    set({ loading: true, error: null });
    try {
      const { data } = await axios.post('/api/auth/login', { email, password });
      localStorage.setItem('token', data.token);
      set({ user: data, token: data.token, loading: false });
      return true;
    } catch (error) {
      set({ 
        error: error.response?.data?.message || 'Login failed', 
        loading: false 
      });
      return false;
    }
  },

  logout: () => {
    localStorage.removeItem('token');
    set({ user: null, token: null });
  },

  fetchVehicles: async () => {
    try {
      const { data } = await axios.get('/api/vehicles');
      set({ vehicles: data });
    } catch (error) {
      console.error('Error fetching vehicles', error);
    }
  },

  fetchDrivers: async () => {
    try {
      const { data } = await axios.get('/api/drivers');
      set({ drivers: data });
    } catch (error) {
      console.error('Error fetching drivers', error);
    }
  },

  fetchTrips: async () => {
    try {
      const { data } = await axios.get('/api/trips');
      set({ trips: data });
    } catch (error) {
      console.error('Error fetching trips', error);
    }
  },

  fetchMaintenance: async () => {
    try {
      const { data } = await axios.get('/api/maintenance');
      set({ maintenance: data });
    } catch (error) {
      console.error('Error fetching maintenance', error);
    }
  },

  fetchExpenses: async () => {
    try {
      const { data } = await axios.get('/api/expenses');
      set({ expenses: data });
    } catch (error) {
      console.error('Error fetching expenses', error);
    }
  },

  addTrip: async (tripData) => {
    try {
      const { data } = await axios.post('/api/trips', tripData);
      set((state) => ({ trips: [data, ...state.trips] }));
      return true;
    } catch (error) {
      console.error('Error adding trip', error);
      return false;
    }
  },

  deleteTrip: async (id) => {
    try {
      await axios.delete(`/api/trips/${id}`);
      set((state) => ({ trips: state.trips.filter(t => t._id !== id) }));
      return true;
    } catch (error) {
      console.error('Error deleting trip', error);
      return false;
    }
  },

  addMaintenanceLog: async (logData) => {
    try {
      const { data } = await axios.post('/api/maintenance', logData);
      set((state) => ({ maintenance: [data, ...state.maintenance] }));
      return true;
    } catch (error) {
      console.error('Error adding maintenance', error);
      return false;
    }
  },

  deleteMaintenanceLog: async (id) => {
    try {
      await axios.delete(`/api/maintenance/${id}`);
      set((state) => ({ maintenance: state.maintenance.filter(m => m._id !== id) }));
      return true;
    } catch (error) {
      console.error('Error deleting maintenance', error);
      return false;
    }
  },

  addVehicle: async (vehicleData) => {
    try {
      const { data } = await axios.post('/api/vehicles', vehicleData);
      set((state) => ({ vehicles: [data, ...state.vehicles] }));
      return true;
    } catch (error) {
      console.error('Error adding vehicle', error);
      return false;
    }
  },

  deleteVehicle: async (id) => {
    try {
      await axios.delete(`/api/vehicles/${id}`);
      set((state) => ({ vehicles: state.vehicles.filter(v => v._id !== id) }));
      return true;
    } catch (error) {
      console.error('Error deleting vehicle', error);
      return false;
    }
  },

  addDriver: async (driverData) => {
    try {
      const { data } = await axios.post('/api/drivers', driverData);
      set((state) => ({ drivers: [data, ...state.drivers] }));
      return true;
    } catch (error) {
      console.error('Error adding driver', error);
      return false;
    }
  },

  deleteDriver: async (id) => {
    try {
      await axios.delete(`/api/drivers/${id}`);
      set((state) => ({ drivers: state.drivers.filter(d => d._id !== id) }));
      return true;
    } catch (error) {
      console.error('Error deleting driver', error);
      return false;
    }
  },

  addExpense: async (expenseData) => {
    try {
      const { data } = await axios.post('/api/expenses', expenseData);
      set((state) => ({ expenses: [data, ...state.expenses] }));
      return true;
    } catch (error) {
      console.error('Error adding expense', error);
      return false;
    }
  },

  deleteExpense: async (id) => {
    try {
      await axios.delete(`/api/expenses/${id}`);
      set((state) => ({ expenses: state.expenses.filter(e => e._id !== id) }));
      return true;
    } catch (error) {
      console.error('Error deleting expense', error);
      return false;
    }
  },

  // Settings State
  settings: {
    depotName: 'Gandhinagar Depot GJ4',
    currency: 'INR (Rs)',
    distanceUnit: 'Kilometers'
  },
  updateSettings: (newSettings) => set({ settings: newSettings })
}));

export default useStore;
