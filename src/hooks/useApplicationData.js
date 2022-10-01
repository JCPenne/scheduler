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

  const updateSpots = (state, appointments) => {
    let spots = 0;
    const currentDay = state.days.find(day => day.name === state.day);

    currentDay.appointments.map(id => !appointments[id].interview && spots++);

    const day = { ...currentDay, spots };

    return state.days.map(d => (d.name === state.day ? day : d));
  };

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
