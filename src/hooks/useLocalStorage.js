import { useState, useEffect} from 'react'

export default function useLocalStorage (key, defaultValue) {
    // State to store our value
    // Pass initial state function to useState so logic is only executed once
    const [value, setValue] = useState(() => {
      const jsonValue = localStorage.getItem(key);
      if (jsonValue != null) return JSON.parse(jsonValue)

      if (typeof defaultValue === "function") {
        return defaultValue()
      } else {
        return defaultValue
      }
    }) 

    useEffect(() => {
      localStorage.setItem(key, JSON.stringify(value))
    }, [key, value]);
    return [value, setValue];
  }