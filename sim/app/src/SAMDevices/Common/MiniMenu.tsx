import * as React from "react";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { Box, MenuList } from "@mui/material";

export default function MiniMenu({
  items,
  anchor,
  handleClose,
}: {
  items: string[];
  anchor?: null | HTMLElement;
  handleClose: (e: any) => void;
}) {
  const open = Boolean(anchor);

  return (
    <div>
      <Menu
        id="menu"
        aria-labelledby="button"
        anchorEl={anchor}
        open={open}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
      >
        <MenuList dense>
          {items.map((item, index) => (
            <MenuItem
              key={item + index}
              onClick={() => handleClose(item)}
              value={item}
            >
              {item}
            </MenuItem>
          ))}
        </MenuList>
      </Menu>
    </div>
  );
}
