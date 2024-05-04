import React, {useContext, useState} from 'react';
import { DownOutlined, SmileOutlined } from '@ant-design/icons';
import { Dropdown, Space } from 'antd';
import { ThemeContext } from '../../App';
import { Context }from "../../utils/Context.js";
import "./Collection.css";
function Collection({collections, setCollections}){
  const items = [
    {
      key: '1',
      label: (
        <div onClick={() => {
            localStorage.setItem("collectionName", 'hk_motion_table');
            setCollections('hk_motion_table');
          }} 
          className={collections=='hk_motion_table' ? 'selected-collections' : 'not-selected-collections'}>
          hk_motion_table
        </div>
      ),
    },
    {
        key: '2',
        label: (
          <div onClick={() => {
              localStorage.setItem("collectionName", 'hk_motion_table_0');
              setCollections('hk_motion_table');
            }} 
            className={collections=='hk_motion_table_0' ? 'selected-collections' : 'not-selected-collections'}>
            hk_motion_table_0
          </div>
        ),
      },
    {
        key: '4',
        label: (
          <div onClick={() => {
              localStorage.setItem("collectionName", 'hk_motion_table_6');
              setCollections('hk_motion_table_6');
            }} 
            className={collections=='hk_motion_table_6' ? 'selected-collections' : 'not-selected-collections'}>
            hk_motion_table_6
          </div>
        ),
    },
    {
        key: '5',
        label: (
          <div onClick={() => {
              localStorage.setItem("collectionName", 'hk_motion_table_7');
              setCollections('hk_motion_table_7');
            }} 
            className={collections=='hk_motion_table_7' ? 'selected-collections' : 'not-selected-collections'}>
            hk_motion_table_7
          </div>
        ),
    },
    {
        key: '6',
        label: (
          <div onClick={() => {
              localStorage.setItem("collectionName", 'hk_motion_table_8');
              setCollections('hk_motion_table_8');
            }} 
            className={collections=='hk_motion_table_8' ? 'selected-collections' : 'not-selected-collections'}>
            hk_motion_table_8
          </div>
        ),
    },
    {
        key: '7',
        label: (
          <div onClick={() => {
              localStorage.setItem("collectionName", 'hk_motion_table_9');
              setCollections('hk_motion_table_9');
            }} 
            className={collections=='hk_motion_table_9' ? 'selected-collections' : 'not-selected-collections'}>
            hk_motion_table_9
          </div>
        ),
    },
    {
        key: '8',
        label: (
          <div onClick={() => {
              localStorage.setItem("collectionName", 'hk_motion_table_10');
              setCollections('hk_motion_table_10');
            }} 
            className={collections=='hk_motion_table_10' ? 'selected-collections' : 'not-selected-collections'}>
            hk_motion_table_10
          </div>
        ),
    },
    {
        key: '9',
        label: (
          <div onClick={() => {
              localStorage.setItem("collectionName", 'hk_motion_table_11');
              setCollections('hk_motion_table_11');
            }} 
            className={collections=='hk_motion_table_11' ? 'selected-collections' : 'not-selected-collections'}>
            hk_motion_table_11
          </div>
        ),
    },
    {
        key: '10',
        label: (
          <div onClick={() => {
              localStorage.setItem("collectionName", 'hk_motion_table_12');
              setCollections('hk_motion_table_12');
          }} 
          className={collections=='hk_motion_table_12' ? 'selected-collections' : 'not-selected-collections'}>
            hk_motion_table_12
          </div>
        ),
    },
    {
        key: '11',
        label: (
          <div onClick={() => {
              localStorage.setItem("collectionName", 'hk_motion_table_13');
              setCollections('hk_motion_table_13');
            }} 
            className={collections=='hk_motion_table_13' ? 'selected-collections' : 'not-selected-collections'}>
            hk_motion_table_13
          </div>
        ),
    },
    {
        key: '12',
        label: (
          <div onClick={() => {
              localStorage.setItem("collectionName", 'hk_motion_table_15');
              setCollections('hk_motion_table_15');
            }} 
            className={collections=='hk_motion_table_15' ? 'selected-collections' : 'not-selected-collections'}>
            hk_motion_table_15
          </div>
        ),
    },
    {
        key: '13',
        label: (
          <div onClick={() => {
              localStorage.setItem("collectionName", 'hk_motion_table_17');
              setCollections('hk_motion_table_17');
            }} 
            className={collections=='hk_motion_table_17' ? 'selected-collections' : 'not-selected-collections'}>
            hk_motion_table_17
          </div>
        ),
    },
    {
        key: '14',
        label: (
          <div onClick={() => {
              localStorage.setItem("collectionName", 'hk_motion_table_18');
              setCollections('hk_motion_table_18');
            }} 
            className={collections=='hk_motion_table_18' ? 'selected-collections' : 'not-selected-collections'}>
            hk_motion_table_18
          </div>
        ),
    },
  ];
    return (
    <Dropdown
      menu={{
        items,
      }}
      className='main-header-dropdown-collections mt-8 min-w-min min-h-min'
    >
      <a onClick={(e) => e.preventDefault()}>
        <Space>
           {collections}
          <DownOutlined />
        </Space>
      </a>
    </Dropdown>
  );
}
export default Collection;