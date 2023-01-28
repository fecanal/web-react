import { formatMapText } from '@/utils';
import dingbian from '@/assets/定边县.json';
import React, { useEffect, useState } from 'react';

import * as echarts from 'echarts';
import { ECharts } from 'echarts';
import { useClickMenu } from './useClickMenu';
export const useTextMarker = (map, AMap) => {
  const [infoWindowOpen, setInfoWindowOpen] = useState(new Map());
  const { menu } = useClickMenu(map, AMap);
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
  const initInfoWindowOpen = (texts) => {
    texts.forEach((text) => {
      setInfoWindowOpen((state) => state.set(text.name, false));
    });
  };
  const diyOption = (option, name) => {
    return {
      ...option,
      title: {
        text: name,
      },
    };
  };
  useEffect(() => {
    if (!map || typeof AMap.Scale !== 'function') return;

    window.closeInfoWindow = () => {
      map.clearInfoWindow();
    };

    const texts = formatMapText(dingbian);
    initInfoWindowOpen(texts);
    const textMarkers = texts.map((text) => {
      const { name, position } = text;
      const marker = new AMap.Marker({
        position,
      });
      const infoWindow = new AMap.InfoWindow({
        isCustom: true, //使用自定义窗体
        content: `<div class='label-chart-wapper'><span onclick='closeInfoWindow()'>❌</span></div><div id='marker-label-chart-${name}' style='width:500px;height:250px;background:white;'></div>`,
        offset: new AMap.Pixel(36, -45),
      });
      marker.on('click', () => {
        if (infoWindowOpen.get(name)) {
          map.clearInfoWindow();
          infoWindowOpen.set(name, false);
          return;
        }
        infoWindow.open(map, marker.getPosition());
        infoWindowOpen.set(name, true);
        const el = document.getElementById(`marker-label-chart-${name}`);
        const myChart = echarts.init(el) as unknown as ECharts;
        // 特殊处理每一个marker的option
        const op = diyOption(option, name);
        myChart?.setOption(op as any);
      });
      marker.on('rightclick', (e) => {
        menu.contextMenu.open(map, e.lnglat);
        menu.contextMenuPositon = e.lnglat; //右键菜单位置
      });
      return marker;
    });
    map.add(textMarkers);
    map.on('zoomend', () => {
      const zoom = map.getZoom();
      const markers = map.getAllOverlays('text');
      if (zoom < 8) {
        map.remove(textMarkers);
      } else if (!markers?.length) {
        map.add(textMarkers);
      }
    });
  }, [map, AMap]);
};
