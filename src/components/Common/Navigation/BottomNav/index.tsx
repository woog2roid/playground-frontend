import { Wrapper, Div } from './style';
import { Home, People, Menu } from '@mui/icons-material';
import Footer from '@components/Common/Footer';

export default function BottomNav() {
  return (
    <Wrapper>
      <Div>
        <Home fontSize="large" className="nav-items hover" />
      </Div>
      <Div>
        <Footer />
      </Div>
      <Div>
        <People fontSize="large" className="nav-items hover" />
        <Menu fontSize="large" className="nav-items hover" />
      </Div>
    </Wrapper>
  );
}
