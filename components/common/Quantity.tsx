import React, { useState } from "react";
import { FiPlus } from "react-icons/fi";
import { PiMinus } from "react-icons/pi";

export default function Quantity({
  defaultValue = 1,
  onDecrease,
  onIncrease,
}: {
  defaultValue?: number;
  onDecrease?: (value: number) => void;
  onIncrease?: (value: number) => void;
}) {
  const [count, setCount] = useState(defaultValue);

  const handleMinusClick = () => {
    if (count > 0) {
      const updatedCount = count - 1;
      setCount(updatedCount);
      onDecrease && onDecrease(updatedCount);
    }
  };

  const handlePlusClick = () => {
    const updatedCount = count + 1;
    setCount(updatedCount);
    onIncrease && onIncrease(updatedCount);
  };

  return (
    <div className="flex items-center border-2 rounded-md gap-1 font-semibold md:w-28 w-20 justify-around">
      <PiMinus onClick={handleMinusClick} className="cursor-pointer" />
      <p className="bg-primary p-1 px-3 text-white">{count}</p>
      <FiPlus onClick={handlePlusClick} className="cursor-pointer" />
    </div>
  );
}
