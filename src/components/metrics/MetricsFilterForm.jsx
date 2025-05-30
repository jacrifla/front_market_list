export default function MetricsFilterForm({ startDate, endDate, setStartDate, setEndDate, onSearch, loading }) {
  return (
    <div className="row mb-3">
      <div className="col-md-4">
        <label className="form-label">Data Inicial</label>
        <input
          type="date"
          className="form-control"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
        />
      </div>
      <div className="col-md-4">
        <label className="form-label">Data Final</label>
        <input
          type="date"
          className="form-control"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
        />
      </div>
      <div className="col-md-4 d-flex align-items-end">
        <button
          className="btn btn-primary w-100"
          onClick={onSearch}
          disabled={loading}
        >
          {loading ? 'Buscando...' : 'Buscar'}
        </button>
      </div>
    </div>
  );
}
