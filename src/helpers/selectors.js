export function getAppointmentsForDay(state, day) {
  const result = [];

  if (state.days.length === 0) return result;

  const filteredDay = state.days.filter(element => element.name === day);

  if (filteredDay.length === 0) return result;
  const appointmentIDs = filteredDay[0].appointments;

  for (let element in state.appointments) {
    const appointment = state.appointments[element];
    appointmentIDs.includes(appointment.id) && result.push(appointment);
  }
  return result;
}

export function getInterviewersForDay(state, day) {
  const result = [];

  if (state.days.length === 0) return result;

  const filteredDay = state.days.filter(element => element.name === day);

  if (filteredDay.length === 0) return result;
  const interviewerIDs = filteredDay[0].interviewers;

  for (let element in state.interviewers) {
    const interviewer = state.interviewers[element];
    interviewerIDs.includes(interviewer.id) && result.push(interviewer);
  }
  return result;
}



export function getInterview(state, interview) {
  let result = {};

  if (interview === null) {
    return null;
  }

  result = {
    student: interview.student,
    interviewer: state.interviewers[interview.interviewer],
  };

  return result;
}
