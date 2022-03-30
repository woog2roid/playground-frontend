import { Wrapper, Div, SearchWrapper, SearchIconWrapper, StyledInputBase as InputBase } from './style';
import { Search as SearchIcon } from '@mui/icons-material';
import Link from '@utils/NoneDecorationLink';
import useSWR from 'swr';
import fetcher from '@utils/swrFetcehr';
import { IUser } from '@utils/dbTypes';

export default function TopNav() {
  const { data: userData, error } = useSWR<IUser>(`${process.env.REACT_APP_SERVER}/user/me`, fetcher);

  return (
    <Wrapper>
      <Div>
        <Link to="./game" className="topnav-items hover">
          게임
        </Link>
        <Link to="./chat" className="topnav-items hover">
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
        <div className="topnav-items">
          <SearchWrapper>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <InputBase placeholder="ID로 친구 찾기" />
          </SearchWrapper>
        </div>
      </Div>
    </Wrapper>
  );
}
