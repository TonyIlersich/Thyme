import FixedAspectFlexRow from 'Components/Containers/FixedAspectFlexRow';
import Project from 'Models/Project';
import { PieChart } from 'react-minimal-pie-chart';
import Colors from 'Styles/Colors';
import { FontFamilies } from 'Styles/Fonts';
import { getProjectAccruedDuration } from 'Utils/ProjectUtils';
import { getMsSinceDayStart, MsPerDay } from 'Utils/TimeUtils';

type Props = {
	projects: Project[];
};

const DailyPieChart = (props: Props) => {
	const data = props.projects.map(p => ({
		title: p.name,
		color: '#922', // TODO: use project color
		value: getProjectAccruedDuration(p) + 3600000, // TODO: remove bias when accrued duration is actually calculated
	})).filter(d => d.value > 10000);
	const msSinceDayStart = getMsSinceDayStart();
	data.unshift({
		title: 'Untracked',
		color: Colors.Dark,
		value: msSinceDayStart - data.reduce((sum, d) => sum + d.value, 0),
	});
	data.push({
		title: 'Remaining',
		color: Colors.SuperLight,
		value: MsPerDay - msSinceDayStart,
	})
	return (
		<FixedAspectFlexRow ratio={2}>
			<PieChart
				animate
				animationDuration={400}
				data={data}
				label={props => props.dataEntry.title}
				labelPosition={112}
				labelStyle={i => ({
					fontFamily: FontFamilies.Default,
					fontSize: 10, // TODO: adjust font size based on string length and slice angle
					fill: data[i].color,
				})}
				lineWidth={80}
				paddingAngle={1}
				radius={40}
				startAngle={-90}
				totalValue={MsPerDay}
			/>
		</FixedAspectFlexRow>
	);
};

export default DailyPieChart;