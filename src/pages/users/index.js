import React from 'react';
import {DatePicker} from 'antd';
import classNames from 'classnames/bind';
import styles from '#styles/users.module.css';

const cx = classNames.bind(styles);

const Users = () => {
  return (
    <div
      onClick={e => {
        prompt('????');
      }}
      className={cx({user: true})}>
      users
      <DatePicker />
    </div>
  );
};

export default Users;
