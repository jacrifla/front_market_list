import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { Container, Nav, Navbar, Button } from 'react-bootstrap';
import useAuth from '../hooks/useAuth';
import { useState } from 'react';
import ConfirmModal from '../components/ConfirmModal';
import { ToastContainer } from 'react-toastify';

export default function MainLayout() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [showConfirm, setShowConfirm] = useState(false);

  const handleLogoutConfirm = () => {
    logout();
    setShowConfirm(false);
    navigate('/login');
  };

  return (
    <>
      <Navbar bg="primary" variant="dark" expand="lg" className="shadow">
        <Container>
          <Navbar.Brand as={NavLink} to="/" className="fw-bold ps-5">
            <i className="bi bi-cart4 me-2"></i> Lista da Mamãe
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="main-navbar" />
          <Navbar.Collapse id="main-navbar">
            <Nav className="ms-auto align-items-center">
              {user && (
                <>
                  <NavLink to="/" className="nav-link">
                    <i className="bi bi-house-door-fill me-1" /> Home
                  </NavLink>
                  <NavLink to="/profile" className="nav-link">
                    <i className="bi bi-person-fill me-1" /> Perfil
                  </NavLink>
                  <NavLink to="/metrics" className="nav-link">
                    <i className="bi bi-graph-up-arrow me-1" /> Métricas
                  </NavLink>
                  <NavLink to="/registers" className="nav-link">
                    <i className="bi bi-pencil-square me-1" /> Cadastros
                  </NavLink>
                  <Button
                    variant="outline-light"
                    size="sm"
                    onClick={() => setShowConfirm(true)}
                    className="ms-3"
                  >
                    <i className="bi bi-box-arrow-right me-1" /> Sair
                  </Button>
                </>
              )}
              {!user && (
                <>
                  <NavLink to="/login" className="nav-link">
                    <i className="bi bi-person me-1" /> Login
                  </NavLink>
                  <NavLink to="/register" className="nav-link">
                    <i className="bi bi-person me-1" /> Cadastrar
                  </NavLink>
                </>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <div>
        <Outlet />
      </div>

      <ToastContainer position="top-right" autoClose={3000} />

      <ConfirmModal
        show={showConfirm}
        onHide={() => setShowConfirm(false)}
        onConfirm={handleLogoutConfirm}
        title="Confirmar logout"
        body="Tem certeza que deseja sair?"
        confirmText="Sair"
        cancelText="Cancelar"
      />
    </>
  );
}
