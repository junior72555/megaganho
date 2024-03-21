import { useEffect, useState } from "react";

interface CountDownProps {
  expiration_at: string;
}

export default function TextCountDown({ expiration_at }: CountDownProps) {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const TargetDate = new Date(expiration_at);

  const getTimeLeft = (TargetDate: Date) => {
    const now = new Date().getTime();
    const difference = TargetDate.getTime() - now;

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

  const [timeLeft, setTimeLeft] = useState(getTimeLeft(TargetDate));

  useEffect(() => {
    const timer = setInterval(() => {
      const time = getTimeLeft(TargetDate);

      setTimeLeft(time);

      if (time.total <= 0) {
        clearInterval(timer);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [TargetDate]);

  if (!timeLeft || timeLeft.total <= 0) return null

  return (
    <>
      Bônus expira em: {timeLeft.hours.toString().padStart(2, '0')}:{timeLeft.minutes.toString().padStart(2, '0')}:{timeLeft.seconds.toString().padStart(2, '0')}
    </>
  )
}