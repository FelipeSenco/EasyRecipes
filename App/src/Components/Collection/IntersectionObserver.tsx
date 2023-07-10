import React, { FC, useEffect, useRef } from "react";

type IIntersectionObserverContainerProps = {
  handleIntersection: () => any;
};

const IntersectionObserverContainer: FC<IIntersectionObserverContainerProps> = ({ handleIntersection }) => {
  const observerRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      // The callback will return an array of entries, even if you're only observing a single element.
      entries[0].isIntersecting && handleIntersection();
    });

    // If we have a ref, start observing it.
    if (observerRef.current) {
      observer.observe(observerRef.current);
    }

    // When the component unmounts, stop observing.
    return () => {
      if (observerRef.current) {
        observer.unobserve(observerRef.current);
      }
    };
  }, []);

  // We'll observe the div that this ref is attached to.
  return <div ref={observerRef}></div>;
};

export default IntersectionObserverContainer;
