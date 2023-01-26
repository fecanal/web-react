import { formatMapText } from '@/utils';
import { useEffect } from 'react';
import dingbian from '@/assets/定边县.json';
export const useTextMarker = (map, AMap) => {
  useEffect(() => {
    if (!map || typeof AMap.Scale !== 'function') return;
    const texts = formatMapText(dingbian);
    const textMarkers = texts.map((text) => {
      const { name, position } = text;
      return new AMap.Text({
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
    });
    map.add(textMarkers);
    map.on('zoomend', () => {
      const zoom = map.getZoom();
      const markers = map.getAllOverlays('text');
      console.log(markers);
      if (zoom < 9.8) {
        map.remove(textMarkers);
      } else if (!markers?.length) {
        map.add(textMarkers);
      }
    });
  }, [map, AMap]);
};
