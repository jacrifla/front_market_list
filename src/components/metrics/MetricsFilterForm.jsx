import { Button, Col, Form, Row } from "react-bootstrap";

export default function MetricsFilterForm({ startDate, endDate, setStartDate, setEndDate, onSearch, loading }) {
  return (
    <Form className="mb-3">
      <Row>
        <Col md={4}>
          <Form.Group controlId="startDate">
            <Form.Label>Data Inicial</Form.Label>
            <Form.Control
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
            />
          </Form.Group>
        </Col>
        <Col md={4}>
          <Form.Group controlId="endDate">
            <Form.Label>Data Final</Form.Label>
            <Form.Control
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
            />
          </Form.Group>
        </Col>
        <Col md={4} className="d-flex align-items-end">
          <Button
            className="w-100"
            variant="primary"
            onClick={onSearch}
            disabled={loading}
          >
            {loading ? 'Buscando...' : 'Buscar'}
          </Button>
        </Col>
      </Row>
    </Form>
  );
}