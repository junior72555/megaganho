import { Line } from "react-chartjs-2";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from 'chart.js';
import { useEffect, useRef } from "react";

type ChartCrashProps = {
  float: number
  started_at?: string;
}

export default function ChartCrash({ started_at, float }: ChartCrashProps) {
  const ref = useRef<{
    src?: string;
  }>();

  useEffect(() => {
    ref.current = new Image(80, 50) as any;
    if (ref.current)
      ref.current.src = `/${process.env.NEXT_PUBLIC_SITE_NAME}/crash-line-icon.svg`;
  }, []);

  const diffSeconds = new Date().getTime() - new Date(started_at ?? new Date()).getTime();

  const seconds = started_at ? Number((diffSeconds / 1000).toFixed(2)) : 0;

  ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Filler,
    Legend
  );

  const options = {
    aspectRatio: (16 / 9),
    responsive: true,
    plugins: {
      title: {
        display: false,
      },
      legend: {
        display: false,
      },
      tooltip: {
        enabled: false,
      }
    },
    elements: {
      line: {
        borderWidth: 6,
        tension: 0.9,
      },
      point: {
        // radius: 1,
        hitRadius: 0,
        radius: 28,
        rotation: 0,
        pointStyle: [false, ref.current],
        z: 999
      }
    },
    scales: {
      x: {
        type: 'linear',
        offset: 0,
        min: 0,
        max: (seconds < 3.81) ? 3.81 * 1.05 : seconds * 1.05,
        ticks: {
          color: 'rgba(255, 255, 255, 0.2)',
          callback: function (value: any) {
            return Number(value).toFixed(0) + 's';
          },
          font: {
            size: 15,
          },
          maxTicksLimit: 4,
        },
        beginAtZero: true,
      },
      y: {
        type: 'linear',
        suggestedMin: 1,
        suggestedMax: 1.45,
        min: 1,
        max: float < 1.45 ? (1.45 * 1.10) : (float * 1.10).toFixed(2),
        beginAtZero: true,
        display: true,
        title: {
          display: false,
        },
        ticks: {
          maxTicksLimit: 4,
          sampleSize: 0.25,
          color: 'rgba(255, 255, 255, 0.2)',
          callback: function (value: any) {
            if (value > float) {
              return;
            }

            return 'x' + value;
          },
          font: {
            size: 15,
          },
        },
        grid: {
          color: 'rgba(255, 255, 255, 0.2)',
        }
      },
    },
    animations: {
      duration: 0,
    },
    transition: {
      duration: 0
    },
  } as any;

  const data = {
    labels: [0, seconds],
    datasets: [
      {
        label: 'Crash',
        data: [1, started_at ? float : 0.8],
        fill: false,
        borderColor: '#3bfb82',
        backgroundColor: '#3bfb82c2',
      },
    ],
  };

  return (
    <div className="w-full h-full flex items-center justify-center" >
      <Line
        data={data}
        options={options}
      />
    </div >
  )
}