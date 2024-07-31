import React, { useEffect, useState } from "react";
import { Table, Spin, notification, Button, Modal, Form, Input } from "antd";
import { Container } from "./style";
import { fetchAlunos, createAluno, updateAluno, deleteAluno, Aluno } from '../../services/api';

const { Search } = Input;

const TableComponent: React.FC = () => {
  const [data, setData] = useState<Aluno[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [editingAluno, setEditingAluno] = useState<Aluno | null>(null);
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [isConfirmModalVisible, setIsConfirmModalVisible] = useState<boolean>(false);
  const [selectedAlunoId, setSelectedAlunoId] = useState<string | null>(null);
  const [form] = Form.useForm();
  const [searchTerm, setSearchTerm] = useState<string>("");

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const alunos = await fetchAlunos();
      setData(alunos);
    } catch (error) {
      notification.error({
        message: "Erro",
        description: "Falha ao buscar dados dos alunos",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (selectedAlunoId) {
      try {
        await deleteAluno(selectedAlunoId);
        notification.success({
          message: "Sucesso",
          description: "Aluno deletado com sucesso",
        });
        setIsConfirmModalVisible(false);
        fetchData();
      } catch (error) {
        notification.error({
          message: "Erro",
          description: "Falha ao deletar aluno",
        });
      }
    }
  };

  const showConfirmModal = (id: string) => {
    setSelectedAlunoId(id);
    setIsConfirmModalVisible(true);
  };

  const handleConfirmModalCancel = () => {
    setIsConfirmModalVisible(false);
  };

  const handleEdit = (aluno: Aluno) => {
    setEditingAluno(aluno);
    form.setFieldsValue(aluno);
    setIsModalVisible(true);
  };

  const handleModalOk = async () => {
    try {
      const values = await form.validateFields();
      if (editingAluno?.id) {
        await updateAluno(editingAluno.id, values);
        notification.success({
          message: "Sucesso",
          description: "Aluno atualizado com sucesso",
        });
      } else {
        await createAluno(values);
        notification.success({
          message: "Sucesso",
          description: "Aluno criado com sucesso",
        });
      }
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

  const columns = [
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
          <Button onClick={() => showConfirmModal(record.id)} danger>
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
        <Modal
          title="Confirmar Deleção"
          open={isConfirmModalVisible}
          onOk={handleDelete}
          onCancel={handleConfirmModalCancel}
        >
          <p>Você tem certeza de que deseja deletar este aluno?</p>
        </Modal>
      </Container>
    </>
  );
};

export default TableComponent;
