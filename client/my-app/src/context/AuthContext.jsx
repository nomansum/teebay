import React,{createContext,useState,useEffect} from 'react';



export const AuthContext = createContext();




export const AuthProvider = ({children}) =>{


    const [token,setToken] = useState(localStorage.getItem('token'));

    useEffect( ()=>{
     if(token) localStorage.setItem('token',token);
     else localStorage.removeItem('token');
    },[token]);


      const logout = () => {
    setToken(null);           // clear context state
    localStorage.removeItem('token'); // clear persistent storage
  };
      
return (
  
 <AuthContext.Provider value={{token,setToken,logout}}>
    {children}
 </AuthContext.Provider>



);


};