import { memo, useCallback, useLayoutEffect, useRef, useState } from "react";

export function useLatest(value) {
  const valueRef = useRef(value);

  useLayoutEffect(() => {
    valueRef.current = value;
  }, [value]);

  return valueRef;
}

const Button = memo(({ text, onClick }) => {
  console.log("button is rendered");
  return <button onClick={onClick}>{text}</button>;
});

export default function App() {
  const [text, setText] = useState("");
  const latestText = useLatest(text);

  const onClick = useCallback(() => {
    console.log("save text", latestText.current);
  }, [latestText]);

  return (
    <div className="App">
      <input
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Search..."
      />
      <Button text="submit" onClick={onClick} />
    </div>
  );
}
