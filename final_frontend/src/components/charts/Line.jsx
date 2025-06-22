import {Line} from 'react-chartjs-2'
import 'chartjs-adapter-date-fns';  //This lets Chart.js understand and format timestamps (e.g., for x: Date.now()).
//Without it, TimeScale or realtime axes will break.
import streamingPlugin from 'chartjs-plugin-streaming';
import React, { useState, useEffect, useRef } from 'react';
import { LineChartData } from './FakeData'
import {Chart as ChartJS,
     CategoryScale,
     LinearScale,
     PointElement,
     LineElement,
     Title,
     Tooltip,
     Legend,
     TimeScale,     
} from 'chart.js'

ChartJS.register(
     CategoryScale,
     LinearScale,
     PointElement,
     LineElement,
     Title,
     Tooltip,
     Legend,
     streamingPlugin,
     TimeScale,
)



// let eyeClosedStartTime = null;
// let prolongedEyeClosureCount = 0;

function getBlinkSignal() {
  // Randomly simulate eye open (1) or closed (0)
  const isBlink = Math.random() < 0.5;  // 20% chance of blink
  return isBlink ? 0 : 1;
}


const data = {
  datasets: [
    {
      label: 'Blink State',
      borderColor: '#0077cc',
      data: [],
      stepped: true, // This is important for binary signals
    }
  ]
};


export const LineGraph = () => {
  const [count, setCount] = useState(0);
  const eyeClosedStartTimeRef = useRef(null);
   
  const options = {
  scales: {
    x: {
      type: 'realtime',
      realtime: {
        duration: 20000,
        refresh: 1000,
        delay: 1000,
        onRefresh: chart => {
          const signal = getBlinkSignal();  // or real sensor value
          const now = Date.now();

  // Track eye closure duration
  if (signal === 0 && eyeClosedStartTimeRef.current === null) {
    // Eye just closed
    eyeClosedStartTimeRef.current = now;
  }

  if (signal === 1 && eyeClosedStartTimeRef.current !== null) {
    // Eye just opened → calculate duration
    const durationMs = now - eyeClosedStartTimeRef.current;
    const durationSec = durationMs / 1000;

    if (durationSec >= 3) {
      //prolongedEyeClosureCount++;
      //console.log(`👁️ Prolonged eye closure: ${durationSec.toFixed(1)}s (Total: ${prolongedEyeClosureCount})`);
       setCount(prev => prev + 1);
      console.log(`👁️ Prolonged: ${durationSec.toFixed(1)}s`);    
    }

    //eyeClosedStartTime = null;
    eyeClosedStartTimeRef.current = null;
  }


          chart.data.datasets[0].data.push({
            x: now,
            y: signal,
          });
        }
      }
    },
    y: {
      min: -0.2,
      max: 1.2,
      ticks: {
        stepSize: 1,
        callback: val => {
          if (val === 1) return 'Open';
          if (val === 0) return 'Closed';
          return '';
        }//(val === 1 ? 'Open' : 'Closed')
      },
      title: {
        display: true,
        text: 'Eye State'
      }
    }
  }
};

  return (
    <div className="w-[900px] mx-auto">
      <Line options={options} data={data} />
      <p className="text-left mt-4 font-semibold text-lg text-red-600">
        Prolonged Eye Closures: {count}
      </p>
    </div>
  );
};
