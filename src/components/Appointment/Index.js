import React, { Fragment } from 'react';

import './styles.scss';

import Header from './Header';
import Empty from './Empty';
import Show from './Show';
import Form from './Form';
import Status from './Status';
import Confirm from './Confirm';
import Error from './Error';

import { useVisualMode } from 'hooks/useVisualMode';

export default function Appointment(props) {
	const CANCEL = 'CANCEL';
	const CONFIRM = 'CONFIRM';
	const CREATE = 'CREATE';
	const EDIT = 'EDIT';
	const EMPTY = 'EMPTY';
	const SAVING = 'SAVING';
	const SHOW = 'SHOW';
	const ERROR_SAVE = 'ERROR_SAVE';
	const ERROR_DELETE = 'ERROR_DELETE';

	const { mode, transition, back } = useVisualMode(props.interview ? SHOW : EMPTY);

	function save(name, interviewer) {
		const interview = {
			student: name,
			interviewer,
		};
		transition(SAVING, true);
		props
			.bookInterview(props.id, interview)
			.then(() => transition(SHOW))
			.catch(() => transition(ERROR_SAVE));
	}

	function cancel() {
		transition(CANCEL, true);
		props
			.cancelInterview(props.id)
			.then(() => transition(EMPTY))
			.catch(() => transition(ERROR_DELETE));
	}
	return (
		<Fragment>
			<article
				className='appointment'
				data-testid='appointment'
			>
				<Header time={props.time} />
				{mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
				{mode === SHOW && (
					<Show
						student={props.interview.student}
						interviewer={props.interview.interviewer || {}}
						onDelete={() => transition(CONFIRM)}
						onEdit={() => transition(EDIT)}
					/>
				)}
				{mode === CREATE && (
					<Form
						interviewers={props.interviewers}
						onCancel={back}
						onSave={save}
					/>
				)}
				{mode === EDIT && (
					<Form
						student={props.interview.student}
						interviewer={props.interview.interviewer && props.interview.interviewer.id}
						interviewers={props.interviewers}
						onCancel={back}
						onSave={save}
					/>
				)}
				{mode === SAVING && <Status message='Saving' />}
				{mode === CANCEL && <Status message='Deleting' />}
				{mode === CONFIRM && (
					<Confirm
						message='Confirm appointment cancellation'
						onCancel={() => transition(SHOW)}
						onConfirm={cancel}
					/>
				)}
				{mode === ERROR_SAVE && (
					<Error
						message='error while saving'
						onClose={back}
					/>
				)}
				{mode === ERROR_DELETE && (
					<Error
						message='error while deleting'
						onClose={back}
					/>
				)}
			</article>
		</Fragment>
	);
}
