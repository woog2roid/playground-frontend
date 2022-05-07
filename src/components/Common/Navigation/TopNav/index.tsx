import * as React from 'react';

import useSWR from 'swr';
import axios from '@utils/axios';
import fetcher from '@utils/swrFetcehr';
import { IUser } from '@typings/dbTypes';

import { Wrapper, Div, SearchWrapper, SearchIconWrapper, StyledInputBase as InputBase } from './style';
import { Search as SearchIcon } from '@mui/icons-material';
import Link from '@styles/StyledComponents/NoneDecorationLink';
import FriendPopover from './FriendPopover';

export default function TopNav() {
  const { data: userData, error } = useSWR<IUser>(`/user/me`, fetcher);

  const [userDataForFriendPopover, setUserDataForFriendPopover] = React.useState<IUser | null>(null);
  const [errorDataForFriendPopover, setErrorDataForFriendPopover] = React.useState<String | null>(null);

  const [anchorElForFriendPopover, setAnchorElForFriendPopover] = React.useState<HTMLElement | null>(null);
  const [isFriendPopoverOpen, setIsFriendPopoverOpen] = React.useState<boolean>(false);
  const closeFriendPopover = () => {
    setIsFriendPopoverOpen(false);
  };

  const onSubmitFindById = React.useCallback((e) => {
    e.preventDefault();
    setAnchorElForFriendPopover(e.currentTarget);
    axios
      .get(`/user?id=${e.target.input.value}`)
      .then((res) => {
        setUserDataForFriendPopover(res.data);
        setErrorDataForFriendPopover(null);
      })
      .catch((err) => {
        setUserDataForFriendPopover(null);
        setErrorDataForFriendPopover(err.response.data.statusCode);
      });
  }, []);

  /*
    팝오버가 꺼진 후에는, null로 초기화
    popover가 꺼지는 것에 시간이 걸려서
    UX를 위해 setTimeout 이용하여서
    초기화가 진행되지 않은 상태를 보지 않도록
  */
  React.useEffect(() => {
    setTimeout(() => {
      if (!isFriendPopoverOpen) {
        setErrorDataForFriendPopover(null);
        setUserDataForFriendPopover(null);
        setAnchorElForFriendPopover(null);
      }
    }, 500);
  }, [isFriendPopoverOpen]);

  //data들이 불러져 온 후에, 팝오버가 켜져야 함.
  React.useEffect(() => {
    if (userDataForFriendPopover) {
      setIsFriendPopoverOpen(true);
    }
  }, [userDataForFriendPopover]);
  React.useEffect(() => {
    if (errorDataForFriendPopover) {
      setIsFriendPopoverOpen(true);
    }
  }, [errorDataForFriendPopover]);

  return (
    <>
      <Wrapper>
        <Div>
          <Link to="/" className="nav-items hover" onClick={() => alert('아직 개발중인 기능입니다 :(')}>
            게임
          </Link>
          <Link to="/chat" className="nav-items hover">
            채팅
          </Link>
        </Div>
        <Div>
          {userData && !error ? (
            <span className="welcome-text">
              {userData.nickname}({userData.id})님 환영합니다.
            </span>
          ) : (
            <span></span>
          )}
          <div className="nav-items">
            <SearchWrapper onSubmit={onSubmitFindById}>
              <SearchIconWrapper>
                <SearchIcon />
              </SearchIconWrapper>
              <InputBase name="input" placeholder="ID로 친구 찾기" />
            </SearchWrapper>
          </div>
        </Div>
      </Wrapper>

      <FriendPopover
        isOpen={isFriendPopoverOpen}
        anchorEl={anchorElForFriendPopover}
        onClose={closeFriendPopover}
        userData={userDataForFriendPopover}
        errorCode={errorDataForFriendPopover}
      />
    </>
  );
}
