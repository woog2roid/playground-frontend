import { useState, useCallback } from 'react';

import axios from 'axios';
import { Box, TextField, Button, Modal, Grid, Link } from '@mui/material';
import { modalStyle } from './style';

type propsType = {
  isLoginModalOpen: boolean;
  handleLoginModalClose: () => void;
  handleJoinModalOpen: () => void;
};

function Login({
  isLoginModalOpen,
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
      e.preventDefault();
      if (id === '' || password === '') {
        alert('아이디 혹은 비밀번호를 입력하세요');
      } else {
        await axios
          .post(
            `${process.env.REACT_APP_SERVER}/user/login`,
            {
              id: id,
              password: password,
            },
            {
              withCredentials: true,
            },
          )
          .then((res) => {
            console.log(res.data);
            handleLoginModalClose();
          })
          .catch((err) => {
            alert(`로그인에 실패했습니다.\n아이디와 비밀번호를 확인해주세요.`);
          });
      }
    },
    [id, password],
  );

  return (
    <Modal open={isLoginModalOpen}>
      <Box component="form" noValidate onSubmit={onSubmit} sx={modalStyle}>
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
