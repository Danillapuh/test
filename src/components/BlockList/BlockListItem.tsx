import { useContext, useRef, useState } from "react";
import { Block, BlockListContext } from "./BlockList";
import { useOnMouseEvents } from "../../utils/useOnMouseEvents";
import { Timer } from "../Timer/Timer";

export const BlockListItem: React.FC<{ block: Block }> = ({ block }) => {
  const { updateBlock, deleteBlock } = useContext(BlockListContext);

  const buttonRef = useRef<HTMLDivElement>(null);
  const [buttonPressed, setButtonPressed] = useState(false);

  const pressButton = () => {
    if (!buttonPressed) setButtonPressed(true);
  };
  const releaseButton = () => {
    if (buttonPressed) setButtonPressed(false);
  };

  useOnMouseEvents(buttonRef, {
    mousedown: pressButton,
    mouseleave: releaseButton,
    mouseup: releaseButton,
    touchstart: pressButton,
    touchend: releaseButton,
  });

  return (
    <div
      ref={buttonRef}
      onClick={() => updateBlock({ ...block, time: 20 })}
      style={{
        background: block.color,
        transform: buttonPressed ? "scale(0.85)" : "scale(1)",
        color: buttonPressed ? "rgba(1,1,1, 0.5)" : "black",
      }}
      className="block-list_item"
    >
      <Timer
        key={`${block.id}_${block.time}`}
        onFinish={() => deleteBlock(block.id)}
        time={block.time}
        onTick={(sec) => updateBlock({ ...block, time: sec })}
      />
    </div>
  );
};
