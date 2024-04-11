import React from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

export interface DatePickerProps {
  selectedDate: Date;
  onChange: (date: Date) => void;
  dateFormat?: string;
  minDate?: Date;
  maxDate?: Date;
}

const DatePickerComponent: React.FC<DatePickerProps> = ({
  selectedDate,
  onChange,
  dateFormat = 'MM/dd/yyyy',
  minDate,
  maxDate,
}) => {
  return (
    <DatePicker
      selected={selectedDate}
      onChange={onChange}
      dateFormat={dateFormat}
      minDate={minDate}
      maxDate={maxDate}
    />
  );
};

export default DatePickerComponent;
