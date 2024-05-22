"use client"
import { useState, useEffect } from 'react';
import useStore from '../store/useStore';
import { HiOutlineUser, HiOutlineClock, HiOutlineCalendar, HiPencilAlt, HiTrash, HiPlus } from 'react-icons/hi';
import { motion } from 'framer-motion';

const SlotList = () => {
  const { slots, fetchSlots, addSlot, updateSlot, deleteSlot } = useStore();
  const [isOpen, setIsOpen] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [currentSlotId, setCurrentSlotId] = useState(null);
  const [newSlot, setNewSlot] = useState({ date: '', startTime: '', endTime: '', interviewer: '' });

  useEffect(() => {
    fetchSlots();
  }, [fetchSlots]);

  const handleUpdate = (id) => {
    const slot = slots.find(slot => slot._id === id);
    setNewSlot(slot);
    setCurrentSlotId(id);
    setIsEdit(true);
    setIsOpen(true);
  };

  const handleDelete = (id) => {
    deleteSlot(id);
  };

  const handleSaveSlot = () => {
    if (isEdit) {
      updateSlot(currentSlotId, newSlot);
    } else {
      addSlot(newSlot);
    }
    setIsOpen(false);
    setIsEdit(false);
    setNewSlot({ date: '', startTime: '', endTime: '', interviewer: '' });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewSlot({ ...newSlot, [name]: value });
  };

  return (
    <div className='bg-gray-900 p-11 min-h-screen'>
      <div className='min-w-full flex justify-between'>
        <h1 className="text-2xl font-bold text-yellow-400 underline pb-4">Slot List</h1>
        <button className="bg-yellow-400 hover:bg-gray-950 hover:text-yellow-400 text-white font-bold py-2 px-4 rounded" onClick={() => setIsOpen(true)}>
          <HiPlus className="inline-block w-6 h-6 mr-1" />
          Add Slot
        </button>
      </div>
      <table className="min-w-full divide-y divide-gray-200">
        <thead>
          <tr className='text-yellow-400'>
            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
              <HiOutlineUser className="inline-block w-6 h-6 mr-1" />Interviewer
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
              <HiOutlineClock className="inline-block w-6 h-6 mr-1" />Time
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
              <HiOutlineCalendar className="inline-block w-6 h-6 mr-1" />Date
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="bg-gray-900 divide-y divide-gray-700 text-gray-300">
          {slots.map(slot => (
            <motion.tr className='hover:text-yellow-400' key={slot._id} whileHover={{ scale: 1.05 }} transition={{ duration: 0.3 }}>
              <td className="px-6 py-4 whitespace-nowrap">{slot.interviewer}</td>
              <td className="px-6 py-4 whitespace-nowrap">{slot.startTime} - {slot.endTime}</td>
              <td className="px-6 py-4 whitespace-nowrap">{slot.date}</td>
              <td className="px-6 py-4 whitespace-nowrap space-x-2">
                <button onClick={() => handleUpdate(slot._id)}>
                  <HiPencilAlt className="inline-block w-6 h-6 text-blue-500" />
                </button>
                <button onClick={() => handleDelete(slot._id)}>
                  <HiTrash className="inline-block w-6 h-6 text-red-500" />
                </button>
              </td>
            </motion.tr>
          ))}
        </tbody>
      </table>

     {/* New Slot Modal */}
{isOpen && (
  <div className="fixed inset-0 z-10 overflow-y-auto">
    <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
      <div className="fixed inset-0 transition-opacity">
        <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
      </div>
      <span className="hidden sm:inline-block sm:align-middle sm:h-screen"></span>&#8203;
      <div className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6">
        <div className="flex justify-center mb-4">
          {isEdit ? (
            <HiPencilAlt className="text-blue-500 text-3xl" />
          ) : (
            <HiPlus className="text-yellow-400 text-3xl" />
          )}
        </div>
        <h3 className="text-lg leading-6 font-medium text-gray-900">{isEdit ? 'Update Slot' : 'Add New Slot'}</h3>
        <div className="mt-5">
          <div className="grid grid-cols-6 gap-6">
            <div className="col-span-6 sm:col-span-3">
              <label htmlFor="date" className="block text-sm font-medium text-gray-700">Date</label>
              <input
                type="date"
                name="date"
                id="date"
                autoComplete="off"
                value={newSlot.date}
                onChange={handleChange}
                className="mt-1 focus:ring-yellow-400 focus:border-yellow-400 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
              />
            </div>
            <div className="col-span-6 sm:col-span-3">
              <label htmlFor="startTime" className="block text-sm font-medium text-gray-700">Start Time</label>
              <input
                type="time"
                name="startTime"
                id="startTime"
                autoComplete="off"
                value={newSlot.startTime}
                onChange={handleChange}
                className="mt-1 focus:ring-yellow-400 focus:border-yellow-400 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
              />
            </div>
            <div className="col-span-6 sm:col-span-3">
              <label htmlFor="endTime" className="block text-sm font-medium text-gray-700">End Time</label>
              <input
                type="time"
                name="endTime"
                id="endTime"
                autoComplete="off"
                value={newSlot.endTime}
                onChange={handleChange}
                className="mt-1 focus:ring-yellow-400 focus:border-yellow-400 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
              />
            </div>
            <div className="col-span-6 sm:col-span-3">
              <label htmlFor="interviewer" className="block text-sm font-medium text-gray-700">Interviewer</label>
              <input
                type="text"
                name="interviewer"
                id="interviewer"
                autoComplete="off"
                value={newSlot.interviewer}
                onChange={handleChange}
                className="mt-1 focus:ring-yellow-400 focus:border-yellow-400 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
              />
            </div>
          </div>
        </div>
        <div className="mt-4">
          <button type="button" className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded mr-2" onClick={() => { setIsOpen(false); setIsEdit(false); }}>
            Cancel
          </button>
          <button type="button" className="bg-yellow-400 hover:bg-yellow-500 text-white font-bold py-2 px-4 rounded" onClick={handleSaveSlot}>
            {isEdit ? 'Update Slot' : 'Add Slot'}
          </button>
        </div>
      </div>
    </div>
  </div>
)}


    </div>
  );
};

export default SlotList;
