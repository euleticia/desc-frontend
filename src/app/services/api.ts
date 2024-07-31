import axios, { AxiosResponse } from 'axios';

const API_URL = 'http://localhost:3000/api/alunos';

export interface Aluno {
    id: string;
    name: string;
    cpf: string;
    email: string;
}

export const fetchAlunos = async (): Promise<Aluno[]> => {
    try {
        const response: AxiosResponse<Aluno[]> = await axios.get(API_URL);
        return response.data;
    } catch (error) {
        throw new Error('An error occurred while fetching students');
    }
};

export const createAluno = async (aluno: Aluno): Promise<Aluno> => {
    try {
        const response: AxiosResponse<Aluno> = await axios.post(API_URL, aluno);
        return response.data;
    } catch (error) {
        throw new Error('An error occurred while creating the student');
    }
};

export const updateAluno = async (id: string, aluno: Aluno): Promise<Aluno> => {
    if (!id) {
      throw new Error("ID is required");
    }
    try {
        const response: AxiosResponse<Aluno> = await axios.put(`${API_URL}/${id}`, aluno);
        return response.data;
    } catch (error) {
        throw new Error('An error occurred while updating the student');
    }
};

export const deleteAluno = async (id: string): Promise<void> => {
    try {
        await axios.delete(`${API_URL}/${id}`);
    } catch (error) {
        throw new Error('An error occurred while deleting the student');
    }
};
