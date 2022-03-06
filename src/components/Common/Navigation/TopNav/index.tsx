import {
  Wrapper,
  Div,
  SearchWrapper,
  SearchIconWrapper,
  StyledInputBase as InputBase,
} from './style';
import { Search as SearchIcon } from '@mui/icons-material';
import Link from '@utils/Link';

function TopNav() {
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
        <Link to="./myprofile" className="topnav-items hover">
          내 정보
        </Link>
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

export default TopNav;
