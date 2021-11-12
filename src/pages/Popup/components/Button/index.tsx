import React, { memo, ReactElement, ReactNode } from 'react';

interface IProps {
  children: ReactNode;
  onClick: () => void;
  disabled?: boolean;
  style?: Record<string, any>;
}

const Button = ({
  children,
  onClick,
  disabled,
  style,
}: IProps): ReactElement => (
  <button style={style} onClick={onClick} disabled={disabled}>
    {children}
  </button>
);

export default memo(Button);
