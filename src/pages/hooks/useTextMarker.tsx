import { formatMapText } from '@/utils';
import dingbian from '@/assets/定边县.json';
import React, { useEffect, useState } from 'react';

import * as echarts from 'echarts';
import { ECharts } from 'echarts';
export const useTextMarker = (map, AMap) => {
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
  // const [echartInstance, setEchartInstance] = useState<ECharts>();

  useEffect(() => {
    if (!map || typeof AMap.Scale !== 'function') return;

    window.closeInfoWindow = () => {
      map.clearInfoWindow();
      // echartInstance.dispose()
    };

    const texts = formatMapText(dingbian);
    const textMarkers = texts.map((text) => {
      const { name, position } = text;
      const marker = new AMap.Text({
        text: name,
        anchor: 'center', // 设置文本标记锚点
        // cursor:'pointer',
        style: {
          'background-color': 'transparent',
          'border-width': 0,
          'font-size': '14px',
          color: 'white',
        },
        position,
      });
      const infoWindow = new AMap.InfoWindow({
        isCustom: true, //使用自定义窗体
        content: `<div class='label-chart-wapper'><span onclick='closeInfoWindow()'>❌</span></div><div id='marker-label-chart-${name}' style='width:500px;height:250px;background:white;'></div>`,
        offset: new AMap.Pixel(36, -45),
      });
      marker.on('click', () => {
        infoWindow.open(map, marker.getPosition());
        const el = document.getElementById(`marker-label-chart-${name}`);
        const myChart = echarts.init(el) as unknown as ECharts;
        myChart?.setOption(option as any);
      });
      return marker;
    });
    map.add(textMarkers);
    map.on('zoomend', () => {
      const zoom = map.getZoom();
      const markers = map.getAllOverlays('text');
      if (zoom < 9.8) {
        map.remove(textMarkers);
      } else if (!markers?.length) {
        map.add(textMarkers);
      }
    });
  }, [map, AMap]);
};
