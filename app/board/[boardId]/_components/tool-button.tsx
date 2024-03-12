"use client";

import Hint from "@/app/(dashboard)/_components/hint";
import { Button } from "@/components/ui/button";
import { LucideIcon } from "lucide-react";

interface ToolButtonProps {
  icon: LucideIcon;
  label: string;
  onClick: () => void;
  isActive?: boolean;
  isDisabled?: boolean;
}
export const ToolButton = ({
  icon: Icon,
  label,
  onClick,
  isActive,
  isDisabled,
}: ToolButtonProps) => {
  return (
    <Hint label={label} side="right" sideOffset={14}>
      <Button
        disabled={isDisabled}
        onClick={onClick}
        size={"icon"}
        variant={isActive ? "boardActive" : "board"}
      >
        <Icon />
      </Button>
    </Hint>
  );
};
