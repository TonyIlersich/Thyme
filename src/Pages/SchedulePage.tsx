import FlexColumn from 'Components/Containers/FlexColumn';
import ScheduleView from 'Components/Schedule/ScheduleView';
import Schedule from 'Models/Schedule';
import React from 'react';
import styled from 'styled-components';
import Margins from 'Styles/Margins';

type Props = {
	schedule: Schedule;
};

const ScheduleViewWithMargin = styled(ScheduleView)`
	margin: ${Margins.Large}px;
`;

const SchedulePage = (props: Props) => (
	<FlexColumn>
		<ScheduleViewWithMargin schedule={props.schedule} />
	</FlexColumn>
);

export default SchedulePage;