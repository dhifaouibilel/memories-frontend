import {useState, createContext, useContext, useMemo} from 'react'
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { amber, grey,  } from "@mui/material/colors";


const ThemeContext = createContext();

export const useThemeContext = () => useContext(ThemeContext)

export function ThemeContextProvider({children}) {
    const [mode, setMode] = useState('dark');

    const toggleTheme = () => {
        setMode(prevMode => prevMode==='light'? 'dark' : 'light');
    }
    const theme1= createTheme()
    const theme = useMemo(
        () =>
          createTheme({
            palette: {
              mode: mode,
            //   bgcolor: "background.default",
              tertiary: {
                main: '#FF8A65',
              },
              notifUnviewed:(mode === "light"
              ? '#e9e9e9'
              : '#222E35'),
              userName:(mode === "light"
              ? '#04141D'
              : '#FFC300')
              ,
              notifBadge: {
                main: '#FFC300',
                contrastText: '#fff',
              },
              like_btn: {
                main: '#ff4081',
                contrastText: '#fff',
              },
              delete_btn: {
                main: '#eb344d',
                contrastText: '#fff',
              },
              settings: {
                main: '#fff',
              },
              notif: {
                main: '#eb344d',
                contrastText: '#fff',
              },
              comment: {
                main: '#ed40ff',
                contrastText: '#fff',
              },
              submit_btn: {
                main: '#673AB7', //#2979ff
                contrastText: '#fff',
              },
              clear_btn: {
                main: '#ff40b2',
                contrastText: '#fff',
              },
              edit_btn: {
                ...(mode === "light"
                    ? {
                        main: '#000',
                        contrastText: '#fff',
                    }
                    : {
                        main: '#fff',
                        contrastText: '#000',
                    })
                
              },
              background: {
                ...(mode === "light"
                    ? {
                        default: '#EEEEEE',
                        // '#f7f8fc',
                        paper: '#fff',
                    }
                    : {
                        default: '#020A0E', // set the default background color
                        paper: '#04141D',
                    })
              } 
            },
            components: {
                MuiGrid: {
                  styleOverrides: {
                    root: {
                      [theme1.breakpoints.down('sm')]: {
                          flexDirection: 'column-reverse',
                        }
                    }
                  }
                  }
              }
          }),
        [mode],
      );
    
    return (
        <ThemeContext.Provider value={{theme, toggleTheme}}>
            <ThemeProvider theme={theme}>
                {children}
            </ThemeProvider>
        </ThemeContext.Provider>
    )
}

