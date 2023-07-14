// import React, { useState } from 'react';
// import '../Timer.css';

// const startDate = new Date();
// const Timer = ({ end }) => {
//   const[rHour, setRHour] = useState(2); //countdown 2 hours.
//   const[rMin, setRMin] = useState(0);
//   const[rSec, setRSec] = useState(0);

//   function getTime(){
//     const finishHours = startDate.getHours() + 2 + startDate.getMinutes() / 60 + startDate.getSeconds() / 3600;
//     const currentHours =  new Date().getHours() + new Date().getMinutes() / 60 + new Date().getSeconds() / 3600;
//     const remainingHours = finishHours - currentHours;

//     const remainingHour = Math.floor(remainingHours);
//     const remainingMinute = Math.floor((remainingHours - remainingHour) * 60);
//     const remainingSecond = Math.floor(((remainingHours - remainingHour) * 60 - remainingMinute)*60)

//     setRHour(remainingHour);
//     setRMin(remainingMinute);
//     setRSec(remainingSecond);
//     console.log("count")
//   }

//   useEffect(() => {
//     const i = setInterval(getTime, 1000);
//     return () => clearInterval(i);
//   }, [end]);

//   return(
//     <div className="timer-container">
//       <div className="numbers">
//         <span className = "num-span">{("0" + rHour).slice(-2)}</span>
//         <span className = "segment">:</span>
//         <span className = "num-span">{("0" + rMin).slice(-2)}</span>
//         <span className = "segment">:</span>
//         <span className = "num-span">{("0" + rSec).slice(-2)}</span>
//       </div>
//       <div class="sub-numbers">
//         <span className = "sub-span">Uur</span>
//         <span></span>
//         <span className = "sub-span">Min</span>
//         <span></span>
//         <span className = "sub-span">Sec</span>
//       </div>
//     </div>
//   );
// };

// export {Timer};

import { CCol, CRow } from "@coreui/react";
import React from "react";
import { CountdownCircleTimer } from "react-countdown-circle-timer";
// import "./styles.css";

const minuteSeconds = 60;
const hourSeconds = 3600;
const daySeconds = 86400;
const exp = localStorage.getItem("exp");
const expiryDate = localStorage.getItem("expiry");

const timerProps = {
  isPlaying: true,
  size: 0,

  strokeWidth: 3,
};

const isAuthenticated = () => {
  if (expiryDate * 1000 > Date.now()) {
   
  }else{
    window.location.reload();
  }
};

const renderTime = (dimension, time) => {
  localStorage.setItem("endtime", time);
  isAuthenticated()
  return (
    <div className="time-wrapper">
      <div className="time">{time}</div>
      <div>{dimension}</div>
    </div>
  );
};

const getTimeSeconds = (time) => (minuteSeconds - time) | 0;
const getTimeMinutes = (time) => ((time % hourSeconds) / minuteSeconds) | 0;
const getTimeHours = (time) => ((time % daySeconds) / hourSeconds) | 0;
const getTimeDays = (time) => (time / daySeconds) | 0;

export default function Timmers() {
  const stratTime = Date.now() / 1000;
  // console.log(stratTime)// use UNIX timestamp in seconds
  const endTime = (expiryDate * 1000) / 1000;
  // const endTime = stratTime + 243248; // use UNIX timestamp in seconds

  const remainingTime = endTime - stratTime;
  const days = Math.ceil(remainingTime / daySeconds);
  const daysDuration = days * daySeconds;



  return (
    <div className="App">
      {/* <CountdownCircleTimer
        {...timerProps}
        colors={[["#7E2E84"]]}
        duration={daysDuration}
        initialRemainingTime={remainingTime}
      >
        {({ elapsedTime }) =>
          renderTime("days", getTimeDays(daysDuration - elapsedTime))
        }
      </CountdownCircleTimer> */}
      <CRow>
        <CCol>
          <CountdownCircleTimer
            {...timerProps}
            colors={[["#218380"]]}
            duration={daySeconds}
            initialRemainingTime={remainingTime % daySeconds}
            onComplete={(totalElapsedTime) => [
              remainingTime - totalElapsedTime > hourSeconds,
            ]}
          >
            {({ elapsedTime }) =>
              renderTime("ชั่วโมง", getTimeHours(daySeconds - elapsedTime))
            }
          </CountdownCircleTimer>
        </CCol>

        <CCol>
          <CountdownCircleTimer
            {...timerProps}
            colors={[["#218380"]]}
            duration={hourSeconds}
            initialRemainingTime={remainingTime % hourSeconds}
            onComplete={(totalElapsedTime) => [
              remainingTime - totalElapsedTime > minuteSeconds,
            ]}
          >
            {({ elapsedTime }) =>
              renderTime("นาที", getTimeMinutes(hourSeconds - elapsedTime))
            }
          </CountdownCircleTimer>
        </CCol>
        <CCol>
          <CountdownCircleTimer
            {...timerProps}
            colors={[["#218380"]]}
            duration={minuteSeconds}
            initialRemainingTime={remainingTime % minuteSeconds}
            onComplete={(totalElapsedTime) => [
              remainingTime - totalElapsedTime > 0,
            ]}
          >
            {({ elapsedTime }) =>
              renderTime("วินาที", getTimeSeconds(elapsedTime))
            }
          </CountdownCircleTimer>
        </CCol>
      </CRow>
    </div>
  );
}
