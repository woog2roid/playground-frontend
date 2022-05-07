import * as React from 'react';

import useSWR from 'swr';
import fetcher from '@utils/swrFetcehr';
import axios from '@utils/axios';
import { IUser } from '@typings/dbTypes';

import { Box, TextField, Button, Modal, Grid, Link } from '@mui/material';
import { modalStyle, IsSatisfied } from './style';

type propsType = {
  isJoinModalOpen: boolean;
  closeJoinModal: () => void;
  openLoginModal: () => void;
};

export default function Join({ isJoinModalOpen, closeJoinModal, openLoginModal }: propsType) {
  const { mutate: mutateUserData } = useSWR<IUser>(`/user/me`, fetcher);

  const [id, setId] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [nickname, setNickname] = React.useState('');

  const onChangeId = React.useCallback((e) => {
    setId(e.target.value);
  }, []);
  const onChangePassword = React.useCallback((e) => {
    setPassword(e.target.value);
  }, []);
  const onChangeNickname = React.useCallback((e) => {
    setNickname(e.target.value);
  }, []);

  const [isIdUnique, setIsIdUnique] = React.useState(true);
  const [isPwOk, setIsPwOk] = React.useState(false);

  //ID 중복 체크
  React.useEffect(() => {
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
  React.useEffect(() => {
    const regPassword = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{5,}$/;
    if (regPassword.test(password)) setIsPwOk(true);
    else setIsPwOk(false);
  }, [password]);

  //회원가입 요청
  const onSubmitJoinForm = React.useCallback(
    async (e) => {
      e.preventDefault();
      if (!isIdUnique) alert('아이디 중복을 확인해주십시오.');
      else if (!isPwOk) alert('비밀번호를 확인해주십시오.');
      else if (id === '' || nickname === '') alert('아이디와 별명을 입력하세요.');
      else {
        await axios
          .post(`/user/join`, {
            id: id,
            password: password,
            nickname: nickname,
          })
          .then((res) => {
            console.log(res.data);
            mutateUserData();
            closeJoinModal();
            openLoginModal();
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
      <Box component="form" noValidate onSubmit={onSubmitJoinForm} sx={modalStyle}>
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
                closeJoinModal();
                openLoginModal();
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
