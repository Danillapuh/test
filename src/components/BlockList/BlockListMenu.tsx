import { ChangeEventHandler, useContext, useState } from "react";
import { Button } from "../Button/Button";
import { Block, BlockListContext } from "./BlockList";
import { error } from "console";

export type BlockListSort = "asc" | "desc" | "no";

const btnColors = {
  asc: "#3464cc",
  desc: "#cc344d",
  no: "#959595",
};

const btnSorts = {
  asc: (a: Block, b: Block) => a.time - b.time,
  desc: (a: Block, b: Block) => b.time - a.time,
  no: (a: Block, b: Block) => 0,
};

export const BlockListMenu = () => {
  const { addBlock, sort, changeSort } = useContext(BlockListContext);
  const [hex, setHex] = useState<{
    value: string;
    error: boolean;
    touched: boolean;
  }>({ value: "", error: true, touched: false });

  const handleInput: ChangeEventHandler = (e) => {
    const value = (e.target as HTMLInputElement).value;

    const newHex = { ...hex, touched: true, value, error: true };
    if (/^#[0-9A-F]{6}[0-9a-f]{0,2}$/i.test(value)) newHex.error = false;

    console.log(newHex);
    setHex(newHex);
  };

  const setSort = () => {
    changeSort((sort) => {
      const btns = Object.keys(btnColors);
      if (btns.findIndex((s) => s == sort) + 1 < btns.length)
        return btns[btns.findIndex((s) => s == sort) + 1] as BlockListSort;

      return btns[0] as BlockListSort;
    });
  };

  return (
    <div>
      <div
        style={{
          opacity: hex.error && hex.touched ? "1" : "0",
          color: "rgb(244 111 131)",
          fontSize: "0.85rem",
          fontFamily: "monospace",
          transition: "0.3s",
          marginBottom: "0.25rem",
        }}
      >
        Неверный hex
      </div>
      <div style={{ display: "flex", gap: "15px" }}>
        <div className="menu">
          <input
            data-error="sdf"
            onChange={handleInput}
            type="text"
            placeholder="Введите HEX"
          />
          <Button
            disabled={hex.error}
            className="button"
            onClick={(e) => addBlock(hex.value)}
          >
            Добавить
          </Button>
        </div>
        <Button
          style={{ background: btnColors[sort] }}
          className="button"
          onClick={setSort}
        >
          {sort == "asc" && "По возрастанию"}
          {sort == "desc" && "По убыванию"}
          {sort == "no" && "Без сортировки"}
        </Button>
      </div>
    </div>
  );
};
