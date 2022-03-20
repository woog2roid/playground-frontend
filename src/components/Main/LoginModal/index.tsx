import { useState, useCallback } from 'react';

import axios from 'axios';
import { Box, TextField, Button, Modal, Grid, Link } from '@mui/material';
import { modalStyle } from './style';

type propsType = {
  isLoginModalOpen: boolean;
  handleLoginModalOpen: () => void;
  handleLoginModalClose: () => void;
  handleJoinModalOpen: () => void;
};

function Login({
  isLoginModalOpen,
  handleLoginModalOpen,
  handleLoginModalClose,
  handleJoinModalOpen,
}: propsType) {
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const onChangeId = useCallback((e) => {
    setId(e.target.value);
  }, []);
  const onChangePassword = useCallback((e) => {
    setPassword(e.target.value);
  }, []);

  const onSubmit = useCallback(
    async (e) => {
      /*
      e.preventDefault();
      if (id === '' || password === '') alert('아이디 혹은 비밀번호를 입력하세요');
      else {
        await axios
          .post(
            `${process.env.REACT_APP_SERVER}/auth/login`,
            {
              id: id,
              password: password,
            },
            {
              withCredentials: true,
              credentials: 'include',
            },
          )
          .then(async (res) => {})
          .catch((err) => {
            if (err.response.data.message === 'password not matched') alert('비밀번호를 확인하세요');
            else if (err.response.data.message === 'id not found') alert('아이디를 확인하세요');
            else alert('서버와의 통신 오류가 발생했습니다.');
          });
        }
        */
    },
    [
      /*id, password*/
    ],
  );

  return (
    <Modal open={isLoginModalOpen}>
      <Box component="form" onSubmit={onSubmit} sx={modalStyle}>
        <TextField
          margin="normal"
          required
          fullWidth
          label="아이디를 입력하세요"
          autoFocus
          onChange={onChangeId}
        />
        <TextField
          margin="normal"
          required
          fullWidth
          label="비밀번호를 입력하세요"
          type="password"
          autoComplete="current-password"
          onChange={onChangePassword}
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
        >
          로그인
        </Button>
        <Grid container>
          <Grid item>
            <Link
              onClick={() => {
                handleLoginModalClose();
                handleJoinModalOpen();
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

export default Login;
