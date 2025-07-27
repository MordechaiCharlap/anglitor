"use client";

import { Text, Avatar } from "@/components";
import { useTheme } from "@/contexts/ThemeContext";
import { themes } from "@/styles/theme";
import Link from "next/link";
import { usePathname } from "next/navigation";

export function BottomTabs() {
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
  ];

  const isActive = (href: string) => {
    if (href === "/") {
      return pathname === "/";
    }
    return pathname.startsWith(href);
  };

  return (
    <div
      className={`lg:hidden fixed bottom-0 left-0 right-0 ${
        theme === "dark"
          ? "bg-gray-900 border-gray-700"
          : "bg-white border-gray-200"
      } border-t z-50`}
    >
      <div className="flex justify-around items-center py-2">
        {navItems.map((item) => (
          <Link key={item.href} href={item.href} className="flex-1">
            <div
              className={`flex flex-col items-center py-2 px-2 transition-all duration-200 ${
                isActive(item.href)
                  ? theme === "dark"
                    ? "text-blue-300"
                    : "text-blue-700"
                  : theme === "dark"
                  ? "text-gray-500"
                  : "text-gray-600"
              }`}
            >
              <div className="text-lg mb-1">
                {typeof item.icon === "string" ? item.icon : item.icon}
              </div>
              <Text
                variant="caption"
                className={`text-xs ${
                  isActive(item.href)
                    ? theme === "dark"
                      ? "text-blue-300"
                      : "text-blue-700"
                    : theme === "dark"
                    ? "text-gray-500"
                    : "text-gray-600"
                }`}
              >
                {item.label}
              </Text>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
