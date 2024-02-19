import { useEffect, useRef, useState } from "react";
import { WorkerInterval } from "./WorkerInterval";

function WorkerIntervalTest() {
  const workerIntervalRef = useRef<WorkerInterval | null>(null);

  const [count, setCount] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    handleStart();

    return () => {
      workerIntervalRef.current?.clearInterval();
    };
  }, []);

  const increment = () => {
    setCount((count) => count + 1);
  };

  const handleStart = () => {
    setIsActive(true);
    setIsPaused(false);
    workerIntervalRef.current = new WorkerInterval(() => {
      console.log("worker interval");
      increment();
    }, 1000);
  };

  const handlePause = () => {
    setIsPaused(true);
    workerIntervalRef.current?.clearInterval();
  };

  const handleReset = () => {
    setIsActive(false);
    workerIntervalRef.current?.clearInterval();
    setCount(0);
  };

  return (
    <div>
      <h2>Count: {count}</h2>

      {!isActive && <button onClick={handleStart}>Start</button>}

      {isActive && (
        <>
          {isPaused ? (
            <button onClick={handleStart}>Resume</button>
          ) : (
            <button onClick={handlePause}>Pause</button>
          )}
          <button onClick={handleReset}>Reset</button>
        </>
      )}
    </div>
  );
}

export default WorkerIntervalTest;
