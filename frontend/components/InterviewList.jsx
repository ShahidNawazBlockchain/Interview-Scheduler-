"use client";
import { useState, useEffect } from 'react';
import useStore from '../store/useStore';
import { HiOutlineUser, HiOutlineCalendar, HiPencilAlt, HiTrash, HiPlus } from 'react-icons/hi';
import { motion } from 'framer-motion';

const InterviewList = () => {
  const { interviews, slots, fetchInterviews, fetchSlots, addInterview, updateInterview, deleteInterview } = useStore();
  const [isOpen, setIsOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentInterviewId, setCurrentInterviewId] = useState(null);
  const [newInterview, setNewInterview] = useState({ candidateName: '', slotId: '', status: '' });

  useEffect(() => {
    fetchInterviews();
    fetchSlots();
  }, []);

  const handleAddOrUpdateInterview = () => {
    if (isEditing) {
      updateInterview(currentInterviewId, newInterview);
    } else {
      addInterview(newInterview);
    }
    setIsOpen(false);
    setIsEditing(false);
    setNewInterview({ candidateName: '', slotId: '', status: '' });
  };

  const handleEdit = (id, interview) => {
    setIsEditing(true);
    setIsOpen(true);
    setCurrentInterviewId(id);
    setNewInterview(interview);
  };

  const handleDelete = (id) => {
    deleteInterview(id);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewInterview({ ...newInterview, [name]: value });
  };

  return (
    <div className='bg-gray-900 p-11 min-h-screen'>
      <div className='min-w-full flex justify-between'>
        <h1 className="text-2xl font-bold text-yellow-400 underline pb-4">Interview List</h1>
        <button className="bg-yellow-400 hover:bg-yellow-500 text-white font-bold py-2 px-4 rounded" onClick={() => setIsOpen(true)}>
          <HiPlus className="inline-block w-6 h-6 mr-1" />
          {isEditing ? 'Edit Interview' : 'Add Interview'}
        </button>
      </div>
      <table className="min-w-full divide-y divide-gray-200">
        <thead>
          <tr className='text-yellow-400'>
            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
              <HiOutlineUser className="inline-block w-6 h-6 mr-1" />Candidate
            </th>
        <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
        <HiOutlineUser className="inline-block w-6 h-6 mr-1" /> Interviewer
         </th>
            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
              <HiOutlineCalendar className="inline-block w-6 h-6 mr-1" />Slot
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
              Status
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="bg-gray-900 divide-y divide-gray-700 text-gray-300">
        {interviews.map(interview => (
          <motion.tr className='hover:text-yellow-400' key={interview._id} whileHover={{ scale: 1.05 }} transition={{ duration: 0.3 }}>
            <td className="px-6 py-4 whitespace-nowrap">{interview.candidateName}</td>
            <td className="px-6 py-4 whitespace-nowrap">{interview.slotId.interviewer}</td>
            <td className="px-6 py-4 whitespace-nowrap">
              {interview.slotId.startTime} - {interview.slotId.endTime} on {interview.slotId.date}
            </td>
            <td className="px-6 py-4 whitespace-nowrap">{interview.status}</td>
            <td className="px-6 py-4 whitespace-nowrap space-x-2">
              <button onClick={() => handleEdit(interview._id, interview)}>
                <HiPencilAlt className="inline-block w-6 h-6 text-blue-500" />
              </button>
              <button onClick={() => handleDelete(interview._id)}>
                <HiTrash className="inline-block w-6 h-6 text-red-500" />
              </button>
            </td>
          </motion.tr>
        ))}
        </tbody>
      </table>

      {/* New/Edit Interview Modal */}
      {isOpen && (
        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 transition-opacity">
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>
            <span className="hidden sm:inline-block sm:align-middle sm:h-screen"></span>&#8203;
            <div className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6">
              <div>
                <h3 className="text-lg leading-6 font-medium text-gray-900">{isEditing ? 'Edit Interview' : 'Add New Interview'}</h3>
                <div className="mt-5">
                  <div className="grid grid-cols-6 gap-6">
                    <div className="col-span-6 sm:col-span-3">
                      <label htmlFor="candidateName" className="block text-sm font-medium text-gray-700">Candidate Name</label>
                      <input
                        type="text"
                        name="candidateName"
                        id="candidateName"
                        autoComplete="off"
                        value={newInterview.candidateName}
                        onChange={handleChange}
                        className="mt-1 focus:ring-yellow-400 focus:border-yellow-400 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                      />
                    </div>
                    <div className="col-span-6 sm:col-span-3">
                      <label htmlFor="slotId" className="block text-sm font-medium text-gray-700">Slot</label>
                      <select
                        name="slotId"
                        id="slotId"
                        value={newInterview.slotId}
                        onChange={handleChange}
                        className="mt-1 focus:ring-yellow-400 focus:border-yellow-400 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                      >
                        <option value="">Select a slot</option>
                        {slots.map(slot => (
                          <option key={slot._id} value={slot._id}>
                            {slot.startTime} - {slot.endTime} on {slot.date}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="col-span-6 sm:col-span-3">
                      <label htmlFor="status" className="block text-sm font-medium text-gray-700">Status</label>
                      <select
                        name="status"
                        id="status"
                        value={newInterview.status}
                        onChange={handleChange}
                        className="mt-1 focus:ring-yellow-400 focus:border-yellow-400 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                      >
                        <option value="">Select status</option>
                        <option value="Scheduled">Scheduled</option>
                        <option value="Completed">Completed</option>
                        <option value="Cancelled">Cancelled</option>
                      </select>
                    </div>
                  </div>
                </div>
                <div className="mt-4">
                  <button type="button" className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded mr-2" onClick={() => { setIsOpen(false); setIsEditing(false); }}>
                    Cancel
                  </button>
                  <button type="button" className="bg-yellow-400 hover:bg-yellow-500 text-white font-bold py-2 px-4 rounded" onClick={handleAddOrUpdateInterview}>
                    {isEditing ? 'Update Interview' : 'Add Interview'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default InterviewList;
