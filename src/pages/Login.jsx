import { Link, useNavigate } from 'react-router';
import useAuth from '../hooks/useAuth';
import { useState } from 'react';
import { Alert, Button, Card, Form } from 'react-bootstrap';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    if (!email || !password) {
      return setError('Por favor, preencha todos os campos.');
    }

    try {
      await login({ email, password });
      navigate('/');
    } catch (error) {
      console.error(error);
      setError('Erro ao fazer login. Tente novamente mais tarde.');
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 login-page">
      <Card className="p-4 shadow-sm w-100 w-sm-75 w-md-50 w-lg-40 card-login">
        <h3 className="text-center mb-4">Login</h3>

        {error && <Alert variant="danger">{error}</Alert>}

        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="formEmail" className="mb-3">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              placeholder="Digite seu email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoFocus
            />
          </Form.Group>

          <Form.Group controlId="formPassword" className="mb-3">
            <Form.Label>Senha</Form.Label>
            <Form.Control
              type="password"
              placeholder="Digite sua senha"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Group>
          <div className="text-end mb-4">
            <Link to={'/reset-password'}>Esqueceu a senha?</Link>
          </div>
          <Button variant="primary" type="submit" className="w-100">
            Entrar
          </Button>
          <div className="text-center mt-3">
            <span className='pe-2'>Não tem uma conta?</span>
            <Link to="/register">Cadastre-se</Link>
          </div>
        </Form>
      </Card>
    </div>
  );
}
