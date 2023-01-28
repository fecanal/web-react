import { useEffect } from 'react';
import dingbian from '@/assets/定边县.json';
import { formatJsonToPolygon } from '@/utils';
export const usePolygon = (map, AMap) => {
  useEffect(() => {
    if (!map || typeof AMap.Scale !== 'function') return;
    const res = formatJsonToPolygon(dingbian);
    map.setCenter([107.601284, 37.59523]); //定边县中心

    const polygon = new AMap.Polygon({
      path: res.data,
      fillColor: '#ccebc5',
      strokeOpacity: 1,
      fillOpacity: 0.5,
      strokeColor: '#2b8cbe',
      strokeWeight: 1,
      strokeStyle: 'dashed',
      strokeDasharray: [5, 5],
    });
    map.add(polygon);
  }, [map, AMap]);
};
