import { useEffect, useState } from "react";

export interface TimerProps {
  onFinish?: Function;
  onTick?: (secondsLeft: number) => any;
  time: number;
}

export const Timer: React.FC<TimerProps> = ({ time, onFinish, onTick }) => {
  const [secondsLeft, setSecondsLEft] = useState(time);

  useEffect(() => {
    let timer: NodeJS.Timeout;

    onTick && onTick(secondsLeft);

    if (secondsLeft > 0) {
      timer = setTimeout(() => {
        setSecondsLEft((seconds) => seconds - 1);
      }, 1000);
    } else {
      onFinish && onFinish();
    }
    return () => clearTimeout(timer);
  }, [secondsLeft]);

  useEffect(() => setSecondsLEft(time), [time]);

  return (
    <div className="timer" /* onClick={()=>setSecondsLEft(time)} */>
      {secondsLeft}
    </div>
  );
};
