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
  modalCss,
  textContainerCss,
  typeCss,
} from './style';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import {
  AccountParam,
  addAccount,
  updateAccountAchievement,
} from '../../../apis/accountApi';
import { apiFormatDateTime } from '../../../utils/dateUtils';
import useDialog from '../../../hooks/useDialog';

// merge test

interface CreateProps {
  onCreate: (date: Date) => void;
  selectedDate?: Date;
}

const Create = ({ onCreate, selectedDate = new Date() }: CreateProps) => {
  const navigate = useNavigate();
  const dateRef = useRef<Date>(selectedDate);
  const [type, setType] = useState<'I' | 'S'>('S');
  const categoryRef = useRef<number>(1);
  const titleRef = useRef<HTMLInputElement>(null);
  const descriptionRef = useRef<HTMLInputElement>(null);
  const moneyRef = useRef<HTMLInputElement>(null);
  const queryClient = useQueryClient();
  const { alert } = useDialog();

  const { mutate } = useMutation({
    mutationFn: (params: AccountParam) => addAccount(params),
    onSuccess: async (data) => {
      if (data.status === 200) {
        queryClient.invalidateQueries({ queryKey: ['account'] });

        const result = await updateAccountAchievement();

        if (result) {
          alert('새로운 업적을 달성하였습니다!');
        }

        onCreate(dateRef.current);

        navigate(-1);
      }
    },
    onError: (error) => {
      alert('오류가 발생하였습니다.');
      console.error(error);
    },
  });

  const handleSubmit = () => {
    mutate({
      spendCategoryId: categoryRef.current,
      accountType: type,
      money: parseInt(moneyRef.current!.value),
      title: titleRef.current!.value,
      description: descriptionRef.current!.value,
      dateTime: apiFormatDateTime(dateRef.current),
    });
  };

  return (
    <div css={modalCss}>
      <AppBar label="가계 추가" />
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
            defaultValue=""
          />
          <TextField
            ref={descriptionRef}
            type="number"
            variant="outlined"
            label="내용"
            defaultValue=""
            multiLine
            maxRows={2}
          />
          <TextField
            ref={moneyRef}
            variant="outlined"
            label="금액"
            defaultValue=""
          />
        </div>
        <DateTimePicker
          date={dateRef.current}
          onChange={(date) => (dateRef.current = date)}
        />
      </div>

      <div css={bottomCss}>
        <Button color="secondary" onClick={() => navigate(-1)}>
          취소
        </Button>
        <Button onClick={handleSubmit}>등록</Button>
      </div>
    </div>
  );
};

export default Create;
