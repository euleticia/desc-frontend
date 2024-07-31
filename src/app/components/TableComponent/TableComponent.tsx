"use client";
import React, { useEffect, useState } from "react";
import { Table, Spin, notification, Button, Modal, Form, Input } from "antd";
import axios from "axios";
import type { ColumnsType } from "antd/es/table";
import { Container } from "./style";

const { Search } = Input;

interface Aluno {
  id: string;
  name: string;
  cpf: string;
  email: string;
}

const TableComponent: React.FC = () => {
  const [data, setData] = useState<Aluno[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [editingAluno, setEditingAluno] = useState<Aluno | null>(null);
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [form] = Form.useForm();
  const [searchTerm, setSearchTerm] = useState<string>("");

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await axios.get("/api/alunos");
      setData(response.data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      notification.error({
        message: "Erro",
        description: "Falha ao buscar dados dos alunos",
      });
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await axios.delete(`/api/alunos/${id}`);
      notification.success({
        message: "Sucesso",
        description: "Aluno deletado com sucesso",
      });
      fetchData();
    } catch (error) {
      notification.error({
        message: "Erro",
        description: "Falha ao deletar aluno",
      });
    }
  };

  const handleEdit = (aluno: Aluno) => {
    setEditingAluno(aluno);
    form.setFieldsValue(aluno);
    setIsModalVisible(true);
  };

  const handleModalOk = async () => {
    try {
      const values = await form.validateFields();
      await axios.put(`/api/alunos/${editingAluno?.id}`, values);
      notification.success({
        message: "Sucesso",
        description: "Aluno atualizado com sucesso",
      });
      setIsModalVisible(false);
      fetchData();
    } catch (error) {
      notification.error({
        message: "Erro",
        description: "Falha ao atualizar aluno",
      });
    }
  };

  const handleModalCancel = () => {
    setIsModalVisible(false);
  };

  const filteredData = data.filter(
    (aluno) =>
      aluno.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      aluno.cpf.includes(searchTerm) ||
      aluno.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const columns: ColumnsType<Aluno> = [
    {
      title: "Nome",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "CPF",
      dataIndex: "cpf",
      key: "cpf",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Ações",
      key: "actions",
      render: (text: string, record: Aluno) => (
        <span>
          <Button onClick={() => handleEdit(record)} style={{ marginRight: 8 }}>
            Editar
          </Button>
          <Button onClick={() => handleDelete(record.id)} danger>
            Deletar
          </Button>
        </span>
      ),
    },
  ];

  if (loading) {
    return <Spin size="large" />;
  }

  return (
    <>
      
      <Container>
      <Search
        placeholder="Buscar por nome, CPF ou email"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        style={{
          margin: 20,
          width: "80%",
          maxWidth: "600px",
        }}
        enterButton
      />
        <Table
          dataSource={filteredData}
          columns={columns}
          rowKey="id"
          style={{ width: "80%", margin: "20px" }}
        />
        <Modal
          title="Editar Aluno"
          open={isModalVisible}
          onOk={handleModalOk}
          onCancel={handleModalCancel}
        >
          <Form form={form} layout="vertical">
            <Form.Item
              name="name"
              label="Nome"
              rules={[{ required: true, message: "Por favor, insira o nome" }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="cpf"
              label="CPF"
              rules={[{ required: true, message: "Por favor, insira o CPF" }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="email"
              label="Email"
              rules={[
                { required: true, message: "Por favor, insira o e-mail" },
              ]}
            >
              <Input />
            </Form.Item>
          </Form>
        </Modal>
      </Container>
    </>
  );
};

export default TableComponent;
