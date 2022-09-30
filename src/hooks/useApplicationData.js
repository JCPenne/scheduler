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
    Promise.all([
      axios.get('/api/days'),
      axios.get('/api/appointments'),
      axios.get('/api/interviewers')])
      .then(all => {
        setState(prev => ({
          ...prev,
          days: all[0].data,
          appointments: all[1].data,
          interviewers: all[2].data,
        }));
      });
  }, []);

  const setDay = day => setState({ ...state, day });
  const currentDay = state.days.filter(x => state.day === x.name)[0];

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
      .then(() => setState({ ...state, appointments }))
      .then((state.days[currentDay.id - 1].spots -= 1))
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
      .then(() => setState({ ...state, appointments }))
      .then((state.days[currentDay.id - 1].spots += 1))
      .catch(err => err);
  };

  return { state, setDay, bookInterview, cancelInterview };
}
