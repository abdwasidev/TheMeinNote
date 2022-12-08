import { ThemeConsumer } from '../contexts/ThemeContext';
import { FaMoon, FaSun } from 'react-icons/fa';

function ToggleTheme() {

  return (
    <ThemeConsumer>
      {({ theme, toggleTheme }) => {
        return <button onClick={toggleTheme}>{theme === 'light' ? <FaSun /> : <FaMoon />}</button>;
      }}
    </ThemeConsumer>
  );
}

export default ToggleTheme;