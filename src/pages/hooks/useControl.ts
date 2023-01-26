import { useEffect } from 'react';
export const useControl = (map, AMap) => {
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
  }, [map, AMap]);
};
