import { useEffect } from "react";

export const useClickOutside = (ref: React.RefObject<HTMLDivElement>, callback: () => void, eventName?: keyof DocumentEventMap) => {
  const eventNameToUse = eventName || "click";
  const handleClick = (e: Event) => {
    if (ref?.current && !ref.current.contains(e.target as Node)) {
      setTimeout(() => callback(), 0);
    }
  };

  useEffect(() => {
    document.addEventListener(eventNameToUse, handleClick);

    return () => {
      document.removeEventListener(eventNameToUse, handleClick);
    };
  });
};

export default useClickOutside;
