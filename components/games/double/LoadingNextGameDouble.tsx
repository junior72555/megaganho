"use client"
import { useEffect, useState } from "react";

interface LoadingNextGameDoubleProps {
  date?: string
}

export default function LoadingNextGameDouble({ date }: LoadingNextGameDoubleProps) {
  const [targetDate, setTargetDate] = useState(() => {
    if (!date) return null
    return new Date(date)
  });

  const getTimeLeft = (targetDate: Date | null) => {
    if (!targetDate) return null

    const now = new Date().getTime();
    const difference = targetDate.getTime() - now;

    const seconds = Math.floor((difference % (1000 * 60)) / 1000);
    const realmiliseconds = Math.floor((difference % (1000 * 60)) / 100);
    const miliseconds = String(Math.floor((difference % (1000 * 60)) / 10)).replace(String(seconds), '');

    return {
      total: difference,
      seconds,
      miliseconds,
      realmiliseconds
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
    }, 1);

    return () => clearInterval(timer);
  }, [targetDate]);

  useEffect(() => {
    if (!date) return
    setTargetDate(new Date(date))
  }, [date])

  if (!timeLeft || timeLeft.total <= 0) return null;

  return (
    <div className="relative rounded-xl w-full h-10 bg-zinc-700 px-3 justify-center items-center flex">
      <span className="z-50 text-green-500 text-sm text-center font-semibold">
        Começando em: {timeLeft.seconds.toString().padStart(2, '0')}:{timeLeft.miliseconds}
      </span>
      <div
        style={{ width: `${(timeLeft.realmiliseconds / 100) * 100}%` }}
        className="z-10 left-2 absolute top-2 bg-zinc-900 h-6 rounded transition-all"
      ></div>
    </div>
  )
}