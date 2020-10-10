import CanvasJSReact from './canvasjs.react';
var React = require('react');
var Component = React.Component;
var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;
var $ = require('jquery');

var totalVisitors = 829500;

var visitorsDrilldownedChartOptions = {
	animationEnabled: true,
	theme: "light2",
	axisY: {
		gridThickness: 0,
		includeZero: false,
		lineThickness: 1
	},
	data: []
};

var newVSReturningVisitorsOptions = {
	animationEnabled: true,
	theme: "light2",
	legend: {
		fontFamily: "calibri",
		fontSize: 12,
		itemTextFormatter: function (e) {
			return e.dataPoint.name + ": " + Math.round(e.dataPoint.y / totalVisitors * 100) + "%";
		}
	},
	data: []
};

class App extends Component {
	constructor() {
		super();
		this.options = {};
		this.visitorsChartDrilldownHandler = this.visitorsChartDrilldownHandler.bind(this);
	}

	visitorsChartDrilldownHandler(e) {
		var chart = this.chart;
		chart.options = visitorsDrilldownedChartOptions;
		chart.options.data = this.options[e.dataPoint.name];
		chart.options.title = { text: e.dataPoint.name }
		chart.render();
		$("#backButton").toggleClass("invisible");
	}

	render() {
		this.options = {
      height: 320,
			"New vs Returning Visitors": [{
				click: this.visitorsChartDrilldownHandler,
				cursor: "pointer",
				explodeOnClick: false,
				innerRadius: "75%",
				legendMarkerType: "square",
				name: "Deposit status",
				radius: "80%",
				showInLegend: true,
				startAngle: 90,
				type: "doughnut",
				dataPoints: [
					{ y: 522460, name: "Deposit", color: "#E7823A" },
					{ y: 307040, name: "Withdraw", color: "#546BC1" }
				]
			}],
			"Deposit": [{
				color: "#E7823A",
				name: "Deposit",
				type: "column",
				dataPoints: [
					{ x: new Date("1 Jan 2017"), y: 37000 },
					{ x: new Date("1 Feb 2017"), y: 39960 },
					{ x: new Date("1 Mar 2017"), y: 41160 },
					{ x: new Date("1 Apr 2017"), y: 42240 },
					{ x: new Date("1 May 2017"), y: 42200 },
					{ x: new Date("1 Jun 2017"), y: 43600 },
					{ x: new Date("1 Jul 2017"), y: 45560 },
					{ x: new Date("1 Aug 2017"), y: 47280 },
					{ x: new Date("1 Sep 2017"), y: 48800 },
					{ x: new Date("1 Oct 2017"), y: 52720 },
					{ x: new Date("1 Nov 2017"), y: 56840 },
					{ x: new Date("1 Dec 2017"), y: 58400 }
				]
			}],
			"Withdraw": [{
				color: "#546BC1",
				name: "Withdraw",
				type: "column",
				dataPoints: [
					{ x: new Date("1 Jan 2017"), y: 19000 },
					{ x: new Date("1 Feb 2017"), y: 21040 },
					{ x: new Date("1 Mar 2017"), y: 21840 },
					{ x: new Date("1 Apr 2017"), y: 22760 },
					{ x: new Date("1 May 2017"), y: 24800 },
					{ x: new Date("1 Jun 2017"), y: 24400 },
					{ x: new Date("1 Jul 2017"), y: 25440 },
					{ x: new Date("1 Aug 2017"), y: 27720 },
					{ x: new Date("1 Sep 2017"), y: 27200 },
					{ x: new Date("1 Oct 2017"), y: 29280 },
					{ x: new Date("1 Nov 2017"), y: 31160 },
					{ x: new Date("1 Dec 2017"), y: 32400 }
				]
			}]
		}
		const buttonStyle={
			bordeRadius: '4px',
			padding: '8px',
			border: 'none',
			fontSize: '10px',
			backgroundColor: '#2eacd1',
			color: 'white',
			position: 'absolute',
			top: '10px',
			right: '10px',
			cursor: 'pointer'
		}
		return (
		<div>
			<CanvasJSChart options = {this.options}
				 onRef={ref => this.chart = ref}
			/>
			<button className="btn invisible" id="backButton" style={buttonStyle}>&lt; Back</button>
		</div>
		);
	}

	componentDidMount(){
		var chart = this.chart;
		var options = this.options
			chart.options = newVSReturningVisitorsOptions;
			chart.options.data = options["New vs Returning Visitors"];
			chart.render();

		$("#backButton").click(function() {
			$(this).toggleClass("invisible");
			chart.options = newVSReturningVisitorsOptions;
			chart.options.data = options["New vs Returning Visitors"];
			chart.render();
		});
	}
}

export default App;