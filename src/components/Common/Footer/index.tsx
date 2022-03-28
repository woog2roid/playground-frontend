import { Wrapper } from './style';
import GithubMark from '@images/GitHub-Mark.svg';

function Footer() {
  return (
    <Wrapper>
      Made By Woog2roid
      <a href="https://github.com/woog2roid/" target="_blank" rel="noreferrer">
        <img src={GithubMark} alt="" width="12px" height="12px" />
      </a>
    </Wrapper>
  );
}

export default Footer;
