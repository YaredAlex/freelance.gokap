import React, { createContext, useContext, useState } from 'react'

type ThemeType = {
    isDark:boolean;
    setIsDark:React.Dispatch<React.SetStateAction<boolean>>;
}
const ThemeContext = createContext<ThemeType>({isDark:false,setIsDark:(v)=>v})
//Creating customUseContextHook
export const useThemeContext = ()=>{
    return useContext(ThemeContext);
}
const ThemecontextProvider = ({children}:{children:React.ReactNode}) => {
    const [isDark,setIsDark] = useState(false)
  return (
    <ThemeContext.Provider value={{isDark,setIsDark}}>
        {children}
    </ThemeContext.Provider>
  )
}

export default ThemecontextProvider