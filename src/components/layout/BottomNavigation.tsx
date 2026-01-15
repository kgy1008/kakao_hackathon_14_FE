"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { Home, Palette, Users, User } from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

const navItems = [
  {
    href: "/home",
    icon: Home,
    label: "홈",
  },
  {
    href: "/canvas",
    icon: Palette,
    label: "AI 캔버스",
  },
  {
    href: "/social",
    icon: Users,
    label: "소셜",
  },
  {
    href: "/my",
    icon: User,
    label: "마이룸",
  },
];

export function BottomNavigation() {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[450px] bg-white/80 backdrop-blur-xl border-t border-zinc-200 z-50">
      <div className="flex items-center justify-around h-16">
        {navItems.map((item) => {
          const isActive = pathname.startsWith(item.href);
          const Icon = item.icon;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex flex-col items-center justify-center flex-1 h-full relative transition-colors",
                isActive ? "text-amber-500" : "text-zinc-400 hover:text-zinc-600"
              )}
            >
              {isActive && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute -top-0.5 left-1/2 -translate-x-1/2 w-8 h-1 bg-gradient-to-r from-amber-400 to-orange-500 rounded-full"
                  transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                />
              )}
              <Icon className={cn("w-5 h-5 mb-1", isActive && "drop-shadow-sm")} />
              <span className={cn("text-xs font-medium", isActive && "font-semibold")}>
                {item.label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
