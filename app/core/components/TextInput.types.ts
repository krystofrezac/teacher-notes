import { HTMLInputTypeAttribute } from 'react';

export interface TextInputProps {
  name: string;
  label: string;

  type?: HTMLInputTypeAttribute;
}
