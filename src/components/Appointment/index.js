import React, { Fragment } from 'react';

import './styles.scss';

import Header from './Header';
import Empty from './Empty';
import Show from './Show';
import Form from './Form';
import Status from './Status';
import Confirm from './Confirm';

import { useVisualMode } from 'hooks/useVisualMode';

export default function Appointment(props) {
  const CANCEL = 'CANCEL';
  const CONFIRM = 'CONFIRM';
  const CREATE = 'CREATE';
  const EDIT = 'EDIT';
  const EMPTY = 'EMPTY';
  const SAVING = 'SAVING';
  const SHOW = 'SHOW';

  const { mode, transition, back } = useVisualMode(props.interview ? SHOW : EMPTY);

  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer,
    };
    transition(SAVING);
    props.bookInterview(props.id, interview).then(() => transition(SHOW));
  }

  function cancel() {
    transition(CANCEL);
    props.cancelInterview(props.id).then(() => transition(EMPTY));
  }
  return (
    <Fragment>
      <article className='appointment'>
        <Header time={props.time} />
        {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
        {mode === SHOW && <Show student={props.interview.student} interviewer={props.interview.interviewer || {}} onDelete={() => transition(CONFIRM)} onEdit={() => transition(EDIT)}/>}
        {mode === CREATE && <Form interviewers={props.interviewers} onCancel={back} onSave={save} />}
        {mode === EDIT && <Form student={props.interview.student} interviewer={props.interview.interviewer && props.interview.interviewer.id} interviewers={props.interviewers} onCancel={back} onSave={save}/>}
        {mode === SAVING && <Status message='Saving' />}
        {mode === CANCEL && <Status message='Deleting' />}
        {mode === CONFIRM && <Confirm message='Confirm appointment cancellation' onCancel={() => transition(SHOW)} onConfirm={cancel} />}
      </article>
    </Fragment>
  );
}
