import FixedAspectFlexRow from 'Components/Containers/FixedAspectFlexRow';
import FlexColumn from 'Components/Containers/FlexColumn';
import TextLine from 'Components/Texts/TextLine';
import Schedule from 'Models/Schedule';
import React from 'react';
import styled from 'styled-components';
import Borders from 'Styles/Borders';
import Colors from 'Styles/Colors';
import Margins from 'Styles/Margins';
import { DaysOfWeek, formatAsTimeOfDay, getDayOfWeek, MsPerDay, MsPerHour } from 'Utils/TimeUtils';

type Props = {
	className?: string;
	schedule: Schedule;
};

const ScheduleViewContainer = styled(FixedAspectFlexRow)`
`;

const DayLabel = styled(TextLine)<{ isToday: boolean }>`
	flex-grow: 0;
	padding: ${Margins.Small}px;
	border-bottom: ${Borders.Medium}px solid ${Colors.Dark};

	${props => props.isToday ? `
		background-color: ${Colors.Dark};
		color: ${Colors.TextLight};
	` : ''}
`;

const Gap = styled(FlexColumn)`
`;

const TimeSlotView = styled(FlexColumn)`
	background-color: ${Colors.Dark};
	justify-content: center;
`;

const TimeSlotText = styled(TextLine)`
	flex-grow: 0;
`;

const ScheduleStartTime = 7.5 * MsPerHour;

const ScheduleView = (props: Props) => (
	<ScheduleViewContainer className={props.className} aspect={1}>
		<FlexColumn ratio={.4}>
			<DayLabel isToday={false}>&nbsp;</DayLabel>
			{Array.from({ length: 33 }).map((_, i) => (
				<TextLine key={i} right>{formatAsTimeOfDay(i * .5 * MsPerHour + ScheduleStartTime)}</TextLine>
			))}
		</FlexColumn>
		{DaysOfWeek.map((d, j) => (
			<FlexColumn key={j}>
				<DayLabel isToday={getDayOfWeek() === d} center>{d}</DayLabel>
				{props.schedule[d].map((ts, i, a) => (
					<React.Fragment key={i}>
						<Gap ratio={ts.start - (i ? a[i-1].end : ScheduleStartTime)} />
						<TimeSlotView ratio={ts.end - ts.start}>
							<TimeSlotText key='time' center>{formatAsTimeOfDay(ts.start)} &ndash; {formatAsTimeOfDay(ts.end)}</TimeSlotText>
							<TimeSlotText key='name' center>{ts.name}</TimeSlotText>
						</TimeSlotView>
					</React.Fragment>
				))}
				<Gap ratio={props.schedule[d].length
					? MsPerDay - props.schedule[d][props.schedule[d].length - 1].end
					: 1} />
			</FlexColumn>
		))}
	</ScheduleViewContainer>
);

export default ScheduleView;