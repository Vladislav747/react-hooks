import { useState, useRef, useEffect, useReducer } from "react";

function useOutsideClick(elementRef, handler, attached = true) {
  useEffect(() => {
    if (!attached) return;

    const handleClick = (e) => {
      if (!elementRef.current) return;
      if (!elementRef.current.contains(e.target)) {
        handler();
      }
    };

    document.addEventListener("click", handleClick);

    return () => {
      document.removeEventListener("click", handleClick);
    };
  }, [elementRef, handler, attached]);
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
      <button onClick={forceUpdate}>Click</button>
      <div className="toast-container">
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
