import React, { useEffect, useState } from 'react';

import '@amap/amap-jsapi-types';
import AMapLoader from '@amap/amap-jsapi-loader';

import { Header } from '@/components/Header';
import Menu from '@/components/Menu';
import './index.less';
import { useTextMarker } from '../../hooks/useTextMarker';
import { useDingbian } from '@/hooks/useDingbian';
import { useControl } from '@/hooks/useControl';
import { ChartCard } from '@/components/ChartCard';
import { useClickMenu } from '@/hooks/useClickMenu';
import { usePolygon } from '@/hooks/usePolygon';
import { ChartCards } from '@/components/ChartCards';
import { ControlPanel } from '@/components/ControlPanel';
export const Layout: React.FC = () => {
  // 【使用script加载】
  // const [AMap] = useState<any>(window.AMap);
  const [AMap, setAMap] = useState<any>();
  // const [Loca] = useState<any>((window as any).Loca)
  const [map, setMap] = useState<AMap.Map>();

  // 地图配置项
  const [mapOptions, setMapOptions] = useState<any>({
    zoom: 8.5,
    layers: [],
    viewMode: '3D',
    mapStyle: 'amap://styles/dark',
  });
  // 定边县marker
  useTextMarker(map, AMap);
  // 定边县json
  // useDingbian(map, AMap);
  // 地图侧边工具栏
  useControl(map, AMap);
  // 自定义鼠标右键
  // useClickMenu(map,AMap);
  usePolygon(map, AMap);
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
        'AMap.MouseTool',
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
        // console.log('loca loaded~');
      });
  }, []);
  useEffect(() => {
    AMap && setMap(new AMap.Map('map-container', mapOptions));
  }, [AMap]);

  return (
    <div className="layout">
      <ControlPanel />
      <ChartCards />
      <Header />
      <Menu />
      <div id="map"></div>
      <div id="map-container" />
    </div>
  );
};
