/** @jsxImportSource @emotion/react */
import React, { useState } from 'react';
import AppBar from '../../../components/organisms/AppBar';
import {
  bottomCss,
  categoryCss,
  containerCss,
  modalCss,
  textContainerCss,
} from './style';
import { Button, Dropdown, TextField, Typography } from 'oyc-ds';
import DateTimePicker from '../../../components/organisms/DateTimePicker';
import { scheduleCategoryData } from '../../../utils/scheduleUtils';
import { useNavigate } from 'react-router-dom';
import CategorySelect from '../../../components/molecules/CategorySelect';
import { accountCategoryData } from '../../../utils/accountUtils';

const Create = () => {
  const navigate = useNavigate();
  const [date, setDate] = useState<Date>(new Date());

  return (
    <div css={modalCss}>
      <AppBar label="가계 추가" />
      <div css={containerCss}>
        <CategorySelect>
          {Object.entries(accountCategoryData).map(([, value]) => (
            <CategorySelect.Item
              key={value.id}
              name={value.name}
              color={value.color}
            >
              {value.icon}
            </CategorySelect.Item>
          ))}
        </CategorySelect>
        <div css={textContainerCss}>
          <TextField variant="outlined" label="제목" defaultValue="" />
          <TextField
            variant="outlined"
            label="내용"
            defaultValue=""
            multiLine
            maxRows={2}
          />
        </div>
        <DateTimePicker date={date} onChange={() => {}} />

        <div css={categoryCss}>
          <Typography color="dark">카테고리</Typography>
          <Dropdown>
            {Object.entries(scheduleCategoryData).map(([key, item]) => (
              <Dropdown.Item key={key}>{item.name}</Dropdown.Item>
            ))}
          </Dropdown>
        </div>
      </div>

      <div css={bottomCss}>
        <Button color="secondary" onClick={() => navigate(-1)}>
          취소
        </Button>
        <Button>등록</Button>
      </div>
    </div>
  );
};

export default Create;
