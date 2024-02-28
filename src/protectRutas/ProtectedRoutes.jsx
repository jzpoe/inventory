import {Navigate, Outlet} from 'react-router-dom'


export const ProtectedRoutes = () => {

    
    const token = localStorage.getItem('token');
  console.log(token)

    if (!token){
        return <Navigate to ='/Login' />
        
    }
  return (
    <div>
      <Outlet/>
    </div>
  )
}

 
