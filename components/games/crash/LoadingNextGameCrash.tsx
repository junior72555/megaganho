"use client"
import { useEffect, useState } from "react";

interface LoadingNextGameCrashProps {
  date?: string
}

export default function LoadingNextGameCrash({ date }: LoadingNextGameCrashProps) {
  const [targetDate, setTargetDate] = useState(() => {
    if (!date) return null
    return new Date(date)
  });

  const getTimeLeft = (targetDate: Date | null) => {
    if (!targetDate) return null

    const now = new Date().getTime();
    const difference = targetDate.getTime() - now;

    const seconds = Math.floor((difference % (1000 * 60)) / 1000);
    const miliseconds = Math.floor((difference % (1000 * 60)) / 100);

    return {
      total: difference,
      seconds,
      miliseconds
    };
  };

  const [timeLeft, setTimeLeft] = useState(getTimeLeft(targetDate));

  useEffect(() => {
    const timer = setInterval(() => {
      const time = getTimeLeft(targetDate ?? null);

      if (!time) return

      setTimeLeft(time);

      if (time.total <= 0) {
        clearInterval(timer);
      }
    }, 10);

    return () => clearInterval(timer);
  }, [targetDate]);

  useEffect(() => {
    if (!date) return
    setTargetDate(new Date(date))
  }, [date])

  if (!timeLeft || timeLeft.total <= 0) return null;

  return (
    <div className="absolute top-0 left-0 w-full h-full flex flex-col items-center justify-center">
      <div className="relative rounded-xl w-[90%] h-10 bg-zinc-700 px-3 justify-center items-center flex">
        <span className="z-50 text-green-500 text-sm text-center font-semibold">
          Começando em: {timeLeft.seconds.toString().padStart(2, '0')}s
        </span>
        <div
          style={{ width: `${(timeLeft.miliseconds / 100) * 100}%` }}
          className="z-10 left-2 absolute top-2  bg-zinc-900 h-6 rounded transition-all"
        ></div>
      </div>
    </div>
  )
}