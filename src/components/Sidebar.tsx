"use client";

import { Screen, Text, Avatar } from "@/components";
import { useTheme } from "@/contexts/ThemeContext";
import { themes } from "@/styles/theme";
import Link from "next/link";
import { usePathname } from "next/navigation";

export function Sidebar() {
  const { theme } = useTheme();
  const currentTheme = themes[theme];
  const pathname = usePathname();

  const navItems = [
    {
      href: "/",
      icon: "🏠",
      label: "Home",
    },
    {
      href: "/letters",
      icon: "📖",
      label: "Letters",
    },
    {
      href: "/games",
      icon: "🎮",
      label: "Games",
    },
    {
      href: "/profile",
      icon: <Avatar src="" alt="User" size="sm" />,
      label: "Profile",
    },
    {
      href: "/settings",
      icon: "⚙️",
      label: "Settings",
    },
    {
      href: "/test",
      icon: "🧪",
      label: "Test",
    },
  ];

  const isActive = (href: string) => {
    if (href === "/") {
      return pathname === "/";
    }
    return pathname.startsWith(href);
  };

  return (
    <div
      className={`hidden lg:flex lg:flex-col w-64 h-screen ${
        theme === "dark" ? "bg-gray-900 border-gray-700" : "bg-white border-gray-200"
      } border-l fixed right-0 top-0 z-40`}
    >
      {/* Logo/Brand */}
      <div className="p-6 border-b border-gray-200 dark:border-gray-700">
        <Text variant="h2" className="text-center">
          📚 Anglitor
        </Text>
      </div>

      {/* Navigation Items */}
      <nav className="flex-1 p-4">
        <div className="space-y-2">
          {navItems.map((item) => (
            <Link key={item.href} href={item.href}>
              <div
                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 hover:scale-105 ${
                  isActive(item.href)
                    ? theme === "dark"
                      ? "bg-blue-900 text-blue-300"
                      : "bg-blue-100 text-blue-700"
                    : theme === "dark"
                    ? "text-gray-300 hover:bg-gray-800"
                    : "text-gray-700 hover:bg-gray-100"
                }`}
              >
                <div className="text-xl">
                  {typeof item.icon === "string" ? item.icon : item.icon}
                </div>
                <Text
                  variant="body"
                  className={
                    isActive(item.href)
                      ? theme === "dark"
                        ? "text-blue-300"
                        : "text-blue-700"
                      : ""
                  }
                >
                  {item.label}
                </Text>
              </div>
            </Link>
          ))}
        </div>
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-gray-200 dark:border-gray-700">
        <Text variant="caption" color="muted" className="text-center">
          Version 1.0
        </Text>
      </div>
    </div>
  );
}