import { useState } from 'react';

function App() {
  const [isVisible, setIsVisible] = useState(true);

  const toggleDiv = () => {
    setIsVisible(!isVisible);
  };

  return (
    <div>
      {isVisible && (
        <div id='myDiv'>
          <p>Hello World!</p>
        </div>
      )}
      <button onClick={toggleDiv}>Toggle Div</button>
    </div>
  );
}

export default App;
