import React from 'react';
import { useDispatch } from 'react-redux';
import authService from '../src/appwrite/auth'
import { login, logout } from './store/authSlice';
import { Header, Footer } from './components/index'
import { Outlet } from 'react-router-dom';


function App() {
  const [loading, setloading] = React.useState(false);
  const dispatch = useDispatch()
  React.useEffect(() => {
    authService.getCurrentUser()
      .then((userData) => {
        if (userData) {
          dispatch(login({ userData }))
        }
        else {
          dispatch(logout())
        }
      })
      .finally(() => setloading(false));
  }, [])


  return !loading ? (
    <div className='min-h-screen dlex flex-wrap content-between bg-gray-400'>
      <div className='w-full block'>

        <Header />

        <main>
          MAIN CONTENT {/* <Outlet/> */}
        </main>

        <Footer />

      </div>

    </div>
  ) : null;
}

export default App
