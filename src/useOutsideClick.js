import { useState, useRef, useEffect } from "react";

function Tooltip({ opened, onClose }) {
  const tooltipRef = useRef(null);

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
  const onClose = () => {
    setOpened(false);
  };

  return (
    <div className="toast-container">
      <Tooltip opened={opened} onClose={onClose} />
      <button className="tooltip-trigger" onClick={() => setOpened((v) => !v)}>
        Click to open tooltip
      </button>
    </div>
  );
}
