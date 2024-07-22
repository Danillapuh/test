import { useEffect } from "react";

type OnMouseEvents = {
  [T in keyof HTMLElementEventMap]?: EventListener | Function;
};

export function useOnMouseEvents(
  ref: React.RefObject<HTMLElement>,
  options: OnMouseEvents,
) {
  useEffect(() => {
    for (let i in options) {
      if (ref.current)
        ref.current.addEventListener(
          i,
          options[i as keyof OnMouseEvents] as EventListener,
        );
    }
    return () => {
      for (let i in options) {
        if (ref.current)
          ref.current.removeEventListener(
            i,
            options[i as keyof OnMouseEvents] as EventListener,
          );
      }
    };
  }, [options]);
}
