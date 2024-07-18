/** @jsxImportSource @emotion/react */
import React, { useState } from 'react';
import { useTheme } from '@emotion/react';
import { TextFieldProps } from './TextField.types';
import {
  base,
  labelField,
  inputField,
  variants,
  labelVariants,
  inputVariants,
} from './TextField.styles';

export const TextField = ({
  color = 'primary',
  defaultValue = 'this is defaultValues',
  disabled = false,
  label = 'label',
  maxRows = 10,
  multiLine = false,
  placeholder = '',
  readOnly = false,
  type = 'text',
  variant = 'contained',
  ...props
}: TextFieldProps) => {
  const theme = useTheme();
  const [isFocused, setIsFocused] = useState<boolean>(false);

  return (
    <div
      css={[
        base(theme, theme.colors[color], multiLine),
        variants[variant](theme, theme.colors[color], isFocused),
      ]}
      {...props}
    >
      <div
        css={[
          labelField(
            theme,
            theme.colors[color],
            placeholder,
            defaultValue,
            isFocused,
          ),
          labelVariants[variant](
            theme,
            theme.colors[color],
            placeholder,
            defaultValue,
            isFocused,
          ),
        ]}
      >
        {disabled ? '입력 불가능' : label}
      </div>
      {multiLine ? (
        <textarea
          css={[
            inputField(theme, disabled, multiLine),
            inputVariants[variant](theme, theme.colors[color]),
          ]}
          placeholder={placeholder}
          disabled={disabled}
          readOnly={readOnly}
          rows={maxRows}
          onFocus={() => !readOnly && setIsFocused(true)}
          onBlur={() => !readOnly && setIsFocused(false)}
        >
          {defaultValue}
        </textarea>
      ) : (
        <input
          type={type}
          css={[
            inputField(theme, disabled, multiLine),
            inputVariants[variant](theme, theme.colors[color]),
          ]}
          placeholder={placeholder}
          disabled={disabled}
          readOnly={readOnly}
          defaultValue={defaultValue}
          onFocus={() => !readOnly && setIsFocused(true)}
          onBlur={() => !readOnly && setIsFocused(false)}
        />
      )}
    </div>
  );
};
