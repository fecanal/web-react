import { IconSettings, IconUser } from '@arco-design/web-react/icon';
import React, { useState } from 'react';
import { SettingModal } from '../SettingModal';
import { UserModal } from '../UserModal';
import './index.less';
export const Header: React.FC = () => {
  const [userModalVisiable, setUserModalVisiable] = useState(false);
  const [settingModalVisiable, setSettingModalVisiable] = useState(false);
  return (
    <div className="header">
      <span className="title">雨水资源监控管理系统</span>
      <div className="config">
        <IconUser onClick={() => setUserModalVisiable(true)} />
        <IconSettings onClick={() => setSettingModalVisiable(true)} />
      </div>
      <UserModal
        visible={userModalVisiable}
        setVisible={setUserModalVisiable}
      />
      <SettingModal
        visible={settingModalVisiable}
        setVisible={setSettingModalVisiable}
      />
    </div>
  );
};
