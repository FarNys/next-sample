"use client";
import React, { useEffect, useState } from "react";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface DropdownItemWithModalProps {
  triggerLabel: string;
  modalTitle: string;
  modalDescription?: string;
  children?: React.ReactNode;
  onSave?: () => void;
  disabled?: boolean;
}

export const DropdownItemWithModal: React.FC<DropdownItemWithModalProps> = ({
  triggerLabel,
  modalTitle,
  modalDescription,
  children,
  onSave,
  disabled = false,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (!isOpen) {
      console.log("Does it Run?", modalTitle);

      const dropdownWrapper = document.querySelector(
        "[data-radix-popper-content-wrapper]"
      ) as HTMLElement;
      if (dropdownWrapper) {
        dropdownWrapper.style.display = "block";
      }
    }
  }, [isOpen]);

  return (
    <>
      <DropdownMenuItem
        disabled={disabled}
        onSelect={(e) => {
          // Prevent the dropdown from closing immediately
          // e.preventDefault();

          // // Find and hide the dropdown wrapper
          // const dropdownWrapper = document.querySelector(
          //   "[data-radix-popper-content-wrapper]"
          // ) as HTMLElement;

          // if (dropdownWrapper) {
          //   // Hide the dropdown visually
          //   console.log("Display None");
          //   dropdownWrapper.style.display = "none";
          // }

          // Open the modal
          setIsOpen(true);
        }}
      >
        {triggerLabel}
      </DropdownMenuItem>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>{modalTitle}</DialogTitle>
            {modalDescription && (
              <DialogDescription>{modalDescription}</DialogDescription>
            )}
          </DialogHeader>
          <div>{children}</div>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button
              type="submit"
              onClick={() => {
                onSave?.();
                setIsOpen(false);
              }}
            >
              Save changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};
