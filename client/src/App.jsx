import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { appContext as AppContext } from './Context';
import axios from 'axios';

import SignIn from './pages/SignIn';
import SelectModule from './pages/SelectModule';
import NavBar from './components/NavBar';
import ModuleSwitch from './components/ModuleSwitch';

import { modules } from './pages/Modules/modules';

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    axios
      .get('/api/auth/check')
      .then((res) => setUser(res.data.user))
      .catch(console.log);
  }, []);

  return (
    <AppContext.Provider value={{ user, setUser }}>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<SignIn />} />
          <Route element={<NavBar />}>
            <Route path='/tests' element={<SelectModule />} />
            {modules.map((item) => (
              <Route
                key={item.id}
                path={`/tests/${item.id}`}
                element={<ModuleSwitch moduleId={item.id} />}
              />
            ))}
          </Route>
        </Routes>
      </BrowserRouter>
    </AppContext.Provider>
  );
}

export default App;
