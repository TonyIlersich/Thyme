import FixedAspectFlexRow from 'Components/Containers/FixedAspectFlexRow';
import Project from 'Models/Project';
import { PieChart } from 'react-minimal-pie-chart';
import Colors from 'Styles/Colors';
import { FontFamilies } from 'Styles/Fonts';
import { getProjectAccruedDuration } from 'Utils/ProjectUtils';
import { getMsSinceDayStart, MsPerDay, MsPerMinute } from 'Utils/TimeUtils';

type Props = {
	projects: Project[];
};

const DailyPieChart = (props: Props) => {
	const projectData = props.projects.map(p => ({
		title: p.name,
		color: '#922', // TODO: use project color
		value: getProjectAccruedDuration(p),
	}));
	const msSinceDayStart = getMsSinceDayStart();
	const data = [{
		title: 'Untracked',
		color: Colors.Dark,
		value: msSinceDayStart - projectData.reduce((sum, d) => sum + d.value, 0),
	}, ...projectData, {
		title: 'Remaining',
		color: Colors.SuperLight,
		value: MsPerDay - msSinceDayStart,
	}].filter(d => d.value > 5 * MsPerMinute);
	return (
		<FixedAspectFlexRow aspect={2}>
			<PieChart
				animate
				animationDuration={400}
				data={data}
				label={props => props.dataEntry.title}
				labelPosition={120}
				labelStyle={i => ({
					fontFamily: FontFamilies.Default,
					fontSize: 10, // TODO: adjust font size based on string length and slice angle
					fill: `${data[i].color}b`,
					stroke: data[i].color,
					strokeWidth: .4,
				})}
				lineWidth={70}
				paddingAngle={2}
				radius={35}
				startAngle={-90}
				totalValue={MsPerDay}
			/>
		</FixedAspectFlexRow>
	);
};

export default DailyPieChart;