import { useState } from 'react';
 
function useInput(defaultInput = '') {
  const [input, setInput] = useState(defaultInput);
 
  const inputHandler = (e) => {
    setInput(e.target.value);
  };
 
  return [input, inputHandler];
}
 
export default useInput;