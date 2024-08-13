/** @jsxImportSource @emotion/react */
import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from 'react';
import {
  containerCss,
  focusCss,
  textCss,
  typeCss,
  voiceRecordCss,
} from './style';
import TransitionAnimation from '../../common/TransitionAnimation';
import styles from './TypeTextField.module.css';
import { Icon } from 'oyc-ds';
import { MicrophoneIcon } from '@heroicons/react/24/solid';
import useModal from '../../../hooks/useModal';
import { getSTT } from '../../../apis/avatarApi';
import VoiceRecord from '../../common/VoiceRecord';
import { ChevronUpDownIcon } from '@heroicons/react/24/outline';

interface TextType {
  name: string;
  value: string;
}

interface TypeTextFieldProps extends React.ComponentProps<'input'> {
  onTypeChange: (type: string) => void;
  onVoiceInput: () => void;
  types: TextType[];
  avatarId?: number;
}

const TypeTextField = forwardRef<HTMLInputElement, TypeTextFieldProps>(
  ({ onTypeChange, types, avatarId = 0, onVoiceInput, ...props }, ref) => {
    const [type, setType] = useState<string>(types[0]?.value || '');
    const [focus, setFocus] = useState<boolean>(false);
    const modal = useModal();

    const textRef = useRef<HTMLInputElement>(null);

    const handleRecord = async (file: string) => {
      if (!textRef.current) {
        return;
      }

      const result = await getSTT({
        avatarId,
        chatType: types[1].value === 'chat' ? 'c' : 's',
        file,
      });
      textRef.current.value = result.data;
      textRef.current.focus();
      onVoiceInput();
    };

    const handleRecordClick = () => {
      modal.push({
        component: <VoiceRecord onSuccess={handleRecord} />,
        name: 'voiceRecord',
      });
    };

    useImperativeHandle(ref, () => textRef.current!, []);

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
          <Icon size="sm" color="dark">
            <ChevronUpDownIcon />
          </Icon>
        </div>
        <input
          type="text"
          css={textCss}
          onFocus={() => setFocus(true)}
          onBlur={() => setFocus(false)}
          ref={textRef}
          {...props}
        />
        <div css={voiceRecordCss} onClick={handleRecordClick}>
          <Icon size="sm">
            <MicrophoneIcon />
          </Icon>
        </div>
      </div>
    );
  },
);

TypeTextField.displayName = 'TypeTextField';

export default TypeTextField;
