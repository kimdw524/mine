/** @jsxImportSource @emotion/react */
import React, { ReactNode } from 'react';
import { Button, Icon, Typography } from 'oyc-ds';
import { engToIcon } from '../../../../utils/EngToIcon';
import { engToKor } from '../../../../utils/EngToKor';
import { btnContainerCss, btnCss, containerCss } from './style';
import { useNavigate } from 'react-router-dom';

interface ManageInfoProps {
  title: string;
  labels: string[];
  url: string[];
  data: ReactNode[];
}

const ManageInfo = ({ title, labels, url, data }: ManageInfoProps) => {
  const nav = useNavigate();

  return (
    <div css={containerCss}>
      <Typography color="dark">{title}</Typography>
      <div css={btnContainerCss}>
        {labels.map((label: string, idx: number) => {
          return (
            <Button
              key={label}
              size="lg"
              variant="contained"
              color="light"
              css={btnCss}
              onClick={() => nav(url[idx], { state: { data: data[idx] } })}
            >
              <Icon>{engToIcon[label]}</Icon>
              <Typography color="dark">{engToKor[label]}</Typography>
            </Button>
          );
        })}
      </div>
    </div>
  );
};

export default ManageInfo;
