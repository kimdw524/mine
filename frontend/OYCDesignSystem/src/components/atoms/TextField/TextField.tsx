/** @jsxImportSource @emotion/react */
import React, { forwardRef, useState } from 'react';
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

export const TextField = forwardRef<
  HTMLInputElement | HTMLTextAreaElement,
  TextFieldProps
>(
  (
    {
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
    },
    ref,
  ) => {
    const theme = useTheme();
    const [isFocused, setIsFocused] = useState<boolean>(false);
    const [inputValue, setInputValue] = useState<string>('');

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
              inputValue,
              isFocused,
            ),
            labelVariants[variant](
              theme,
              theme.colors[color],
              placeholder,
              defaultValue,
              inputValue,
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
            onChange={(e) => setInputValue(e.target.value)}
            ref={ref as React.Ref<HTMLTextAreaElement>}
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
            onChange={(e) => setInputValue(e.target.value)}
            ref={ref as React.Ref<HTMLInputElement>}
          />
        )}
      </div>
    );
  },
);

TextField.displayName = 'TextField';
