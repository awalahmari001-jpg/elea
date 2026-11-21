import { Moon, Sun } from "lucide-react";

import { Button } from "@/components/ui/button";
import { useI18n } from "@/components/i18n-provider";

export function ThemeToggle() {
  const { theme, setTheme, t } = useI18n();
  const isDark = theme === "dark";
  const label = isDark ? t.nav.themeToLight : t.nav.themeToDark;
  return (
    <Button
      variant="ghost"
      size="icon"
      aria-label={label}
      title={label}
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className="rounded-full"
    >
      {isDark ? <Sun /> : <Moon />}
    </Button>
  );
}
