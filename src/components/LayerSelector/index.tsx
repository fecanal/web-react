import React, { useRef, useState } from 'react';
import {
  Button,
  Dropdown,
  Link,
  Menu,
  Select,
  Tag,
  Typography,
} from '@arco-design/web-react';
import { IconApps, IconDesktop, IconDown } from '@arco-design/web-react/icon';
import './index.less';
export default () => {
  const options = ['水文信息', '气象信息', '土壤信息', '集雨窖信息'];
  return (
    <div className="layer-selector">
      <span className="layer-selector-title">图层：</span>
      <Select
        placeholder="请选择"
        style={{ width: 154 }}
        mode="multiple"
        renderTag={(props) => {
          const { label, value, closable, onClose } = props;
          return (
            <Tag
              color={options.indexOf(value) > -1 ? value : 'gray'}
              closable={closable}
              onClose={onClose}
              style={{ margin: '2px 6px 2px 0' }}
            >
              {label}
            </Tag>
          );
        }}
      >
        {options.map((option) => (
          <Select.Option key={option} value={option}>
            {option}
          </Select.Option>
        ))}
      </Select>
    </div>
  );
};
