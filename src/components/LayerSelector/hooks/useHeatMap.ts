import { useEffect, useMemo } from 'react';
import heatMapData from './heatMapData.json';

// 热力图不同颜色可以用来展示温度 or 降雨量
export const useHeatMap = (map, AMap, visiable) => {
  const heatmap = useMemo(() => {
    if (!map || typeof AMap.Scale !== 'function') return;
    return new AMap.HeatMap(map, {
      radius: 25,
      opacity: [0, 0.8],
      visiable: 1,
      gradient: {
        0.5: 'lightblue',
        0.65: 'rgb(117,211,248)',
        0.7: 'rgb(0, 255, 0)',
        0.9: '#ffea00',
        1.0: 'blue',
      },
    });
  }, [map, AMap]);

  useEffect(() => {
    if (visiable) {
      heatmap?.setDataSet({
        data: heatMapData,
        max: 100,
      });
    } else {
      console.log({ visiable });
      heatmap?.setDataSet({
        data: [],
      });
    }
  }, [map, AMap, visiable, heatmap]);
  return {};
};
