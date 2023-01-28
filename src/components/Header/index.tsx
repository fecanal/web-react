import { IconSettings, IconUser } from '@arco-design/web-react/icon';
import React from 'react';
import './index.less';
export const Header: React.FC = () => {
  return (
    <div className="header">
      <span className="title">雨水资源监控管理系统</span>
      <div className="config">
        <IconUser />
        <IconSettings />
      </div>
    </div>
  );
};
