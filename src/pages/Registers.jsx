import BrandRegisterForm from '../components/registers/BrandRegisterForm';
import CategoryRegisterForm from '../components/registers/CategoryRegisterForm';
import ItemRegisterForm from '../components/registers/ItemRegisterForm';
import MarketRegisterForm from '../components/registers/MarketRegisterForm';
import UnitRegisterForm from '../components/registers/UnitRegisterForm';

export default function Registers() {
  return (
    <div className="container mt-4">
      <h2>Cadastro</h2>

      <div className="row mb-4">
        <div className="col-md-8 d-flex">
          <div className="w-100 h-100">
            <ItemRegisterForm />
          </div>
        </div>
        <div className="col-md-4 d-flex">
          <div className="w-100 h-100">
            <CategoryRegisterForm />
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col-md-4">
          <BrandRegisterForm />
        </div>
        <div className="col-md-4">
          <UnitRegisterForm />
        </div>
        <div className="col-md-4">
          <MarketRegisterForm />
        </div>
      </div>
    </div>
  );
}
