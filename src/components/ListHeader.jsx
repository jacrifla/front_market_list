import { Row, Col } from 'react-bootstrap';

export default function ListHeader({ listName, total }) {
  return (
    <Row className="align-items-center mb-3">
      <Col className="d-flex align-items-center gap-2">
        <i className="bi bi-basket3-fill" style={{ fontSize: '1.5rem' }}></i>
        <h4 className="mb-0">{listName || 'Selecione uma lista'}</h4>
      </Col>
      <Col className="text-end d-flex align-items-center justify-content-end gap-2 fs-5 text-primary">
        <i className="bi bi-receipt" style={{ fontSize: '1.5rem' }}></i>
        <span>R$ {total !== undefined ? total.toFixed(2) : '0.00'}</span>
      </Col>
    </Row>
  );
}
