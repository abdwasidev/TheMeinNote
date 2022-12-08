import React, { useEffect } from 'react';
import { Route, Routes, } from 'react-router-dom';
import ArchivePage from '../pages/ArchivePage';
import HomePage from '../pages/HomePage';
import NewNote from '../pages/NewNote';
import NoteHeader from './NoteHeader';
import NoteHeaderAuth from './NoteHeaderAuth';
import DetailPage from '../pages/DetailPage';
import NotFound  from '../pages/NotFound';
import LoginPage from '../pages/LoginPage';
import RegisterPage from '../pages/RegisterPage';
import { getUserLogged, putAccessToken } from '../utils/network-data';
import { ThemeProvider } from '../contexts/ThemeContext';
import { LanguageProvider } from '../contexts/LanguageContext';

function App() {
  const [authedUser, setAuthedUser] = React.useState(null);
  const [initializing, setInitializing] = React.useState(true);
  const [theme, setTheme] = React.useState(localStorage.getItem("theme") ?? "dark");
  const [language, setLanguage] = React.useState(localStorage.getItem("language") ?? "ID");

  const onloginSuccessHandler = async ({ accessToken }) => {
    putAccessToken(accessToken);
    const { data } = await getUserLogged();
    setAuthedUser(data);
  }

  const logoutHandler = () => {
    setAuthedUser(null);
    putAccessToken('');
  }

  const toggleTheme = () => {
    setTheme((prevTheme) => {
      const newTheme = prevTheme === 'light' ? 'dark' : 'light';
      localStorage.setItem("theme", newTheme);
      return newTheme;
    });
  };

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  const ThemeContextValue = React.useMemo(() => {
    return {
      theme,
      toggleTheme,
    };
  }, [theme]);

  const toggleLanguage = () => {
    setLanguage((prevLanguage) => {
      const newLanguage =  prevLanguage === 'EN' ? 'ID' : 'EN';
      localStorage.setItem("language", newLanguage);
      return newLanguage;
    });
  };

  const LanguageContextValue = React.useMemo(() => {
    return {
      language,
      toggleLanguage,
    };
  }, [language]);

  React.useState(() => {
    async function setCurrentUserLogged() {
      const { data } = await getUserLogged();
      setAuthedUser(data);
      setInitializing(false);
    };

    setCurrentUserLogged();
  }, [authedUser]);

  return (
    <>
      {(() => {
        if (initializing) {
          return null;
        }

        if (authedUser === null) {
          return (
            <ThemeProvider value={ThemeContextValue}>
              <LanguageProvider value={LanguageContextValue}>
                <div className='note-app'>
                  <NoteHeaderAuth />
                  <div className="note-app__body">
                    <main> 
                    <Routes>
                      <Route path="/*" element={<LoginPage loginSuccess={onloginSuccessHandler} />} />
                      <Route path="/register" element={<RegisterPage />} />
                      <Route path='*' element={<NotFound />} /> 
                    </Routes>
                    </main>
                  </div>
                </div>
              </LanguageProvider>
            </ThemeProvider>
          )
        }
        if (authedUser !== null) {
        return (
          <ThemeProvider value={ThemeContextValue}>
            <LanguageProvider value={LanguageContextValue}>
              <div className='note-app'>
                <NoteHeader user={authedUser} onButtonClick={logoutHandler}/>
                <div className="note-app__body">
                  <main> 
                  <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/archive" element={<ArchivePage />} />
                    <Route path="/new/notes" element={<NewNote />} />
                    <Route path="/notes/:id" element={<DetailPage />} />
                    <Route path="*" element={<NotFound />} />
                  </Routes>
                  </main>
                </div>
              </div>
            </LanguageProvider>
          </ThemeProvider>
        )}
      })()}
    </>
  );
}


export default App;