"use client";

import { MobileContainer } from "@/components/layout/MobileContainer";
import { useUserStore } from "@/store/useUserStore";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CalendarDays, Sparkles, TrendingUp, ChevronRight, Home as HomeIcon } from "lucide-react";
import { motion } from "framer-motion";
import { differenceInDays } from "date-fns";
import Link from "next/link";

const moodInteriorReferences = [
  {
    id: 1,
    title: "미니멀 화이트 원룸",
    mood: "minimal",
    imageUrl: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=400&h=300&fit=crop",
    likes: 234,
  },
  {
    id: 2,
    title: "우드톤 내추럴 공간",
    mood: "wood",
    imageUrl: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=300&fit=crop",
    likes: 189,
  },
  {
    id: 3,
    title: "모던 그레이 스튜디오",
    mood: "modern",
    imageUrl: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=400&h=300&fit=crop",
    likes: 312,
  },
  {
    id: 4,
    title: "코지 빈티지 감성",
    mood: "vintage",
    imageUrl: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=400&h=300&fit=crop",
    likes: 156,
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

export default function HomePage() {
  const { nickname, moveInDate, moods } = useUserStore();

  const daysUntilMove = moveInDate
    ? differenceInDays(new Date(moveInDate), new Date())
    : null;

  return (
    <MobileContainer>
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="space-y-6"
      >
        {/* Header */}
        <motion.header variants={itemVariants} className="pt-2">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-zinc-900">
                {nickname ? `안녕하세요, ${nickname}님!` : "카카오 홈즈"}
              </h1>
              <p className="text-zinc-500 mt-1">오늘도 꿈꾸는 공간을 만들어봐요</p>
            </div>
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center">
              <HomeIcon className="w-5 h-5 text-white" />
            </div>
          </div>
        </motion.header>

        {/* D-Day Widget */}
        <motion.div variants={itemVariants}>
          <Card className="bg-gradient-to-r from-amber-50 to-orange-50 border-amber-200/50 overflow-hidden relative">
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-amber-300/20 to-orange-400/20 rounded-full -translate-y-8 translate-x-8" />
            <CardContent className="p-5">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center shadow-lg shadow-amber-200/50">
                    <CalendarDays className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="text-sm text-amber-700 font-medium">이사까지</p>
                    <p className="text-3xl font-bold bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent">
                      {daysUntilMove !== null && daysUntilMove >= 0
                        ? `D-${daysUntilMove}`
                        : "미설정"}
                    </p>
                  </div>
                </div>
                <Link href="/my">
                  <Button variant="ghost" size="sm" className="text-amber-600 hover:text-amber-700 hover:bg-amber-100">
                    설정 <ChevronRight className="w-4 h-4 ml-1" />
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Quick Action */}
        <motion.div variants={itemVariants}>
          <Link href="/canvas">
            <Card className="bg-gradient-to-r from-violet-500 to-purple-600 border-0 cursor-pointer hover:shadow-xl hover:shadow-purple-200/50 transition-all duration-300 hover:-translate-y-0.5">
              <CardContent className="p-5">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center">
                      <Sparkles className="w-7 h-7 text-white" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-white">AI 인테리어 시작하기</h3>
                      <p className="text-violet-200 text-sm">내 방 사진으로 새로운 변신을 경험해보세요</p>
                    </div>
                  </div>
                  <ChevronRight className="w-6 h-6 text-white/70" />
                </div>
              </CardContent>
            </Card>
          </Link>
        </motion.div>

        {/* Mood Tags */}
        {moods.length > 0 && (
          <motion.div variants={itemVariants} className="flex items-center gap-2">
            <span className="text-sm text-zinc-500">내 취향:</span>
            <div className="flex flex-wrap gap-2">
              {moods.map((mood) => (
                <Badge
                  key={mood}
                  variant="secondary"
                  className="bg-zinc-100 text-zinc-600 hover:bg-zinc-200"
                >
                  #{mood}
                </Badge>
              ))}
            </div>
          </motion.div>
        )}

        {/* Personalized Feed */}
        <motion.div variants={itemVariants}>
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-amber-500" />
              <h2 className="text-lg font-semibold text-zinc-900">취향 맞춤 인테리어</h2>
            </div>
            <Button variant="ghost" size="sm" className="text-zinc-500">
              더보기 <ChevronRight className="w-4 h-4 ml-1" />
            </Button>
          </div>

          <div className="grid grid-cols-2 gap-3">
            {moodInteriorReferences.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2 + index * 0.1 }}
              >
                <Card className="overflow-hidden border-0 shadow-sm hover:shadow-md transition-shadow cursor-pointer group">
                  <div className="aspect-[4/3] relative overflow-hidden">
                    <img
                      src={item.imageUrl}
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                    <Badge className="absolute bottom-2 left-2 bg-white/90 text-zinc-800 text-xs">
                      #{item.mood}
                    </Badge>
                  </div>
                  <CardContent className="p-3">
                    <h3 className="text-sm font-medium text-zinc-800 truncate">{item.title}</h3>
                    <p className="text-xs text-zinc-500 mt-1">❤️ {item.likes}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </MobileContainer>
  );
}
