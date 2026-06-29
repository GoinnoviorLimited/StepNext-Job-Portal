import React from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./MonthYearPicker.css";

const MonthYearPicker = ({ value, onChange, disabled = false, placeholder = "Select date" }) => {
  // Convert MM/YYYY string to Date object
  const parseValue = (val) => {
    if (!val || val === "Present") return null;
    const parts = val.split("/");
    if (parts.length === 2) {
      const [month, year] = parts;
      return new Date(parseInt(year), parseInt(month) - 1);
    }
    return null;
  };

  // Convert Date object to MM/YYYY string
  const formatValue = (date) => {
    if (!date) return "";
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${month}/${year}`;
  };

  return (
    <DatePicker
      selected={parseValue(value)}
      onChange={(date) => onChange(formatValue(date))}
      dateFormat="MM/yyyy"
      showMonthYearPicker
      showFullMonthYearPicker
      placeholderText={placeholder}
      className="input focus:outline-none w-full"
      disabled={disabled}
      wrapperClassName="w-full"
    />
  );
};

export default MonthYearPicker;
