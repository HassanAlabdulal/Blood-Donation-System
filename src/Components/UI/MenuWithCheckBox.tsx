import React, { useState, useEffect} from "react";

import {
  Menu,
  MenuHandler,
  Button,
  MenuList,
  MenuItem,
  Checkbox,
} from "@material-tailwind/react";

interface MenuItems {
  id: string;
  label: string;
}

interface MenuWithCheckboxProps {
  items: MenuItems[];
  onSelectedItemsChange: (selectedItems: Set<string>) => void;
}

export function MenuWithCheckbox({ items, onSelectedItemsChange }: MenuWithCheckboxProps) {
  const [selectedItems, setSelectedItems] = useState(new Set<string>());

  useEffect(() => {
    onSelectedItemsChange(selectedItems);
  }, [selectedItems, onSelectedItemsChange]);

  const handleCheckboxChange = (label: string, isChecked: boolean) => {
    setSelectedItems((prevSelectedItems) => {
      const newSelectedItems = new Set(prevSelectedItems);
      if (isChecked) {
        newSelectedItems.add(label);
      } else {
        newSelectedItems.delete(label);
      }
      onSelectedItemsChange(newSelectedItems); 
      return newSelectedItems;
    });
  };

  const selectedItemsString = Array.from(selectedItems).join(", ");

  return (
    <Menu dismiss={{ itemPress: false }}>
      <MenuHandler>
        <Button
          className="text-sm tracking-wide normal-case bg-white border border-[#121212] text-[#212121]"
          placeholder={undefined}
        >
          {" "}
          {selectedItemsString || "Diseases"}
        </Button>
      </MenuHandler>
      <MenuList placeholder={undefined}>
        {items.map((item) => (
          <MenuItem key={item.id} className="p-0" placeholder={undefined}>
            <label
              htmlFor={item.id}
              className="flex items-center gap-2 p-2 cursor-pointer"
            >
              <Checkbox
                ripple={false}
                id={item.id}
                onChange={(e) =>
                  handleCheckboxChange(item.label, e.target.checked)
                }
                checked={selectedItems.has(item.label)}
                crossOrigin={undefined}
              />
              {item.label}
            </label>
          </MenuItem>
        ))}
      </MenuList>
    </Menu>
  );
}
