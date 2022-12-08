import { LanguageConsumer } from '../contexts/LanguageContext';

function ToggleLanguage() {

  return (
    <LanguageConsumer>
      {({ language, toggleLanguage }) => {
        return <button onClick={toggleLanguage}>{language === 'EN' ? 'ID' : 'EN'}</button>;
      }}
    </LanguageConsumer>
  );
}

export default ToggleLanguage;