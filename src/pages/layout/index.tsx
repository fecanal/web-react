import React, { useEffect, useState } from 'react';
import './index.less';
import '@amap/amap-jsapi-types';
import AMapLoader from '@amap/amap-jsapi-loader';
import { ChartCard } from '@/components/ChartCard';
export const Layout = () => {
  const [AMap, setAMap] = useState<any>();
  const [map, setMap] = useState<AMap.Map>();

  // 地图配置项
  const [mapOptions, setmapOptions] = useState<AMap.MapOptions>({
    zoom: 13,
    layers: [],
    center: [116.397428, 39.90923],
  });

  // 加载高德地图
  useEffect(() => {
    AMapLoader.load({
      key: '15fbe58993199a0da3baef6b6cf82074',
      version: '2.0',
      plugins: ['AMap.Scale', 'AMap.ToolBar', 'AMap.MapType'],
    })
      .then((AMap) => {
        setAMap(AMap);
        setMap(new AMap.Map('map-container', mapOptions));
      })
      .catch((e) => {
        console.error(e);
      });
  }, []);

  // 初始化map
  useEffect(() => {
    if (map) {
      map.addControl(new AMap.Scale());
      map.addControl(new AMap.ToolBar());
      map.add(
        new AMap.Marker({
          position: map.getCenter(),
        })
      );
      map.addControl(new AMap.MapType());
    }
  }, [map]);

  // 更新图层
  useEffect(() => {
    AMap && setMap(new AMap.Map('map-container', mapOptions));
  }, [mapOptions]);

  return (
    <div className="layout">
      <div className="chart-card">
        <ChartCard />
      </div>
      <div id="map-container" />
    </div>
  );
};
