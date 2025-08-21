import { createContext, useState } from 'react'

const AppContext = createContext();

const AppContextProvidor = ({children}) => {
    
    const [user, setUser] = useState(null);
    const context = {
        user, setUser
    }

  return (
    <AppContext.Provider value={context}>
        {children}
    </AppContext.Provider>
  )
}

export default AppContextProvidor