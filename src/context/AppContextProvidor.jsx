import { createContext, useEffect, useState } from 'react'
import { fetchUser } from '../services/AuthService';
import toast from 'react-hot-toast';

const AppContext = createContext();

const AppContextProvidor = ({children}) => {
    
    const [user, setUser] = useState(null);
    const [loader, setLoader] = useState(true);

    useEffect(() => {

      const getUser = async () => {
        
        // Gets the token from local storage if exists
        const token = localStorage.getItem("token");
        if (!token) {
          setLoader(false);
          return;
        }
        
        // Try to fetch user details or catches error and navigate to signin route
        try {
          const userData = await fetchUser();
          setUser(userData);
        } 
        catch (error) {
          console.log(error);
          localStorage.clear();
          setUser(null);
          toast.error(error.message);
        }
        finally {
          setLoader(false);
        }
      }
      getUser();

    }, []);


  return (
    <AppContext.Provider value={{ user, setUser, loader }}>
        {children}
    </AppContext.Provider>
  )
}

export { AppContext }
export default AppContextProvidor