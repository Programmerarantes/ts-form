// tests/setup.ts
import { vi } from 'vitest';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';


const mock = new MockAdapter(axios);
mock.onPost('http://localhost:4000/users').reply(201, {
  id: 1,
  nome: 'John Doe',
  cpf: '123.456.789-00',
  data_nasc: '01/01/1990',
  rg: '12.345.678-9',
  sexo: 'Masculino',
});

export { mock };


vi.mock('react-router-dom', () => ({
  useNavigate: () => vi.fn(),
}));


vi.mock('antd', () => {
  const antd = jest.requireActual('antd');
  return {
    ...antd,
    message: {
      success: vi.fn(),
      error: vi.fn(),
    },
  };
});

Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: vi.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(), 
    removeListener: vi.fn(), 
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
});
