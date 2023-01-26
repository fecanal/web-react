import React, { useEffect, useState } from 'react';

import '@amap/amap-jsapi-types';
import AMapLoader from '@amap/amap-jsapi-loader';
// import { ChartCard } from '@/components/ChartCard';

import { Header } from '@/components/Header';
import Menu from '@/components/Menu';
import './index.less';
import { useTextMarker } from '../hooks/useTextMarker';
import { useDingbian } from '../hooks/useDingbian';
import { useControl } from '../hooks/useControl';
export const Layout = () => {
  // 【使用script加载】
  // const [AMap] = useState<any>(window.AMap);
  const [AMap, setAMap] = useState<any>();
  // const [Loca] = useState<any>((window as any).Loca)
  const [map, setMap] = useState<AMap.Map>();

  // 地图配置项
  const [mapOptions, setmapOptions] = useState<any>({
    zoom: 10,
    layers: [],
    viewMode: '3D',
    mapStyle: 'amap://styles/dark',
  });
  useTextMarker(map, AMap);
  useDingbian(map, AMap);
  useControl(map, AMap);
  useEffect(() => {
    AMapLoader.load({
      key: '15fbe58993199a0da3baef6b6cf82074',
      version: '2.0',
      plugins: [
        'AMap.Scale',
        'AMap.ToolBar',
        'AMap.MapType',
        'AMap.GeoJSON',
        'AMap.ControlBar',
      ],
      Loca: {
        version: '2.0',
      },
    })
      .then((AMap) => {
        setAMap(AMap);
        setMap(new AMap.Map('map-container', mapOptions));
      })
      .then(() => {
        console.log('loca loaded~');
      });
  }, []);
  useEffect(() => {
    AMap && setMap(new AMap.Map('map-container', mapOptions));
  }, [AMap]);

  // useEffect(() => {
  //   if (!map|| typeof AMap.Scale !=='function') return;
  // }, [map, AMap]);
  return (
    <div className="layout">
      {/* <div className="chart-card">
        <ChartCard />
      </div> */}
      <Header />
      <Menu />
      <div id="map"></div>
      <div id="map-container" />
    </div>
  );
};
