import React, { useEffect, useState } from "react";

const Home: React.FC = () => {
  const [counter, setCounter] = useState(1);

  const onClick = () => {
    setCounter(counter + 1);
  };

  const testFunction = () => {
    console.log("counter: " + counter);
  };

  useEffect(() => {
    testFunction();
  }, [counter]);

  return (
    <div>
      <button onClick={onClick}>Increase</button>
      <div>Counter: {counter}</div>
    </div>
  );
};

export default Home;
