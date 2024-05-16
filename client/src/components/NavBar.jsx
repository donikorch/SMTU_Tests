import { useContext } from 'react';
import { appContext } from '../Context';
import { useNavigate } from 'react-router-dom';
import { Outlet } from 'react-router-dom';
import axios from 'axios';

import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';

function NavBar() {
  const { user, setUser } = useContext(appContext);

  const navigate = useNavigate();

  const onHandleLogout = async (e) => {
    e.preventDefault();

    const res = await axios.get('/api/auth/logout');

    if (res.data.message === 'success') {
      setUser(null);
      navigate('/');
    }
  };

  return (
    <>
      <Navbar bg='secondary' data-bs-theme='dark'>
        <Container>
          <Navbar.Brand href='/tests'>
            {user?.lastName} {user?.firstName}
          </Navbar.Brand>
          <Navbar.Collapse className='justify-content-end'>
            <Nav>
              <Nav.Link onClick={(e) => onHandleLogout(e)}>Выйти</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <main className='main'>
        <Outlet />
      </main>
    </>
  );
}

export default NavBar;
