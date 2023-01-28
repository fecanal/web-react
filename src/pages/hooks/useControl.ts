import { useRequest } from '@/api/request';
import { useEffect } from 'react';
export const useControl = (map, AMap) => {
  const { run } = useRequest('rain');
  useEffect(() => {
    if (!map || typeof AMap.Scale !== 'function') return;
    map.addControl(new AMap.Scale());
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
    run({}).then((res) => {
      console.log({ res });
    });
  }, [map, AMap]);
};
