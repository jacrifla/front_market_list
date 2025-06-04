import BrandRegisterForm from '../components/registers/BrandRegisterForm';
import CategoryRegisterForm from '../components/registers/CategoryRegisterForm';
import ItemRegisterForm from '../components/registers/ItemRegisterForm';
import MarketRegisterForm from '../components/registers/MarketRegisterForm';
import UnitRegisterForm from '../components/registers/UnitRegisterForm';

export default function Registers() {
  return (
    <div className="container-fluid px-0 px-lg-3 mt-0 mt-lg-4">
      <div className="row">
        <div className="col-12 col-md-8 d-flex mb-3 mb-md-0">
          <div className="w-100 h-100">
            <ItemRegisterForm />
          </div>
        </div>
        <div className="col-12 col-md-4 d-flex">
          <div className="w-100 h-100">
            <CategoryRegisterForm />
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col-12 col-md-4">
          <BrandRegisterForm />
        </div>
        <div className="col-12 col-md-4">
          <UnitRegisterForm />
        </div>
        <div className="col-12 col-md-4">
          <MarketRegisterForm />
        </div>
      </div>
    </div>
  );
}
