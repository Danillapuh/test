import { createContext, useContext, useEffect, useRef, useState } from "react";
import FlipMove from "react-flip-move";
import { Timer } from "../Timer/Timer";
import { getRandomHex } from "../../utils/getRandomHex";
import { Button } from "../Button/Button";
import { useOnMouseEvents } from "../../utils/useOnMouseEvents";
import { BlockListMenu, BlockListSort } from "./BlockListMenu";
import { BlockListBody } from "./BlockListBody";

export interface Block {
  id: number | string;
  time: number;
  color: string;
}

export interface BlockListContext {
  addBlock: (hex: string) => any;
  deleteBlock: (id: Block["id"]) => any;
  updateBlock: (block: Partial<Block> & Pick<Block, "id">) => any;
  changeSort: React.Dispatch<React.SetStateAction<BlockListSort>>;
  sort: BlockListSort;
  blocks: Block[];
}

export const BlockListContext = createContext<BlockListContext>({} as any);

export const BlockList = () => {
  const [blocks, setBlocks] = useState<Block[]>([]);
  const [sort, changeSort] = useState<BlockListSort>("no");

  const addBlock: BlockListContext["addBlock"] = (hex) => {
    setBlocks((blocks) => [
      ...blocks,
      {
        id: Math.random(),
        time: Math.floor(Math.random() * 20),
        color: hex,
      },
    ]);
  };

  const deleteBlock: BlockListContext["deleteBlock"] = (id) => {
    setBlocks((blocks) => blocks.filter((block) => block.id != id));
  };

  const updateBlock: BlockListContext["updateBlock"] = (block) => {
    setBlocks((blocks) =>
      blocks.map((b) => {
        if (b.id == block.id) {
          for (let i in block)
            (b as any)[i as keyof Block] = block[i as keyof Block];
        }
        return b;
      }),
    );
  };

  useEffect(() => {
    const blocks = Array(20)
      .fill(true)
      .map((_) => ({
        id: Math.random(),
        time: Math.floor(Math.random() * 20),
        color: getRandomHex(),
      }));
    setBlocks(blocks);
  }, []);

  return (
    <div className="blocks-section">
      <BlockListContext.Provider
        value={{
          blocks,
          deleteBlock,
          addBlock,
          updateBlock,
          sort,
          changeSort,
        }}
      >
        <BlockListMenu />
        <BlockListBody />
      </BlockListContext.Provider>
    </div>
  );
};
