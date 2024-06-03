import React from 'react';
import { UserTable } from './components/UserTable';
import 'antd/dist/reset.css';
import './App.css';

const User: React.FC = () => {
  return (
    <div className="App">
      <h1>User Management</h1>
      <UserTable />
    </div>
  );
};

export default User;
