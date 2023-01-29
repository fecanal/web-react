import { Modal } from '@arco-design/web-react';
import React, { useState } from 'react';
interface TProps {
  visible: boolean;
  setVisible: any;
}
export const SettingModal: React.FC<TProps> = (props) => {
  const { visible, setVisible } = props;
  return (
    <Modal
      className={'setting-modal'}
      title="Modal Title"
      visible={visible}
      onOk={() => setVisible(false)}
      onCancel={() => setVisible(false)}
      autoFocus={false}
      focusLock={true}
    >
      <p>settingModal</p>
    </Modal>
  );
};
