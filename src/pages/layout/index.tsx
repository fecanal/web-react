import React, { useEffect, useState } from 'react';

import '@amap/amap-jsapi-types';
import AMapLoader from '@amap/amap-jsapi-loader';
// import { ChartCard } from '@/components/ChartCard';
import { Scene, HeatmapLayer } from '@antv/l7';
import { GaodeMap } from '@antv/l7-maps';
import dingbian from '@/assets/定边县.json';
import { Header } from '@/components/Header';
import Menu from '@/components/Menu';
import './index.less';
export const Layout = () => {

  // 【使用script加载】
  // const [AMap] = useState<any>(window.AMap);
  const [AMap, setAMap] = useState<any>();
  // const [Loca] = useState<any>((window as any).Loca)
  const [map, setMap] = useState<AMap.Map>();

  // 地图配置项
  const [mapOptions, setmapOptions] = useState<any>({
    zoom: 9,
    layers: [],
    viewMode: '3D',
    mapStyle: 'amap://styles/dark',
  });

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
      .then((loca) => {
        console.log('loca', loca);
      });
  }, []);
  useEffect(() => {
    // 【使用script加载】
    // setMap(new window.AMap.Map('map-container', mapOptions))
    AMap && setMap(new AMap.Map('map-container', mapOptions));
  }, [AMap]);

  // 初始化map
  useEffect(() => {
    if (!map|| typeof AMap.Scale !=='function') return;
    map.addControl(new AMap.Scale());
    map.setCenter([107.601284, 37.59523]); //定边县中心
    map.add(
      new AMap.GeoJSON({
        geoJSON: dingbian,
        getPolygon: function (geojson, lnglats) {
          const area = AMap.GeometryUtil.ringArea(lnglats[0]);
          return new AMap.Polygon({
            path: lnglats,
            fillOpacity: 1 - Math.sqrt(area / 8000000000), // 面积越大透明度越高
            strokeColor: 'white',
            fillColor: 'red',
          });
        },
      })
    );
    map.addControl(
      new AMap.ControlBar({
        position: {
          right: '20px',
          top: '85%',
        },
        showControlButton: true, // 是否显示倾斜、旋转按钮。默认为 true
      })
    );
    map.addControl(new AMap.MapType());

    const scene = new Scene({
      id: 'map',
      map: new GaodeMap({
        style: 'dark',
        center: [127.5671666579043, 7.445038892195569],
        zoom: 2.632456779444394,
      }),
    });

    scene.on('loaded', () => {
      fetch(
        'https://gw.alipayobjects.com/os/basement_prod/d3564b06-670f-46ea-8edb-842f7010a7c6.json'
      )
        .then((res) => res.json())
        .then((data) => {
          const layer = new HeatmapLayer({})
            .source(data)
            .shape('heatmap')
            .size('mag', [0, 1.0]) // weight映射通道
            .style({
              intensity: 2,
              radius: 20,
              rampColors: {
                colors: [
                  '#FF4818',
                  '#F7B74A',
                  '#FFF598',
                  '#F27DEB',
                  '#8C1EB2',
                  '#421EB2',
                ].reverse(),
                positions: [0, 0.2, 0.4, 0.6, 0.8, 1.0],
              },
            });
          scene.addLayer(layer);
        });
    });

    // 【使用script加载】

    // 基于AMap实例创建Loca容器s
    // const loca = new Loca.Container({
    //   map,
    // });
    // Demo：红色呼吸点
    // const geoLevelF = new Loca.GeoJSONSource({
    //   url: 'https://a.amap.com/Loca/static/loca-v2/demos/mock_data/sz_road_F.json',
    // });
    // const breathRed = new Loca.ScatterLayer({
    //   loca,
    //   zIndex: 113,
    //   opacity: 1,
    //   visible: true,
    //   zooms: [2, 22],
    // });
    // breathRed.setSource(geoLevelF);
    // breathRed.setStyle({
    //   unit: 'meter',
    //   size: [2600, 2600],
    //   borderWidth: 0,
    //   texture: 'https://a.amap.com/Loca/static/loca-v2/demos/images/breath_red.png',
    //   duration: 500,
    //   animate: true,
    // });
    // loca.animate.start();
    // const dat = new Loca.Dat();
    // dat.addLayer(breathRed, '红色');
  }, [map, AMap]);
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
