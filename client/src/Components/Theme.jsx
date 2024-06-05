import React from "react";
import { useSelector } from "react-redux";
export default function Theme({ children }) {
  const {theme} = useSelector((state) => state.theme);
  return (
    <div className={theme}>
      <div className="bg-white dark:bg-[rgb(16,23,42)] text-gray-700 dark:text-gray-200 min-h-screen">
        {children}
      </div>
    </div>
  );
}
