"use client";
import React, { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { DropdownItemWithModal } from "./_components/DropdownItemWithModal";
import { PopoverModal } from "./_components/PopoverModal";

const DropdownModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  function onOpenChangeHandler(open: boolean) {
    setIsOpen(open);
  }

  return (
    <div className="p-4">
      <DropdownMenu open={isOpen} onOpenChange={onOpenChangeHandler}>
        <DropdownMenuTrigger asChild>
          <Button>Open X</Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent hideWhenDetached>
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem>New</DropdownMenuItem>

          <DropdownItemWithModal
            triggerLabel="Team Settings"
            modalTitle="Edit Team"
            modalDescription="Make changes to your team settings here."
            onSave={() => {
              console.log("Team settings saved!");
            }}
          >
            <div className="space-y-4">
              <p>Team configuration options go here...</p>
            </div>
          </DropdownItemWithModal>

          <DropdownItemWithModal
            triggerLabel="Billing"
            modalTitle="Billing Information"
            modalDescription="Update your billing details."
            onSave={() => {
              console.log("Billing info saved!");
            }}
          >
            <div className="space-y-4">
              <p>Billing form goes here...</p>
            </div>
          </DropdownItemWithModal>

          <DropdownItemWithModal
            triggerLabel="Subscription"
            modalTitle="Manage Subscription"
            modalDescription="Upgrade or downgrade your subscription plan."
            onSave={() => {
              console.log("Subscription updated!");
            }}
          >
            <div className="space-y-4">
              <p>Subscription options go here...</p>
            </div>
          </DropdownItemWithModal>

          <DropdownMenuItem>Regular Item (No Modal)</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <PopoverModal />
    </div>
  );
};

export default DropdownModal;
