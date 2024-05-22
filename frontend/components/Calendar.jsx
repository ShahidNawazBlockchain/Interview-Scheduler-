"use client"
import React, { useState, useEffect } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import listPlugin from '@fullcalendar/list';
import useStore from '../store/useStore';

const Calendar = () => {
    const { interviews, fetchInterviews } = useStore();
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        // const fetchInterviewData = async () => {
        //     try {
        //         setLoading(true);
        //         const fetchedInterviews = await fetchInterviews();
        //         setEvents(fetchedInterviews.map(formatInterviewEvent));
        //         setLoading(false);
        //     } catch (error) {
        //         setError('Failed to fetch interviews.');
        //         setLoading(false);
        //     }
        // };

        fetchInterviews();
    }, []);

    const formatInterviewEvent = (interviews) => {
        const { slotId } = interviews;
        const start = new Date(`${slotId.date}T${slotId.startTime}`);
        const end = new Date(`${slotId.date}T${slotId.endTime}`);
        return {
            title: `${interviews.candidateName} - ${interviews.status}`,
            start,
            end,
            id: interviews._id
        };
    };

    return (
        <div className="max-w-3xl mx-auto p-8">
            <h2 className="text-3xl font-semibold text-center mb-8">Interview Calendar</h2>
            {loading && <p className="text-center">Loading...</p>}
            {error && <p className="text-center text-red-500">{error}</p>}
            {!loading && !error && (
                <FullCalendar
                    plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin, listPlugin]}
                    initialView="dayGridMonth"
                    headerToolbar={{
                        left: 'prev,next today',
                        center: 'title',
                        right: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek'
                    }}
                    events={events}
                    eventTimeFormat={{ hour: '2-digit', minute: '2-digit', hour12: false }}
                    slotMinTime="06:00:00"
                    slotMaxTime="22:00:00"
                    allDaySlot={false}
                    editable={true}
                    selectable={true}
                />
            )}
        </div>
    );
};

export default Calendar;
