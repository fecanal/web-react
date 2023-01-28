import React, { useEffect, useRef, useState } from 'react';

import * as echarts from 'echarts';
import { ECharts } from 'echarts';

import './index.less';
export const ChartCard: React.FC = () => {
  const chartRef = useRef<HTMLDivElement>(null);
  const [echartInstance, setEchartInstance] = useState<ECharts>();
  const [option] = useState<any>({
    xAxis: {
      type: 'category',
      data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    },
    yAxis: {
      type: 'value',
    },
    series: [
      {
        data: [150, 230, 224, 218, 135, 147, 260],
        type: 'line',
      },
    ],
  });
  useEffect(() => {
    if (chartRef?.current) {
      const myChart = echarts.init(chartRef.current) as unknown as ECharts;
      setEchartInstance(myChart);
      echartInstance?.setOption(option as any);
    }
    // return () => {
    //   echartInstance?.dispose();
    // }
  }, [option, echartInstance]);

  return <div ref={chartRef} className="chart"></div>;
};
