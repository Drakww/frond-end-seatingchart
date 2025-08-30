
import { Outlet } from 'react-router-dom'
import { AuthProvider } from '../context/AuthContext'

const AppLayout = () => {
  return (
    <div className='App'>
        <AuthProvider>
          <Outlet/>
        </AuthProvider>
    </div>
  )
}

export default AppLayout