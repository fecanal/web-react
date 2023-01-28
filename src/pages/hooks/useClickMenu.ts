import { useEffect, useState } from 'react';

export const useClickMenu = (map, AMap) => {
  class ContextMenu {
    mouseTool: any;
    contextMenuPositon: any;
    content: any[];
    contextMenu: any;
    constructor(map) {
      this.mouseTool = new AMap.MouseTool(map);
      this.contextMenuPositon = null;
      this.content = [];
      this.content.push("<div class='info context_menu'>");
      this.content.push("  <p onclick='menu.zoomMenu(0)'>缩小</p>");
      this.content.push(
        "  <p class='split_line' onclick='menu.zoomMenu(1)'>放大</p>"
      );
      this.content.push(
        "  <p class='split_line' onclick='menu.distanceMeasureMenu()'>距离量测</p>"
      );
      this.content.push("  <p onclick='menu.addMarkerMenu()'>添加标记</p>");
      this.content.push('</div>');
      this.contextMenu = new AMap.ContextMenu({
        isCustom: true,
        content: this.content.join(''),
      });
    }
    //右键菜单缩放地图
    zoomMenu(tag) {
      if (tag === 0) {
        map.zoomOut();
      }
      if (tag === 1) {
        map.zoomIn();
      }
      this.contextMenu.close();
    }
    //右键菜单距离量测
    distanceMeasureMenu() {
      this.mouseTool.rule();
      this.contextMenu.close();
    }
    //右键菜单添加Marker标记
    addMarkerMenu() {
      this.mouseTool.close();
      const marker = new AMap.Marker({
        map: map,
        position: this.contextMenuPositon || map.getCenter(), //基点位置
      });
      this.contextMenu.close();
    }
  }

  const [menu, setMenu] = useState<any>();
  useEffect(() => {
    if (!map || typeof AMap.Scale !== 'function') return;
    const menu = new ContextMenu(map);
    setMenu(menu);
    // map.on('rightclick', (e)=> {
    //   menu.contextMenu.open(map, e.lnglat);
    //   menu.contextMenuPositon = e.lnglat; //右键菜单位置
    // });
  }, [map, AMap]);
  return {
    menu,
  };
};
