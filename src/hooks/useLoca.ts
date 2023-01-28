import { useEffect } from 'react';
import { Scene, HeatmapLayer } from '@antv/l7';
import { GaodeMap } from '@antv/l7-maps';
export const useLoca = () => {
  useEffect(() => {
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
  }, []);
};
