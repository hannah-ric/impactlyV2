import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Bell, LogOut, Settings, User, Sun, Moon } from "lucide-react";
import { useTheme } from "@/hooks/useTheme";

export function UserNav() {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="flex items-center gap-xs">
      {/* Notification Button */}
      <Button
        variant="ghost"
        size="icon"
        className="relative w-11 h-11 grid place-items-center bg-transparent rounded-lg text-[var(--text-secondary)] transition-all duration-fast ease-out hover:bg-[var(--bg-secondary)] hover:text-[var(--text-primary)] hover:translate-y-[-1px]"
      >
        <Bell className="h-5 w-5" />
        <span className="absolute top-2 right-2 w-2 h-2 bg-danger rounded-full shadow-[0_0_0_3px_var(--bg-elevated)] group-hover:animate-notification-pulse"></span>
      </Button>

      {/* Theme Toggle */}
      <Button
        variant="ghost"
        size="icon"
        className="w-11 h-11 grid place-items-center bg-transparent rounded-lg text-[var(--text-secondary)] transition-all duration-fast ease-out hover:bg-[var(--bg-secondary)] hover:text-[var(--text-primary)] relative overflow-hidden"
        onClick={toggleTheme}
        title={
          theme === "dark" ? "Switch to light mode" : "Switch to dark mode"
        }
        aria-label={
          theme === "dark" ? "Switch to light mode" : "Switch to dark mode"
        }
      >
        {theme === "dark" ? (
          <Sun className="h-5 w-5 transition-transform duration-normal ease-elastic hover:rotate-180" />
        ) : (
          <Moon className="h-5 w-5 transition-transform duration-normal ease-elastic hover:rotate-180" />
        )}
      </Button>

      {/* User Menu */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            className="w-11 h-11 rounded-full bg-gradient-to-br from-primary to-accent text-white grid place-items-center font-semibold text-sm relative transition-all duration-normal ease-out hover:animate-avatar-float hover:scale-110 p-0 after:absolute after:inset-[-3px] after:bg-gradient-to-br after:from-primary after:to-accent after:rounded-full after:opacity-0 after:blur-md after:z-[-1] after:transition-opacity after:duration-normal after:ease-out hover:after:opacity-60"
          >
            JD
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56" align="end" forceMount>
          <DropdownMenuLabel>
            <div className="flex flex-col space-y-1">
              <p className="text-sm font-medium leading-none">John Doe</p>
              <p className="text-xs leading-none text-muted-foreground">
                john.doe@example.com
              </p>
            </div>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuItem>
              <User className="mr-2 h-4 w-4" />
              <span>Profile</span>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Settings className="mr-2 h-4 w-4" />
              <span>Settings</span>
            </DropdownMenuItem>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuItem>
            <LogOut className="mr-2 h-4 w-4" />
            <span>Log out</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
