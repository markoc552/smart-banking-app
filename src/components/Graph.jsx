import React from 'react';
import { VictoryLine, VictoryChart, VictoryTheme } from "victory"
const data = [
  { quarter: 1, earnings: 13000 },
  { quarter: 2, earnings: 16500 },
  { quarter: 3, earnings: 14250 },
  { quarter: 4, earnings: 19000 }
];

export default () => {
  return (
    <VictoryChart theme={VictoryTheme.grey} animate={{duration: 500}}>
      <VictoryLine data={data} x="quarter" y="earnings"/>
    </VictoryChart>)
}
