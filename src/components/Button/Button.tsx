import { useRef, useState } from "react";
import { useOnMouseEvents } from "../../utils/useOnMouseEvents";

type ButtonVariant = "text" | "primary";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

export const Button: React.FC<React.PropsWithChildren<ButtonProps>> = ({
  children,
  className = "",
  ...props
}) => {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [buttonPressed, setButtonPresssed] = useState(false);

  const pressButton = () => {
    if (!buttonPressed) setButtonPresssed(true);
  };
  const releaseButton = () => {
    if (buttonPressed) setButtonPresssed(false);
  };

  useOnMouseEvents(buttonRef, {
    mousedown: pressButton,
    mouseleave: releaseButton,
    mouseup: releaseButton,
    touchstart: pressButton,
    touchend: releaseButton,
  });

  return (
    <button
      ref={buttonRef}
      {...props}
      className="button"
      style={{
        transform: buttonPressed ? "scale(0.9)" : "scale(1)",
        ...props.style,
      }}
    >
      {children}
    </button>
  );
};
