import dingbian from '@/assets/定边县.json';
import { useEffect } from 'react';
export const useDingbian = (map, AMap) => {
  useEffect(() => {
    if (!map || typeof AMap.Scale !== 'function') return;
    map.setCenter([107.601284, 37.59523]); //定边县中心
    map.add(
      new AMap.GeoJSON({
        geoJSON: dingbian,
        getPolygon: function (geojson, lnglats) {
          const area = AMap.GeometryUtil.ringArea(lnglats[0]);
          return new AMap.Polygon({
            path: lnglats,
            fillOpacity: 1 - Math.sqrt(area / 4000000000), // 面积越大透明度越高
            strokeColor: 'white',
            fillColor: 'red',
          });
        },
      })
    );
  }, [map, AMap]);
};
