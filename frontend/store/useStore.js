// store/useStore.js
import create from 'zustand';
import axios from 'axios';

const useStore = create((set) => ({
  slots: [],
  interviews: [],
  fetchSlots: async () => {
    try {
      const response = await axios.get('http://localhost:5000/slots');
      set({ slots: response.data });
    } catch (error) {
      console.error('Error fetching slots:', error);
    }
  },
  fetchInterviews: async () => {
    try {
      const response = await axios.get('http://localhost:5000/interviews');
      set({ interviews: response.data });
    } catch (error) {
      console.error('Error fetching interviews:', error);
    }
  },
  addSlot: async (slot) => {
    try {
      const response = await axios.post('http://localhost:5000/slots', slot);
      set((state) => ({ slots: [...state.slots, response.data] }));
    } catch (error) {
      console.error('Error adding slot:', error);
    }
  },
  updateSlot: async (id, updatedSlot) => {
    try {
      await axios.put(`http://localhost:5000/slots/${id}`, updatedSlot);
      set((state) => ({
        slots: state.slots.map((slot) => (slot._id === id ? updatedSlot : slot)),
      }));
    } catch (error) {
      console.error('Error updating slot:', error);
    }
  },
  deleteSlot: async (id) => {
    try {
      await axios.delete(`http://localhost:5000/slots/${id}`);
      set((state) => ({
        slots: state.slots.filter((slot) => slot._id !== id),
      }));
    } catch (error) {
      console.error('Error deleting slot:', error);
    }
  },

  addInterview: async (interview) => {
    try {
      const response = await axios.post('http://localhost:5000/interviews', interview);
      set((state) => ({ interviews: [...state.interviews, response.data] }));
    } catch (error) {
      console.error('Error adding interview:', error);
    }
  },
  updateInterview: async (id, updatedInterview) => {
    try {
      await axios.put(`http://localhost:5000/interviews/${id}`, updatedInterview);
      set((state) => ({
        interviews: state.interviews.map((interview) =>
          interview._id === id ? updatedInterview : interview
        ),
      }));
    } catch (error) {
      console.error('Error updating interview:', error);
    }
  },
  deleteInterview: async (id) => {
    try {
      await axios.delete(`http://localhost:5000/interviews/${id}`);
      set((state) => ({
        interviews: state.interviews.filter((interview) => interview._id !== id),
      }));
    } catch (error) {
      console.error('Error deleting interview:', error);
    }
  },
}));

export default useStore;
