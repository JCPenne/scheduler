import axios from 'axios';
import { useState, useEffect } from 'react';

export default function useApplicationData() {
  const [state, setState] = useState({
    day: 'Monday',
    days: [],
    appointments: {},
    interviewers: {},
  });

  useEffect(() => {
    Promise.all([axios.get('/api/days'), axios.get('/api/appointments'), axios.get('/api/interviewers')]).then(all => {
      setState(prev => ({
        ...prev,
        days: all[0].data,
        appointments: all[1].data,
        interviewers: all[2].data,
      }));
    });
  }, []);

  const setDay = day => setState({ ...state, day });
  const currentDay = state.days.filter(day => state.day === day.name)[0];

  const updateSpots = (state, appointments) => {
    let days = state.days;
    let currentAppointments = 0;
    const currentDay = state.days.find(day => day.name === state.day);

    currentDay.appointments.map(appointment => {
      if (appointments[appointment].interview !== null) {
        currentAppointments += 1;
      }
    });
    currentDay.spots = 5 - currentAppointments;

    return days;
  };
  //This function is working but I don't see how days is being altered, or why I can't just immediately return line 27 without running the function.

  /*  Find the current day by filtering state.days - DONE
For each appointment in currentDay
Push the appointment from APPOINTMENTS into an array
filter the array to show interviews that are not null
Turn that to a number
Have the current day's spots equal 5 minus the number in the line above */

  const bookInterview = (id, interview) => {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview },
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };

    return axios
      .put(`/api/appointments/${id}`, { interview })
      .then(() => {
        const days = updateSpots(state, appointments);
        setState({ ...state, appointments, days });
      })
      .catch(err => err);
  };

  const cancelInterview = id => {
    const appointment = {
      ...state.appointments[id],
      interview: null,
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };
    return axios
      .delete(`/api/appointments/${id}`)
      .then(() => {
        const days = updateSpots(state, appointments);
        setState({ ...state, appointments, days });
      })
      .catch(err => err);
  };

  return { state, setDay, bookInterview, cancelInterview };
}
