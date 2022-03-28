import { useState, useCallback, useEffect } from 'react';

import axios from 'axios';
import { Box, TextField, Button, Modal, Grid, Link } from '@mui/material';
import { modalStyle, IsSatisfied } from './style';
import useSWR from 'swr';
import fetcher from '@utils/swrFetcehr';
import { IUser } from '@utils/dbTypes';

type propsType = {
  isJoinModalOpen: boolean;
  handleJoinModalClose: () => void;
  handleLoginModalOpen: () => void;
};

function Join({ isJoinModalOpen, handleJoinModalClose, handleLoginModalOpen }: propsType) {
  const { mutate } = useSWR<IUser>(`${process.env.REACT_APP_SERVER}/user/me`, fetcher);

  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const [nickname, setNickname] = useState('');

  const onChangeId = useCallback((e) => {
    setId(e.target.value);
  }, []);
  const onChangePassword = useCallback((e) => {
    setPassword(e.target.value);
  }, []);
  const onChangeNickname = useCallback((e) => {
    setNickname(e.target.value);
  }, []);

  const [isIdUnique, setIsIdUnique] = useState(true);
  const [isPwOk, setIsPwOk] = useState(false);

  //ID 중복 체크
  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_SERVER}/user?id=${id}`)
      .then(() => {
        setIsIdUnique(false);
      })
      .catch(() => {
        setIsIdUnique(true);
      });
  }, [id]);

  //비밀번호 체크
  useEffect(() => {
    const regPassword = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{5,}$/;
    if (regPassword.test(password)) setIsPwOk(true);
    else setIsPwOk(false);
  }, [password]);

  //회원가입 요청
  const onSubmit = useCallback(
    async (e) => {
      e.preventDefault();
      if (!isIdUnique) alert('아이디 중복을 확인해주십시오.');
      else if (!isPwOk) alert('비밀번호를 확인해주십시오.');
      else if (id === '' || nickname === '') alert('아이디와 별명을 입력하세요.');
      else {
        await axios
          .post(
            `${process.env.REACT_APP_SERVER}/user/join`,
            {
              id: id,
              password: password,
              nickname: nickname,
            },
            {
              withCredentials: true,
            },
          )
          .then((res) => {
            console.log(res.data);
            mutate();
            handleJoinModalClose();
          })
          .catch(() => {
            alert('회원가입에 실패했습니다.\n잠시 후에 다시 시도해주세요.');
          });
      }
    },
    [isIdUnique, isPwOk, id, nickname, password],
  );

  return (
    <Modal open={isJoinModalOpen}>
      <Box component="form" noValidate onSubmit={onSubmit} sx={modalStyle}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField required fullWidth label="아이디를 입력하세요" onChange={onChangeId} />
          </Grid>
          <IsSatisfied isOk={isIdUnique}>
            {isIdUnique ? '사용 가능한 아이디입니다 :D' : '이미 있는 아이디입니다 :('}
          </IsSatisfied>
          <Grid item xs={12}>
            <TextField required fullWidth label="비밀번호를 입력하세요" type="password" onChange={onChangePassword} />
          </Grid>
          <IsSatisfied isOk={isPwOk}>
            {isPwOk
              ? '안전한 비밀번호네요 :D'
              : '5글자 이상, 특수문자와 숫자 영문자를 모두 사용하면 더 안전한 비밀번호가 돼요 :('}
          </IsSatisfied>
          <Grid item xs={12}>
            <TextField required fullWidth label="별명을 입력하세요" onChange={onChangeNickname} />
          </Grid>
        </Grid>
        <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
          회원가입
        </Button>
        <Grid container>
          <Grid item>
            <Link
              onClick={() => {
                handleJoinModalClose();
                handleLoginModalOpen();
              }}
              variant="body2"
            >
              이미 계정이 있으신가요?
            </Link>
          </Grid>
        </Grid>
      </Box>
    </Modal>
  );
}

export default Join;
