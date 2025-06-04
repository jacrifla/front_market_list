export default function SelectField({
  label,
  value,
  onChange,
  options,
  name,
  getOptionValue = (opt) => String(opt.id),
  getOptionLabel = (opt) => opt.name,
  defaultOption = "Selecione",
}) {
  return (
    <div>
      <label className="form-label">{label}</label>
      <select
        className="form-select"
        value={value}
        onChange={onChange}
        name={name}
      >
        <option value="">{defaultOption}</option>
        {options?.map((opt) => (
          <option key={getOptionValue(opt)} value={getOptionValue(opt)}>
            {getOptionLabel(opt)}
          </option>
        ))}
      </select>
    </div>
  );
}
