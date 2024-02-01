//Author: Nico Mangold
import React, {FormEvent} from 'react';
import {IconInputWrapper, IconWrapper, Input} from './IconInput.styles';

//component: Input field with icon at the end
type IconInputProps = {
  value: string;
  iconSrc: string;
  placeHolder: string;
  isPassword?: boolean;
  onChange: (event: FormEvent<HTMLInputElement>) => void;
};
export default function IconInput({
  value,
  iconSrc,
  placeHolder,
  isPassword,
  onChange: handleChange,
}: IconInputProps) {
  return (
    <IconInputWrapper>
      <IconWrapper>
        <img src={iconSrc} />
      </IconWrapper>
      <Input
        type={!isPassword ? 'text' : 'password'}
        id={placeHolder}
        onChange={handleChange}
        value={value}
        placeholder={placeHolder}
      />
    </IconInputWrapper>
  );
}
