import { useRef, useEffect } from 'react';

const isBrowser = typeof window !== `undefined`;

const getScrollPosition = ({ element, useWindow }) => {
  if (!isBrowser) return { x: 0, y: 0 };

  const target = element ? element.current : document.body;
  const position = target.getBoundingClientRect();

  return useWindow
    ? { x: window.scrollX, y: window.scrollY }
    : { x: position.left, y: position.top };
};

const useScrollPosition = (effect, dependencies, element, useWindow, wait) => {
  const position = useRef(getScrollPosition({ useWindow }));

  let throttleTimeout = null;

  const callBack = () => {
    const currentPos = getScrollPosition({ element, useWindow });
    effect({ previousPos: position.current, currentPos });
    position.current = currentPos;
    throttleTimeout = null;
  };

  useEffect(() => {
    const handleScroll = () => {
      if (wait && throttleTimeout === null) {
        throttleTimeout = setTimeout(callBack, wait);
      } else {
        callBack();
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => window.removeEventListener('scroll', handleScroll);
  }, dependencies);
};

export default useScrollPosition;
