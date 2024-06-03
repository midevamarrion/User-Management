import React, { useEffect } from 'react';
import { Button, Form, Input, Modal } from 'antd';

type UserFormProps = {
  visible: boolean;
  onSubmit: (user: { name: string; email: string }) => void;
  onCancel: () => void;
  initialValues?: { id: string; name: string; email: string }; 
  isEmailUsed: (email: string, excludeUserId?: string) => boolean; 
};

export const UserForm: React.FC<UserFormProps> = ({
  visible,
  onSubmit,
  onCancel,
  initialValues,
  isEmailUsed, 
}) => {
  const [form] = Form.useForm();

  useEffect(() => {
    if (visible) {
      form.resetFields();
      if (initialValues) {
        form.setFieldsValue(initialValues);
      }
    }
  }, [visible, initialValues, form]);

  const handleFinish = (values: { name: string; email: string }) => {
    onSubmit(values);
  };

  return (
    <Modal
      visible={visible}
      title={initialValues ? 'Edit User' : 'Add User'}
      onCancel={onCancel}
      footer={[
        <Button key="cancel" onClick={onCancel}>
          Cancel
        </Button>,
        <Button key="submit" type="primary" onClick={() => form.submit()}>
          {initialValues ? 'Update' : 'Add'}
        </Button>,
      ]}
    >
      <Form
        form={form}
        onFinish={handleFinish}
        layout="vertical"
        initialValues={initialValues}
      >
        <Form.Item
          name="name"
          label="Name"
          rules={[{ required: true, message: 'Please input the name!' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="email"
          label="Email"
          rules={[
            { required: true, message: 'Please input the email!' },
            { type: 'email', message: 'Please enter a valid email!' },
            {
              validator: (_, value) =>
                !value || !isEmailUsed(value, initialValues?.id)
                  ? Promise.resolve()
                  : Promise.reject(new Error('This email is already used!')),
            },
          ]}
        >
          <Input />
        </Form.Item>
      </Form>
    </Modal>
  );
};
