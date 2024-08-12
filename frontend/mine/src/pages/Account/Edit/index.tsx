/** @jsxImportSource @emotion/react */
import { Button, TextField } from 'oyc-ds';
import React, { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CategorySelect from '../../../components/molecules/CategorySelect';
import AppBar from '../../../components/organisms/AppBar';
import DateTimePicker from '../../../components/organisms/DateTimePicker';
import { accountCategoryData } from '../../../utils/accountUtils';
import {
  bottomCss,
  categoryCss,
  containerCss,
  leftSideCss,
  modalCss,
  rightSideCss,
  textContainerCss,
  typeCss,
} from './style';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import {
  AccountData,
  deleteAccount,
  updateAccount,
} from '../../../apis/accountApi';
import { apiFormatDateTime } from '../../../utils/dateUtils';
import useDialog from '../../../hooks/useDialog';

interface EditProps {
  data: AccountData;
}

const Edit = ({ data }: EditProps) => {
  const navigate = useNavigate();
  const dateRef = useRef<Date>(new Date(data.dateTime));
  const [type, setType] = useState<'I' | 'S'>(data.accountType);
  const categoryRef = useRef<number>(data.spendCategoryId);
  const titleRef = useRef<HTMLInputElement>(null);
  const descriptionRef = useRef<HTMLInputElement>(null);
  const moneyRef = useRef<HTMLInputElement>(null);
  const queryClient = useQueryClient();
  const { confirm, alert } = useDialog();

  const { mutate } = useMutation({
    mutationFn: (params: AccountData) => updateAccount(params),
    onSuccess: (data) => {
      if (data.status === 200) {
        queryClient.invalidateQueries({ queryKey: ['account'] });
        navigate(-1);
      }
    },
    onError: (error) => {
      alert('오류가 발생하였습니다.');
      console.error(error);
    },
  });

  const { mutate: deleteItem } = useMutation({
    mutationFn: (accountId: number) => deleteAccount(accountId),
    onSuccess: (data) => {
      if (data.status === 200) {
        queryClient.invalidateQueries({ queryKey: ['account'] });
        navigate(-1);
      }
    },
    onError: (error) => {
      alert('오류가 발생하였습니다.');
      console.error(error);
    },
  });

  const handleSubmit = () => {
    if (!titleRef.current!.value) {
      alert('제목을 입력해 주세요.');
      return;
    }

    if (isNaN(parseInt(moneyRef.current!.value.replaceAll(',', '')))) {
      alert('금액을 정확히 입력해 주세요.');
      return;
    }

    mutate({
      accountId: data.accountId,
      spendCategoryId: categoryRef.current,
      accountType: type,
      money: parseInt(moneyRef.current!.value.replaceAll(',', '')),
      title: titleRef.current!.value,
      description: descriptionRef.current!.value,
      dateTime: apiFormatDateTime(dateRef.current),
    });
  };

  const handleDelete = async () => {
    if (!(await confirm('정말로 삭제하시겠습니까?'))) {
      return;
    }

    deleteItem(data.accountId);
  };

  const handleMoneyFocus = () => {
    if (!moneyRef.current) {
      return;
    }

    moneyRef.current.value = moneyRef.current.value.replaceAll(',', '');
  };

  const handleMoneyBlur = () => {
    if (!moneyRef.current) {
      return;
    }

    if (isNaN(parseInt(moneyRef.current.value))) {
      moneyRef.current.value = '0';
      return;
    }

    moneyRef.current.value = parseInt(moneyRef.current.value).toLocaleString();
  };

  return (
    <div css={modalCss}>
      <AppBar label="가계부" />
      <div css={containerCss}>
        <div css={typeCss}>
          <Button
            onClick={() => setType('S')}
            variant={type === 'S' ? 'contained' : 'outlined'}
          >
            지출
          </Button>
          <Button
            onClick={() => setType('I')}
            variant={type === 'I' ? 'contained' : 'outlined'}
          >
            수입
          </Button>
        </div>
        {type === 'S' && (
          <div css={categoryCss}>
            <CategorySelect
              selected={categoryRef.current}
              onChange={(selected) => (categoryRef.current = selected)}
            >
              {Object.entries(accountCategoryData)
                .slice(0, -1)
                .map(([, value]) => (
                  <CategorySelect.Item
                    key={value.id}
                    name={value.name}
                    color={value.color}
                    value={value.id}
                  >
                    {value.icon}
                  </CategorySelect.Item>
                ))}
            </CategorySelect>
          </div>
        )}
        <div css={textContainerCss}>
          <TextField
            ref={titleRef}
            variant="outlined"
            label="제목"
            defaultValue={data.title}
          />
          <TextField
            ref={descriptionRef}
            type="number"
            variant="outlined"
            label="내용"
            defaultValue={data.description}
            multiLine
            maxRows={2}
          />
          <TextField
            ref={moneyRef}
            variant="outlined"
            label="금액"
            defaultValue={data.money.toLocaleString()}
            onBlur={handleMoneyBlur}
            onFocus={handleMoneyFocus}
          />
        </div>
        <DateTimePicker
          date={dateRef.current}
          onChange={(date) => (dateRef.current = date)}
        />
      </div>

      <div css={bottomCss}>
        <div css={leftSideCss}>
          <Button color="danger" onClick={handleDelete}>
            삭제
          </Button>
        </div>
        <div css={rightSideCss}>
          <Button color="secondary" onClick={() => navigate(-1)}>
            취소
          </Button>
          <Button onClick={handleSubmit}>수정</Button>
        </div>
      </div>
    </div>
  );
};

export default Edit;
