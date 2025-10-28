import { useVirtualizer } from "@tanstack/react-virtual";
import React, {
  ChangeEvent,
  MouseEvent,
  useEffect,
  useMemo,
  useRef,
  useState,
  useTransition,
} from "react";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useOnClickOutside } from "@/hooks/useClickOutside";
import { cn } from "@/lib/utils";
import { Button, ButtonProps } from "@/components/ui/button";
import { CheckIcon, SearchIcon } from "lucide-react";
import { Input } from "@/components/ui/input";
import { LabelValueProps } from "@/lib/type";
import {
  Command,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";

type VirtualizedSelectProps = ButtonProps & {
  options: LabelValueProps[];
  onSelectOption: (payload: LabelValueProps | null) => void;
  defaultSelectedOption?: LabelValueProps | null;
  contentClassname?: string;
  isLoading?: boolean;
  itemHeight?: number;
  maxHeight?: number;
};

const VirtualizedSelect: React.FC<VirtualizedSelectProps> = ({
  options,
  onSelectOption,
  defaultSelectedOption = null,
  isLoading,
  itemHeight = 36, // Default height for each item (h-9 = 36px)
  maxHeight = 300, // Default max height for dropdown
  ...rest
}) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState<boolean>(false);
  const [selectedOption, setSelectedOption] = useState<LabelValueProps | null>(
    defaultSelectedOption
  );
  const [searchValue, setSearchValue] = useState<string>("");
  const className = rest.className || "";
  const [filteredOptions, setFilteredOptions] = useState(options);
  function clickInputHandler() {
    setOpen(true);
    setTimeout(() => {
      inputRef.current?.focus();
    }, 0);
  }

  function selectOptionHandler(payload: LabelValueProps) {
    setSelectedOption(payload);
    setOpen(false);
    setSearchValue(payload.label);
    onSelectOption(payload);
  }

  function clearHandler(e: MouseEvent<HTMLButtonElement>) {
    e.stopPropagation();
    setSelectedOption(null);
    onSelectOption(null);
    setSearchValue("");
  }

  function changeInputHandler(value: string) {
    setOpen(true);
    // setTimeout(() => {
    //   inputRef.current?.focus();
    // }, 0);
    if (isLoading) return;
    const a = performance.now();
    const lowercaseValue = value.toLocaleLowerCase();
    setSearchValue(value);
    setFilteredOptions(
      options.filter(
        (item) =>
          item.label.toLocaleLowerCase().includes(lowercaseValue) ||
          item.value.toLocaleLowerCase().includes(lowercaseValue)
      )
    );
    const b = performance.now();
    console.log("Delta = ", b - a);
  }

  useOnClickOutside(
    containerRef,
    () => {
      setOpen(false);
      if (selectedOption && searchValue !== "") {
        setSearchValue(selectedOption.label);
      } else {
        setSearchValue("");
      }
    },
    inputRef
  );

  const isTrue = selectedOption;

  const width = inputRef.current?.getBoundingClientRect()?.width || "300px";

  return (
    <Popover open={open}>
      <Command shouldFilter={false}>
        <PopoverTrigger asChild>
          <div className="flex justify-between w-full items-center gap-1 relative">
            <Input
              placeholder="Search ..."
              className="h-12 w-full pl-12 !focus-visible:outline-none !focus-visible:outline- !focus-visible:border-none !focus-visible:ring-0"
              value={searchValue}
              onChange={(e) => changeInputHandler(e.target.value)}
              ref={inputRef}
              onClick={clickInputHandler}
              autoFocus={true}
            />

            <div className="absolute left-4 top-1/2 -translate-y-1/2">
              <SearchIcon className="size-6 " />
            </div>
            <div className="flex items-center absolute right-3">
              {isTrue && (
                <button
                  onClick={clearHandler}
                  className="text-sm text-neutral-600"
                >
                  {/* <XIcon
                  className={open ? "fill-primary-900" : "fill-neutral-800"}
                /> */}
                  Clear
                </button>
              )}
              {/* <ChevronMiniDown
              className={
                open || isTrue ? "fill-primary-900" : "fill-neutral-800"
              }
            /> */}
            </div>
          </div>
        </PopoverTrigger>
        <PopoverContent
          className={`p-0 `}
          ref={containerRef}
          style={{ width: width }}
          autoFocus={false}
        >
          <div className=" w-full overflow-hidden">
            {isLoading ? (
              <div className="w-full flex justify-center items-center h-9 gap-2 text-sm font-normal">
                Loading ...
              </div>
            ) : filteredOptions.length === 0 ? (
              <div className=" text-left flex justify-center items-center relative text-sm font-normal h-10">
                Nothing found
              </div>
            ) : (
              <div>
                <VirtualizePart
                  itemHeight={itemHeight}
                  items={filteredOptions}
                  maxHeight={maxHeight}
                  onSelect={selectOptionHandler}
                  selectedOption={selectedOption}
                />
              </div>
            )}
          </div>
        </PopoverContent>
      </Command>
    </Popover>
  );
};

export default VirtualizedSelect;

interface VirtualizePartProps {
  items: LabelValueProps[];
  itemHeight: number;
  maxHeight: number;
  onSelect: (payload: LabelValueProps) => void;
  selectedOption: LabelValueProps | null;
}
const VirtualizePart: React.FC<VirtualizePartProps> = ({
  items,
  itemHeight,
  maxHeight,
  selectedOption,
  onSelect,
}) => {
  const parentRef = React.useRef<HTMLDivElement>(null);

  const virtualizer = useVirtualizer({
    count: items.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => itemHeight,
    overscan: 10,
  });

  return (
    <CommandList
      ref={parentRef}
      className="overflow-auto p-2"
      style={{
        height: Math.min(maxHeight, items.length * itemHeight + 16),
      }}
    >
      <CommandGroup
        style={{
          height: `${virtualizer.getTotalSize()}px`,
          width: "100%",
          position: "relative",
        }}
      >
        {virtualizer.getVirtualItems().map((virtualItem) => {
          const option = items[virtualItem.index];
          const isSelected = selectedOption?.value === option.value;

          return (
            <CommandItem
              key={virtualItem.key}
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: `${virtualItem.size}px`,
                transform: `translateY(${virtualItem.start}px)`,
              }}
              //   onClick={() => onSelect(option)}
              onSelect={() => onSelect(option)}
              //   variant={"ghost"}
              //   size={"default"}
              className=" text-left justify-between relative font-normal"
            >
              <span>{option.label}</span>
              <CheckIcon
                className={cn(
                  "fill-primary-700",
                  isSelected ? "opacity-100" : "opacity-0"
                )}
              />
            </CommandItem>
          );
        })}
      </CommandGroup>
    </CommandList>
  );
};
