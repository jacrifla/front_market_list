import { useState } from 'react';
import useAuth from '../hooks/useAuth';
import { Alert, Button, Card, Col, Form, Row, Spinner } from 'react-bootstrap';
import ConfirmModal from '../components/ConfirmModal';
import Avatar from 'react-avatar';

export default function Profile() {
  const { user, logout, updateUser } = useAuth();
  const [showLogoutConfirm, setShowLogoutConfirm] = useState();
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [name, setName] = useState(user?.name || '');
  const [email, setEmail] = useState(user?.email || '');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  if (!user) {
    return <div>Carregando perfil...</div>;
  }

  const handleLogout = () => {
    setShowLogoutConfirm(true);
  };

  const confirmLogout = () => {
    logout();
    setShowLogoutConfirm(false);
  };

  const startEditing = () => {
    setIsEditing(true);
    setError('');
  };

  const cancelEditing = () => {
    setIsEditing(false);
    setName(user.name);
    setEmail(user.email);
    setError('');
  };

  const saveProfile = async () => {
    if (!name.trim() || !email.trim()) {
      setError('Nome e email não podem estar vazios.');
      setSuccess('');
      return;
    }

    setIsSaving(true);

    try {
      await updateUser({ name: name.trim(), email: email.trim() });
      setIsEditing(false);
      setError('');
      setSuccess('Perfil atualizado com sucesso!');
      setTimeout(() => {
        setSuccess('');
      }, 3000);
    } catch (error) {
      setError('Erro ao atualizar perfil, tente novamente');
      setSuccess('');
      console.error(error);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="mt-lg-5 d-flex justify-content-center">
      <Card className="p-4 shadow-sm card-perfil">
        <h3 className="mb-4 text-center">Perfil do Usuário</h3>
        <div className="d-flex justify-content-center mb-4">
          <Avatar name={user.name} size="100" round={true} />
        </div>

        {success && <Alert variant="success">{success}</Alert>}
        {error && <Alert variant="danger">{error}</Alert>}

        <Row className="mb-3">
          <Col xs={4}>
            <strong>Nome:</strong>
          </Col>
          <Col xs={8}>
            {isEditing ? (
              <Form.Control
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            ) : (
              user.name || 'Sem nome cadastrado'
            )}
          </Col>
        </Row>

        <Row className="mb-4">
          <Col xs={4}>
            <strong>Email:</strong>
          </Col>
          <Col>
            {isEditing ? (
              <Form.Control
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            ) : (
              user.email || 'Sem nome cadastrado'
            )}
          </Col>
        </Row>

        {isEditing ? (
          <>
            <Button
              variant="success"
              className="w-100 mb-2"
              onClick={saveProfile}
              disabled={isSaving}
            >
              {isSaving ? (
                <>
                  <Spinner
                    as={'span'}
                    animation="border"
                    size="sm"
                    role="status"
                    aria-hidden="true"
                    className="me-2"
                  />
                  Salvando...
                </>
              ) : (
                'Salvar'
              )}
            </Button>
            <Button
              variant="secondary"
              className="w-100 mb-2"
              onClick={cancelEditing}
              disabled={isSaving}
            >
              Cancelar
            </Button>
          </>
        ) : (
          <Button
            variant="outline-primary"
            className="w-100 mb-2"
            onClick={startEditing}
          >
            Editar Perfil
          </Button>
        )}

        <Button variant="danger" className="w-100" onClick={handleLogout}>
          Sair
        </Button>
      </Card>

      <ConfirmModal
        show={showLogoutConfirm}
        onHide={() => setShowLogoutConfirm(false)}
        onConfirm={confirmLogout}
        title={'Confirmação'}
        body={'Tem certeza que deseja sair?'}
        confirmText="Sair"
        cancelText="Cancelar"
      />
    </div>
  );
}
