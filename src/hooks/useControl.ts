import { useRequest } from '@/api/request';
import { useEffect } from 'react';
export const useControl = (map, AMap) => {
  const { run } = useRequest('rain');
  useEffect(() => {
    if (!map || typeof AMap.Scale !== 'function') return;
    // map.addControl(new AMap.Scale());
    // map.addControl(
    //   new AMap.ControlBar({
    //     position: {
    //       right: '30px',
    //       top: '3%',
    //     },
    //     showControlButton: true, // 是否显示倾斜、旋转按钮。默认为 true
    //   })
    // );
    // map.addControl(new AMap.MapType({
    //   position: {
    //     right: '130px',
    //     top: '3%',
    //   },
    // }));
    // run({}).then((res) => {
    //   console.log({ res });
    // });
  }, [map, AMap]);
};
