import React, {useState} from 'react';
import { DownOutlined, SmileOutlined } from '@ant-design/icons';
import { Dropdown, Space } from 'antd';
import "./Clock.css";
function Clock({setMinutes}){
  const [min, setMin] = useState(0);
  const items = [
    {
      key: '1',
      label: (
        <div onClick={() => {setMinutes(0); setMin(0)}} className={min==0 ? 'selected-time' : 'not-selected-time'}>
          00 Minutes
        </div>
      ),
    },
    {
      key: '2',
      label: (
        <div onClick={() => {setMinutes(15); setMin(15)}} className={min==15 ? 'selected-time' : 'not-selected-time'}>
          15 Minutes
        </div>
      ),
    },
    {
      key: '3',
      label: (
        <div onClick={() => {setMinutes(30); setMin(30)}} className={min==30 ? 'selected-time' : 'not-selected-time'}>
          30 Minutes
        </div>
      ),
    },
    {
      key: '4',
      label: (
        <div onClick={() => {setMinutes(45); setMin(45)}} className={min==45 ? 'selected-time' : 'not-selected-time'}>
          45 Minutes
        </div>
      ),
    },
  ];
    return (
    <Dropdown
      menu={{
        items,
      }}
      className='main-header-dropdown-time mt-8 min-w-min min-h-min'
    >
      <a onClick={(e) => e.preventDefault()}>
        <Space>
          {min} Minutes
          <DownOutlined />
        </Space>
      </a>
    </Dropdown>
  );
}
export default Clock;