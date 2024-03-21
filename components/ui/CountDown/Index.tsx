import { useEffect, useState } from "react";

interface CountDownProps {
  minutes: number;
}

export default function CountDown({ minutes }: CountDownProps) {
  const [targetDate, setTargetDate] = useState(() => {
    const date = new Date();
    date.setMinutes(date.getMinutes() + minutes);
    return date;
  });

  const getTimeLeft = (targetDate: Date) => {
    const now = new Date().getTime();
    const difference = targetDate.getTime() - now;

    const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((difference % (1000 * 60)) / 1000);

    return {
      total: difference,
      hours,
      minutes,
      seconds
    };
  };

  const [timeLeft, setTimeLeft] = useState(getTimeLeft(targetDate));

  useEffect(() => {
    const timer = setInterval(() => {
      const time = getTimeLeft(targetDate);

      setTimeLeft(time);

      if (time.total <= 0) {
        clearInterval(timer);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  if (!timeLeft || timeLeft.total <= 0) return null

  return (
    <div className='mb-3 flex bg-rose-500 items-center justify-between p-4 rounded font-bold'>
      <div className='text-white uppercase text-base'>Bônus expira em:</div>
      <div className='flex gap-1 items-center text-xl'>
        <div className='bg-white text-black flex items-center justify-center rounded w-11 h-11'>
          {timeLeft.hours.toString().padStart(2, '0')}
        </div>
        :
        <div className='bg-white text-black flex items-center justify-center rounded w-11 h-11'>
          {timeLeft.minutes.toString().padStart(2, '0')}
        </div>
        :
        <div className='bg-white text-black flex items-center justify-center rounded w-11 h-11'>
          {timeLeft.seconds.toString().padStart(2, '0')}
        </div>
      </div>
    </div>
  )
}