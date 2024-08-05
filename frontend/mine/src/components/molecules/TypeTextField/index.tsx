/** @jsxImportSource @emotion/react */
import React, { forwardRef, useEffect, useState } from 'react';
import { containerCss, focusCss, textCss, typeCss } from './style';
import TransitionAnimation from '../../common/TransitionAnimation';
import styles from './TypeTextField.module.css';

interface TextType {
  name: string;
  value: string;
}

interface TypeTextFieldProps extends React.ComponentProps<'input'> {
  onTypeChange: (type: string) => void;
  types: TextType[];
}

const TypeTextField = forwardRef<HTMLInputElement, TypeTextFieldProps>(
  ({ onTypeChange, types, ...props }, ref) => {
    const [type, setType] = useState<string>(types[0]?.value || '');
    const [focus, setFocus] = useState<boolean>(false);

    useEffect(() => {
      onTypeChange(type);
    }, [type]);

    return (
      <div css={[containerCss, focus && focusCss]}>
        <div css={typeCss}>
          <TransitionAnimation
            data-key={type}
            className={{
              normal: styles.fade,
              enter: styles['fade-enter'],
              exit: styles['fade-exit'],
            }}
          >
            {types.map((type, index) => (
              <span
                key={type.value}
                onClick={() => {
                  setType(types[(index + 1) % types.length].value);
                }}
              >
                {type.name}
              </span>
            ))}
          </TransitionAnimation>
        </div>
        <input
          type="text"
          css={textCss}
          onFocus={() => setFocus(true)}
          onBlur={() => setFocus(false)}
          ref={ref}
          {...props}
        />
      </div>
    );
  },
);

TypeTextField.displayName = 'TypeTextField';

export default TypeTextField;
