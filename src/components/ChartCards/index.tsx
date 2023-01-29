import React from 'react';
import { ChartCard } from '@/components/ChartCard';
import './index.less';
export const ChartCards: React.FC = () => {
  return (
    <div className="chart-cards">
      <div className="chart-cards-left">
        <ChartCard />
        <ChartCard />
        <ChartCard />
        <ChartCard />
        <ChartCard />
        <ChartCard />
        <ChartCard />
        <ChartCard />
      </div>
      <div className="chart-cards-right">
        <ChartCard />
        <ChartCard />
        <ChartCard />
        <ChartCard />
        <ChartCard />
        <ChartCard />
        <ChartCard />
        <ChartCard />
      </div>
    </div>
  );
};
