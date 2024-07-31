'use client';
import React, { useState } from 'react';
import { Modal, Form, Input, Button, notification } from 'antd';
import logoImage from '../../../../public/assets/logo.png';
import Image from 'next/image'; 
import { AddIcon, HeaderContainer, Logo } from './style';
import { createAluno } from '@/app/services/api';

const HeaderComponent: React.FC = () => {
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [form] = Form.useForm();

  const handleAddStudent = async (values: { name: string; cpf: string; email: string }) => {
    try {
      const values = await form.validateFields();

      await createAluno(values);
        notification.success({
          message: "Sucesso",
          description: "Aluno criado com sucesso"
      });
      form.resetFields();
      setIsModalVisible(false);
      window.location.reload()
    } catch (error) {
      notification.error({
        message: 'Erro',
        description: 'Falha ao adicionar aluno',
      });
    }
  };

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <HeaderContainer>
      <Logo>
        <Image src={logoImage} alt="Logo" />
      </Logo>
      <AddIcon onClick={showModal} title='Adicionar aluno'/>
      <Modal
        title="Adicionar Aluno"
        open={isModalVisible}
        onCancel={handleCancel}
        footer={null}
      >
        <Form form={form} layout="vertical" onFinish={handleAddStudent}>
          <Form.Item
            name="name"
            label="Nome"
            rules={[{ required: true, message: 'Por favor, insira o nome' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="cpf"
            label="CPF"
            rules={[{ required: true, message: 'Por favor, insira o CPF' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="email"
            label="Email"
            rules={[{ required: true, message: 'Por favor, insira o e-mail' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Adicionar
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </HeaderContainer>
  );
};

export default HeaderComponent;
