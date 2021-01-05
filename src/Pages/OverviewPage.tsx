import DailyPieChart from 'Components/Charts/DailyPieChart';
import FlexColumn from 'Components/Containers/FlexColumn';
import Project from 'Models/Project';
import React from 'react';

type Props = {
	projects: Project[];
};

const OverviewPage = (props: Props) => (
	<FlexColumn>
		<DailyPieChart projects={props.projects} />
	</FlexColumn>
);

export default OverviewPage;