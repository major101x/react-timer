import './App.scss';
import React, { useEffect, useState } from 'react';

const App = () => {
  const [timer, setTimer] = useState(1500);
  const [breakLength, setBreakLength] = useState(5);
  const [sessionLength, setSessionLength] = useState(25);
  const [play, setPlay] = useState(false);
  const [timingType, setTimingType] = useState('SESSION');

  let timeoutId;

  const timeout = () => {
    timeoutId = setTimeout(() => {
      if (timer > 0 && play) {
        setTimer(timer - 1);
      } else if (timer === 0) {
        const audio = document.getElementById('beep');
        audio.play();
        if (timingType === 'SESSION') {
          setTimingType('BREAK');
          setTimer(breakLength * 60);
        } else {
          setTimingType('SESSION');
          setTimer(sessionLength * 60);
        }
      }
    }, 1000);
  };

  const formatTime = () => {
    const minutes = Math.floor(timer / 60);
    let seconds = timer - minutes * 60;
    return (
      (minutes < 10 ? '0' + minutes : minutes) +
      ':' +
      (seconds < 10 ? '0' + seconds : seconds)
    );
  };

  const handleBreakIncrease = () => {
    if (breakLength < 60) {
      setBreakLength(breakLength + 1);
    }
  };

  const handleBreakDecrease = () => {
    if (breakLength > 1) {
      setBreakLength(breakLength - 1);
    }
  };

  const handleSessionIncrease = () => {
    if (sessionLength < 60) {
      setSessionLength(sessionLength + 1);
      if (!play) {
        setTimer((sessionLength + 1) * 60);
      }
    }
  };

  const handleSessionDecrease = () => {
    if (sessionLength > 1) {
      setSessionLength(sessionLength - 1);
      if (!play) {
        setTimer((sessionLength - 1) * 60);
      }
    }
  };

  const handlePlay = () => {
    clearTimeout(timeoutId);
    setPlay(!play);
  };

  const handleReset = () => {
    clearTimeout(timeoutId);
    setPlay(false);
    setTimer(1500);
    setBreakLength(5);
    setSessionLength(25);
    setTimingType('SESSION');
    const audio = document.getElementById('beep');
    audio.pause();
    audio.currentTime = 0;
  };

  useEffect(() => {
    timeout();
    if (!play) {
      clearTimeout(timeoutId);
    }
    return () => clearTimeout(timeoutId);
  }, [play, timer, breakLength, sessionLength, timingType]);

  return (
    <div className="App">
      <div id="container">
        <header id="main-title">25 + 5 Clock</header>
        <div id="options">
          <div id="break-label" className="label">
            <p>Break Length</p>
            <button
              disabled={play}
              id="break-decrement"
              onClick={handleBreakDecrease}
            >
              <i className="fa-solid fa-angle-down fa-2xl"></i>
            </button>
            <div id="break-length" className="length">
              {breakLength}
            </div>
            <button
              disabled={play}
              id="break-increment"
              onClick={handleBreakIncrease}
            >
              <i className="fa-solid fa-angle-up fa-2xl"></i>
            </button>
          </div>
          <div id="session-label" className="label">
            <p>Session Length</p>
            <button
              id="session-decrement"
              onClick={handleSessionDecrease}
              disabled={play}
            >
              <i className="fa-solid fa-angle-down fa-2xl"></i>
            </button>
            <div id="session-length" className="length">
              {sessionLength}
            </div>
            <button
              id="session-increment"
              onClick={handleSessionIncrease}
              disabled={play}
            >
              <i className="fa-solid fa-angle-up fa-2xl"></i>
            </button>
          </div>
        </div>
        <div id="timer">
          <div id="timer-label">{timingType}</div>
          <div id="time-left">{formatTime()}</div>
        </div>
        <div id="timer-control">
          <button id="start_stop" onClick={handlePlay}>
            <i className="fa-solid fa-play"></i>
            <i className="fa-solid fa-pause"></i>
          </button>
          <button id="reset" onClick={handleReset}>
            <i className="fa-solid fa-rotate"></i>
          </button>
        </div>
      </div>
      <audio
        id="beep"
        preload="auto"
        src="https://raw.githubusercontent.com/freeCodeCamp/cdn/master/build/testable-projects-fcc/audio/BeepSound.wav"
      ></audio>
    </div>
  );
};

export default App;
