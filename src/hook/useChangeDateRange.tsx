import { useState } from "react";

const initialDate = {
  date: new Date(),
};

export interface DateRangeType {
  date: Date;
}

const useChangeDateRange = (defaultDate?: DateRangeType) => {
  const [date, setDate] = useState(defaultDate || initialDate);

  const onChange = (e: Date) => {
    setDate({
      date: e,
    });
  };

  return { onChange, date, setDate };
};

export default useChangeDateRange;
