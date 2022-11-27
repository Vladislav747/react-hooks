import { useCallback, useEffect, useRef } from "react";


function useCombinedRef(...refs) {
  const combinedRef = useCallback((element) => {
    refs.forEach((ref) => {
      if (!ref) return;
      if (typeof ref === "function") {
        ref(element);
      } else {
        ref.current = element;
      }
    });
  }, refs);

  return combinedRef;
}

function Input(props) {
  const { inputRef: parentRef, ...rest } = props;
  const inputRef = useRef(null);

  useEffect(() => {
    console.log("form input ref", inputRef);
  }, []);

  const cbRef = useCombinedRef(inputRef, parentRef);

  return <input {...rest} ref={cbRef} />;
}

export default function App() {
  const inputRef = useRef(null);

  useEffect(() => {
    console.log(inputRef.current);
  });

  return <Input />;
}
