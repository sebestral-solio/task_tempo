import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Moon, Sun } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
  TooltipProvider,
} from "@/components/ui/tooltip";

interface DashboardHeaderProps {
  onSearch?: (searchTerm: string) => void;
  onThemeToggle?: () => void;
  isDarkMode?: boolean;
}

const DashboardHeader = ({
  onSearch = () => {},
  onThemeToggle = () => {},
  isDarkMode = false,
}: DashboardHeaderProps) => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);
    onSearch(value);
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-20 items-center justify-between px-4">
        <div className="flex flex-1 items-center justify-start">
          <h1 className="text-2xl font-bold text-foreground">Care Services</h1>
        </div>

        <div className="flex flex-1 items-center justify-center">
          <div className="relative w-full max-w-md">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search services..."
              className="w-full pl-10"
              value={searchTerm}
              onChange={handleSearchChange}
            />
          </div>
        </div>

        <div className="flex flex-1 items-center justify-end">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={onThemeToggle}
                  className="h-10 w-10"
                >
                  {isDarkMode ? (
                    <Sun className="h-5 w-5" />
                  ) : (
                    <Moon className="h-5 w-5" />
                  )}
                  <span className="sr-only">Toggle theme</span>
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Toggle theme</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </div>
    </header>
  );
};

export default DashboardHeader;
