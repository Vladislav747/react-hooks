import { useState, useRef, useEffect, useReducer } from "react";

import { useLatest } from "./useLatest";

function useOutsideClick(elementRef, handler, attached = true) {
  const latestHandler = useLatest(handler);
  useEffect(() => {
    if (!attached) return;

    const handleClick = (e) => {
      if (!elementRef.current) return;
      if (!elementRef.current.contains(e.target)) {
        latestHandler.current();
      }
    };

    document.addEventListener("click", handleClick);

    return () => {
      document.removeEventListener("click", handleClick);
    };
  }, [elementRef, latestHandler, attached]);
}

function Tooltip({ opened, onClose }) {
  const tooltipRef = useRef(null);

  useOutsideClick(tooltipRef, onClose, opened);

  useEffect(() => {
    if (!opened) return null;

    document.addEventListener("click");
  }, [opened]);

  return (
    <div ref={tooltipRef} className="tooltip">
      <div>Some Text</div>
    </div>
  );
}

export default function App() {
  const [opened, setOpened] = useState(false);
  const [, forceUpdate] = useReducer((v) => v + 1, 0);

  const onClose = () => {
    setOpened(false);
  };

  return (
    <>
      <button onClick={forceUpdate} style={{ margin: 20 }}>
        Click
      </button>
      <div className="tooltip-container">
        <Tooltip opened={opened} onClose={onClose} />
        <button
          className="tooltip-trigger"
          onClick={() => setOpened((v) => !v)}
        >
          Click to open tooltip
        </button>
      </div>
    </>
  );
}
