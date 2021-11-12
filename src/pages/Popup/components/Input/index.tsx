import React, {
  memo,
  ReactElement,
  useCallback,
  useEffect,
  useState,
} from 'react';

interface IProps {
  onChange: (value: string) => void;
  style?: Record<string, any>;
}

const Input = ({ onChange, style }: IProps): ReactElement => {
  const [value, setValue] = useState('');

  const handleChange = useCallback((e) => {
    setValue(e.target.value);
  }, []);

  useEffect(() => {
    onChange(value);
  }, [value, onChange]);

  return <input style={style} value={value} onChange={handleChange} />;
};

export default memo(Input);
