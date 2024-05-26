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
          {user?.role === 'student' ? (
            <Navbar.Brand href='/tests'>{user?.name}</Navbar.Brand>
          ) : (
            <Navbar.Brand href='/teacher'>
              {user?.lastName} {user?.firstName}
            </Navbar.Brand>
          )}
          {user?.login === 'admin' ? (
            <Nav>
              <Nav.Link href='/teacher'>Управление группами</Nav.Link>
              <Nav.Link href='/admin'>Управление преподавателями</Nav.Link>
            </Nav>
          ) : (
            <>
              {user?.role === 'admin' && (
                <Nav>
                  <Nav.Link href='/teacher'>Управление группами</Nav.Link>
                </Nav>
              )}
            </>
          )}
          <Navbar.Collapse className='justify-content-end'>
            <Nav>
              <Nav.Link onClick={(e) => onHandleLogout(e)}>Выйти</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <main className='main'>
        <Container className='tests'>
          <Outlet />
        </Container>
      </main>
    </>
  );
}

export default NavBar;
