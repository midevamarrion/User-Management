import React, { useState } from 'react';
import { Table, Button, Space } from 'antd';
import { UserForm } from './UserForm';
import { useUsers } from '../hooks/useUsers';

export const UserTable: React.FC = () => {
  const { users, addUser, updateUser, deleteUser, isEmailUsed } = useUsers();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [currentUser, setCurrentUser] = useState<{ id: string; name: string; email: string } | undefined>(undefined);

  const handleAddUser = () => {
    setCurrentUser(undefined);
    setIsModalVisible(true);
  };

  const handleEditUser = (user: { id: string; name: string; email: string }) => {
    setCurrentUser(user);
    setIsModalVisible(true);
  };

  const handleDeleteUser = (id: string) => {
    deleteUser(id);
  };

  const handleFormSubmit = (user: { name: string; email: string }) => {
    if (currentUser) {
      updateUser({ ...currentUser, ...user });
    } else {
      addUser(user);
    }
    setIsModalVisible(false);
  };

  const handleFormCancel = () => {
    setIsModalVisible(false);
  };

  const columns = [
    { title: 'ID', dataIndex: 'id', key: 'id' },
    { title: 'Name', dataIndex: 'name', key: 'name' },
    { title: 'Email', dataIndex: 'email', key: 'email' },
    {
      title: 'Action',
      key: 'action',
      render: (_: any, record: { id: string; name: string; email: string }) => (
        <Space size="middle">
          <Button
            onClick={() => handleEditUser(record)}
            style={{ backgroundColor: '#0790fc', color: '#fff', borderColor: '#0790fc' }}
          >
            Edit
          </Button>
          <Button
            onClick={() => handleDeleteUser(record.id)}
            danger
            style={{ backgroundColor: '#f5222d', color: '#fff', borderColor: '#f5222d' }}
          >
            Delete
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <div>
      <Button
        type="primary"
        onClick={handleAddUser}
        style={{ marginBottom: 16, backgroundColor: '#0790fc', borderColor: '#0790fc' }}
      >
        Add User
      </Button>
      <Table columns={columns} dataSource={users} rowKey="id" />
      <UserForm
        visible={isModalVisible}
        onSubmit={handleFormSubmit}
        onCancel={handleFormCancel}
        initialValues={currentUser}
        isEmailUsed={isEmailUsed}
      />
    </div>
  );
};
