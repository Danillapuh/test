import { useContext } from "react";
import { Button } from "../Button/Button";
import { Block, BlockListContext } from "./BlockList";
import FlipMove from "react-flip-move";
import { BlockListItem } from "./BlockListItem";

const btnSorts = {
  asc: (a: Block, b: Block) => a.time - b.time,
  desc: (a: Block, b: Block) => b.time - a.time,
  no: (a: Block, b: Block) => 0,
};

type RenderBlockType = React.FC<{ block?: Block }>;

export const BlockListBody: React.FC<{ renderBlock?: RenderBlockType }> = ({
  renderBlock = BlockListItem,
}) => {
  const { addBlock, sort, changeSort, blocks } = useContext(BlockListContext);
  const Block = renderBlock;

  return (
    <FlipMove
      enterAnimation="elevator"
      leaveAnimation="elevator"
      className="block-list"
      style={{
        padding: blocks.length ? "" : "0px",
        border: blocks.length ? "" : "none",
      }}
    >
      {blocks
        .sort((a, b) => btnSorts[sort](a, b))
        .map((block) => (
          <div key={block.id}>
            <Block block={block} />
          </div>
        ))}
    </FlipMove>
  );
};
