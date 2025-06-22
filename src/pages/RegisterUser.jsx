import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import { Alert, Button, Card, Form } from 'react-bootstrap';

export default function RegisterUser() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();
  const { register } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!name || !email || !password || !confirmPassword) {
      return setError('Por favor, preencha todos os campos.');
    }

    if (password !== confirmPassword) {
      return setError('As senhas não coincidem');
    }

    try {
      await register({ name, email, password });
      setSuccess('Cadastro realizado com sucesso! Redirecionando...');
      setTimeout(() => {
        navigate('/login');
      }, 200);
    } catch (error) {
      console.error(error);
      setError('Erro ao cadastrar. Tente novamente.');
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 login-page">
      <Card className="p-4 card-login">
        <h3 className="text-center mb-4">Cadastro</h3>

        {error && <Alert variant="danger">{error}</Alert>}
        {success && <Alert variant="success">{success}</Alert>}

        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Nome</Form.Label>
            <Form.Control
              type="text"
              placeholder="Digite seu nome"
              value={name}
              onChange={(e) => setName(e.target.value)}
              autoFocus
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              placeholder="Digite seu email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoFocus
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Senha</Form.Label>
            <Form.Control
              type="password"
              placeholder="Digite sua senha"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoFocus
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Confirmar senha</Form.Label>
            <Form.Control
              type="password"
              placeholder="Repita a senha"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              autoFocus
            />
          </Form.Group>

          <Button type="submit" variant="primary" className="w-100">
            Cadastrar
          </Button>
          <div className="text-center mt-3">
            <span className='pe-2'>Já tem conta?</span>
            <Link to={'/login'}>Entrar</Link>
          </div>
        </Form>
      </Card>
    </div>
  );
}
