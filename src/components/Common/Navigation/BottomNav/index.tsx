import { Wrapper, Div } from './style';
import { Home, People } from '@mui/icons-material';
import Footer from '@components/Common/Footer';

function BottomNav() {
  return (
    <Wrapper>
      <Div>
        <Home fontSize="large" className="nav-items hover" />
      </Div>
      <Div>
        <Footer/>
      </Div>
      <Div>
        <People fontSize="large" className="nav-items hover" />
      </Div>
    </Wrapper>
  );
}

export default BottomNav;
