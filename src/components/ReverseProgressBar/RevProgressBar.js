import React from "react";

function RevProgressBar(props) {
  const secondsNow = new Date().getSeconds();
  const refreshTime = 30 - (secondsNow % 30);
  const [counter, setCounter] = React.useState(refreshTime);

  React.useEffect(() => {
    const timer = setTimeout(() => {
      if (counter === 1) {
        setCounter(30);
      } else {
        setCounter(counter - 1);
      }
    }, 1000);

    return () => {
      clearTimeout(timer);
    };
  }, [counter]);

  return <div style={{color: '#233862', fontWeight: 'bold'}}>Refreshes in: {counter} seconds</div>;
}

export default RevProgressBar;
