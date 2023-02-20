import {Form} from 'components/bootstrap';

interface Props {
  name: string;
  label?: string;
  onChange: OnChangeHandler;
  onKeyPress?: any;
  placeholder?: string;
  value?: string;
  error?: string;
  type?: string;
  disabled?: boolean;
  className?: string;
}

function TextInput({name, label, onChange, onKeyPress, placeholder, value, error, type, disabled, className}: Props) {
  const inputType = type ? type : 'text';

  function inputOnChange(event) {
    onChange(event.target.name, event.target.value);
  }

  return (
    <Form.Group className="mb-4">
      {label && <Form.Label htmlFor={name}>{label}</Form.Label>}

      <Form.Control
        type={inputType}
        name={name}
        className={className}
        placeholder={placeholder}
        disabled={disabled}
        value={value ? value : ''}
        onChange={inputOnChange}
        onKeyPress={onKeyPress}
        autoComplete="off"
      />
      {error && <div className="alert alert-danger">{error}</div>}
    </Form.Group>
  );
}

export default TextInput;
