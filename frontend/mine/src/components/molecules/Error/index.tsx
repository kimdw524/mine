/** @jsxImportSource @emotion/react */
import React from 'react';
import { containerCss, descriptionCss } from './style';
import { FallbackProps } from 'react-error-boundary';
import { Button, Icon, Typography } from 'oyc-ds';
import { ExclamationTriangleIcon } from '@heroicons/react/24/outline';

interface ErrorProps extends FallbackProps {
  height?: string;
}

const Error = ({ height = '100%', error, resetErrorBoundary }: ErrorProps) => {
  return (
    <div css={containerCss} style={{ height }}>
      <Icon size="xl" color="danger">
        <ExclamationTriangleIcon />
      </Icon>
      <Typography color="danger" css={descriptionCss}>
        {error.message}
      </Typography>
      <Button color="danger" onClick={() => resetErrorBoundary()}>
        재시도
      </Button>
    </div>
  );
};

export default Error;
