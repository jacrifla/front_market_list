import { Container, Row, Col } from 'react-bootstrap';
import BrandRegisterForm from '../components/registers/BrandRegisterForm';
import CategoryRegisterForm from '../components/registers/CategoryRegisterForm';
import ItemRegisterForm from '../components/registers/ItemRegisterForm';
import MarketRegisterForm from '../components/registers/MarketRegisterForm';
import UnitRegisterForm from '../components/registers/UnitRegisterForm';

export default function Registers() {
  return (
    <Container fluid className="px-0 px-lg-3 mt-0 mt-lg-4">
      <Row>
        <Col xs={12} md={8} className="d-flex mb-3 mb-md-0">
          <div className="w-100 h-100">
            <ItemRegisterForm />
          </div>
        </Col>
        <Col xs={12} md={4} className="d-flex">
          <div className="w-100 h-100">
            <CategoryRegisterForm />
          </div>
        </Col>
      </Row>

      <Row>
        <Col xs={12} md={4}>
          <BrandRegisterForm />
        </Col>
        <Col xs={12} md={4}>
          <UnitRegisterForm />
        </Col>
        <Col xs={12} md={4}>
          <MarketRegisterForm />
        </Col>
      </Row>
    </Container>
  );
}
