import { Modal } from '@arco-design/web-react';
import React, { useState } from 'react';
interface TProps {
  visible: boolean;
  setVisible: any;
}
export const UserModal: React.FC<TProps> = (props) => {
  const { visible, setVisible } = props;
  return (
    <Modal
      title="Modal Title"
      className="user-modal"
      visible={visible}
      onOk={() => setVisible(false)}
      onCancel={() => setVisible(false)}
      autoFocus={false}
      focusLock={true}
    >
      <p>UserModal</p>
    </Modal>
  );
};
