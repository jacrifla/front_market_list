import { Form } from 'react-bootstrap';

export default function SelectField({
  label,
  value,
  onChange,
  options,
  name,
  getOptionValue = (opt) => String(opt.id),
  getOptionLabel = (opt) => opt.name,
  defaultOption = 'Selecione',
}) {
  return (
    <Form.Group className="mb-3">
      <Form.Label>{label}</Form.Label>
      <Form.Select value={value} onChange={onChange} name={name}>
        <option value="">{defaultOption}</option>
        {options?.map((opt) => (
          <option key={getOptionValue(opt)} value={getOptionValue(opt)}>
            {getOptionLabel(opt)}
          </option>
        ))}
      </Form.Select>
    </Form.Group>
  );
}
