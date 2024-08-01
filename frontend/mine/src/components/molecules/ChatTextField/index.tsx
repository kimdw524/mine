/** @jsxImportSource @emotion/react */
import React, { forwardRef, useState } from 'react';
import { ChatType } from '../../../hooks/useChat';
import { containerCss, focusCss, textCss, typeCss } from './style';
import TransitionAnimation from '../../common/TransitionAnimation';
import styles from './ChatTextField.module.css';

interface ChatTextFieldProps extends React.ComponentProps<'input'> {
  onTypeChange: (type: ChatType) => void;
}

const ChatTextField = forwardRef<HTMLInputElement, ChatTextFieldProps>(
  ({ onTypeChange, ...props }, ref) => {
    const [type, setType] = useState<ChatType>('chat');
    const [focus, setFocus] = useState<boolean>(false);
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
            <span key="chat" onClick={() => setType('schedule')}>
              채팅
            </span>
            <span key="schedule" onClick={() => setType('account')}>
              가계
            </span>
            <span key="account" onClick={() => setType('chat')}>
              일정
            </span>
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

ChatTextField.displayName = 'ChatTextField';

export default ChatTextField;
