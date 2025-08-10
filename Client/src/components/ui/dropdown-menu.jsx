import { useState, useEffect, useRef } from "react";
import * as React from "react";
import { cn } from "@/lib/utils";
import { ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";

const DropdownMenu = ({ children }) => {
  return <div className="relative inline-block text-left">{children}</div>;
};

const DropdownMenuTrigger = React.forwardRef(({ className, ...props }, ref) => (
  <Button
    ref={ref}
    className={cn("flex items-center gap-1", className)}
    {...props}
  />
));
DropdownMenuTrigger.displayName = "DropdownMenuTrigger";

const DropdownMenuContent = ({ children, align = "end" }) => {
  return (
    <div
      className={cn(
        "absolute mt-2 w-48 border bg-primary rounded-md shadow-lg z-50",
        align === "end" ? "right-0" : "left-0"
      )}
    >
      <div className="py-1">{children}</div>
    </div>
  );
};

const DropdownMenuItem = ({ children, onClick }) => {
  return (
    <button
      onClick={onClick}
      className="block w-full px-4 py-2 text-left text-sm hover:bg-[var(--bg-ter)]"
    >
      {children}
    </button>
  );
};

const Dropdown = ({ triggerLabel, children, align = "end" }) => {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpen(false);
      }
    }
    if (open) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [open]);

  return (
    <div ref={dropdownRef} className="relative inline-block text-left">
      <Button
        aria-expanded={open}
        aria-haspopup="true"
        onClick={() => setOpen((prev) => !prev)}
        className="flex items-center gap-1"
      >
        {triggerLabel} <ChevronDown size={16} />
      </Button>

      {open && (
        <div
          className={cn(
            "absolute mt-2 w-48 border bg-primary rounded-md shadow-lg z-50",
            align === "end" ? "right-0" : "left-0"
          )}
        >
          <div className="py-1">
            {React.Children.map(children, (child) => {
              if (React.isValidElement(child)) {
                return React.cloneElement(child, {
                  onClick: (...args) => {
                    setOpen(false);
                    if (child.props.onClick) child.props.onClick(...args);
                  },
                });
              }
              return child;
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  Dropdown,
};
