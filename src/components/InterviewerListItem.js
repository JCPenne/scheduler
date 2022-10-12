import React from 'react';
import classNames from 'classnames';
import 'components/InterviewerListItem.scss';

export default function InterviewerListItem(props) {
	const interviewerClass = classNames('interviewers__item', {
		'interviewers__item--selected': props.selected,
	});
	function showSelectedName() {
		if (props.selected) {
			return `${props.name}`;
		}
	}
	return (
		<li
			className={interviewerClass}
			key={props.id}
			onClick={props.setInterviewer}
		>
			<img
				className='interviewers__item-image'
				src={props.avatar}
				alt={props.name}
			/>
			{showSelectedName(props.name)}
		</li>
	);
}
