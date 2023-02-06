import React, { useState } from 'react';
import { Select, Tag } from '@arco-design/web-react';
import './index.less';
import { useHeatMap } from './hooks/useHeatMap';
export const LayerSelector = (props) => {
  const { map, AMap } = props;
  const layers = [
    {
      value: 'rain',
      label: '雨水信息',
    },
    {
      value: 'soil',
      label: '土壤信息',
    },
    {
      value: 'weather',
      label: '天气信息',
    },
  ];
  const [selectLayer, setSelectLayer] = useState<string[]>([]);
  useHeatMap(map, AMap, selectLayer.includes('rain'));
  const onLayerChange = (value) => {
    setSelectLayer(value);
  };
  return (
    <div className="layer-selector">
      <span className="layer-selector-title">图层：</span>
      <Select
        placeholder="请选择"
        style={{ width: 154 }}
        mode="multiple"
        renderTag={(props) => {
          const { label, closable, onClose } = props;
          return (
            <Tag
              closable={closable}
              onClose={onClose}
              style={{ margin: '2px 6px 2px 0' }}
            >
              {label}
            </Tag>
          );
        }}
        onChange={onLayerChange}
      >
        {layers.map(({ label, value }) => (
          <Select.Option key={value} value={value}>
            {label}
          </Select.Option>
        ))}
      </Select>
    </div>
  );
};
