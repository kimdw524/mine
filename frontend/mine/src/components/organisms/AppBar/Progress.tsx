/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { Progress as ProgressComponent } from 'oyc-ds';

interface ProgressProps {
  value: number;
  max: number;
}

const containerCss = css`
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
`;

const Progress = ({ value, max }: ProgressProps) => {
  return (
    <div css={containerCss}>
      <ProgressComponent variant="rectangle" value={value} max={max} />
    </div>
  );
};

export default Progress;
