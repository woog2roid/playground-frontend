import * as React from 'react';

import axios from '@utils/axios';
import useSWR from 'swr';
import fetcher from '@utils/swrFetcehr';
import { IUser, IFriends } from '@typings/dbTypes';

import { Box, TextField, Button, Modal, Grid, Link } from '@mui/material';
import { modalStyle } from './style';

type propsType = {
  isLoginModalOpen: boolean;
  closeLoginModal: () => void;
  openJoinModal: () => void;
};

export default function Login({ isLoginModalOpen, closeLoginModal, openJoinModal }: propsType) {
  const { mutate: mutateUserData } = useSWR<IUser>(`/user/me`, fetcher);
  const { mutate: mutateFriendData } = useSWR<IFriends>(`/friend`, fetcher);

  const [id, setId] = React.useState('');
  const [password, setPassword] = React.useState('');
  const onChangeId = React.useCallback((e) => {
    setId(e.target.value);
  }, []);
  const onChangePassword = React.useCallback((e) => {
    setPassword(e.target.value);
  }, []);

  const onSubmitLoginForm = React.useCallback(
    async (e) => {
      e.preventDefault();
      if (id === '' || password === '') {
        alert('아이디 혹은 비밀번호를 입력하세요');
      } else {
        await axios
          .post(`/user/login`, {
            id: id,
            password: password,
          })
          .then((res) => {
            console.log(res.data);
            mutateUserData();
            mutateFriendData();
            closeLoginModal();
          })
          .catch((err) => {
            alert(`로그인에 실패했습니다.`);
          });
      }
    },
    [id, password],
  );

  return (
    <Modal open={isLoginModalOpen}>
      <Box component="form" noValidate onSubmit={onSubmitLoginForm} sx={modalStyle}>
        <TextField margin="normal" required fullWidth label="아이디를 입력하세요" autoFocus onChange={onChangeId} />
        <TextField
          margin="normal"
          required
          fullWidth
          label="비밀번호를 입력하세요"
          type="password"
          autoComplete="current-password"
          onChange={onChangePassword}
        />
        <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
          로그인
        </Button>
        <Grid container>
          <Grid item>
            <Link
              onClick={() => {
                closeLoginModal();
                openJoinModal();
              }}
              variant="body2"
            >
              회원가입하러 가기
            </Link>
          </Grid>
        </Grid>
      </Box>
    </Modal>
  );
}
