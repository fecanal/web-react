import React, { useRef } from 'react';
export const useChart = () => {
  const chartRef = useRef<HTMLDivElement>(null);

  return {
    chartRef,
  };
};
