import React from 'react';
import { Menu } from '@arco-design/web-react';
import { IconApps, IconDesktop } from '@arco-design/web-react/icon';
import './index.less';
export default () => {
  return (
    <div className="rain-menu">
      <Menu className="rain-menu-content" mode="pop" hasCollapseButton>
        <Menu.Item key="1">
          <IconApps />
          首页
        </Menu.Item>
        <Menu.SubMenu
          key="2"
          title={
            <>
              <IconDesktop />
              数据统计
            </>
          }
        >
          <Menu.Item key="1-1">气象信息</Menu.Item>
          <Menu.Item key="1-2">永寿县</Menu.Item>
        </Menu.SubMenu>
      </Menu>
    </div>
  );
};
