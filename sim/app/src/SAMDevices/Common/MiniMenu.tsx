import * as React from "react";

interface MiniMenuProps {
  items: string[];
  anchor?: null | HTMLElement;
  handleClose: (item?: string) => void;
}

export default function MiniMenu({ items, anchor, handleClose }: MiniMenuProps) {
  const open = Boolean(anchor);
  const [position, setPosition] = React.useState({ top: 0, left: 0 });

  // Set position based on anchor element
  React.useEffect(() => {
    if (anchor) {
      const rect = anchor.getBoundingClientRect();
      setPosition({
        top: rect.bottom,
        left: rect.left
      });
    }
  }, [anchor]);

  if (!open) return null;

  return (
    <div 
      className="absolute z-50 bg-white shadow-lg rounded-md py-1 border border-gray-200"
      style={{ 
        top: `${position.top}px`, 
        left: `${position.left}px` 
      }}
    >
      <ul className="py-1 text-sm">
        {items.map((item, index) => (
          <li 
            key={item + index}
            className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-gray-700"
            onClick={() => handleClose(item)}
          >
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}
