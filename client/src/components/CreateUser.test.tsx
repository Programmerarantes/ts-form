
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { describe, it, expect } from 'vitest';
import { BrowserRouter as Router } from 'react-router-dom';
import { CreateUser } from '../components/CreateUser';
import { mock } from '../tests/setup';

describe('CreateUser Component', () => {
  it('should submit form and call backend API', async () => {
    render(
      <Router>
        <CreateUser />
      </Router>
    );

    // Novo usuário fictício para o teste
    const newUser = {
      nome: 'Teste Usuario',
      cpf: '123.456.789-00',
      rg: '12.345.678-9',
      data_nasc: '01/01/1990',
      sexo: 'Masculino',
    };

    // Preencher o formulário com os dados do novo usuário
    fireEvent.change(screen.getByLabelText(/Nome/i), { target: { value: newUser.nome } });
    fireEvent.change(screen.getByLabelText(/CPF/i), { target: { value: newUser.cpf } });
    fireEvent.change(screen.getByLabelText(/RG/i), { target: { value: newUser.rg } });
    fireEvent.change(screen.getByLabelText(/Data de Nascimento/i), { target: { value: newUser.data_nasc } });

    // Simulação do Select (sexo)
    const selectElement = screen.getByLabelText(/Sexo/i);
    if (selectElement) {
      const selectSelector = selectElement.querySelector('.ant-select-selector');
      if (selectSelector) {
        fireEvent.mouseDown(selectSelector);
        const sexOption = screen.getAllByText(newUser.sexo).find(option => option.closest('.ant-select-item'));
        if (sexOption) {
          fireEvent.click(sexOption);
        }
      }
    }

    // Submissão do formulário
    fireEvent.click(screen.getByRole('button', { name: /Enviar/i }));

    // Verificações após a submissão do formulário
    await waitFor(() => {
      console.log('mock.history.post.length:', mock.history.post.length);
      expect(mock.history.post.length).toBe(1);
      expect(mock.history.post[0].data).toEqual(JSON.stringify(newUser));
    });

    expect(screen.getByText('Usuário cadastrado com sucesso')).toBeInTheDocument();
  });
});
