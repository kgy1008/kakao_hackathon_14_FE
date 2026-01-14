"use client";

import { MobileContainer } from "@/components/layout/MobileContainer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { motion } from "framer-motion";
import {
  Share2,
  MessageCircle,
  ThumbsUp,
  Users,
  TrendingUp,
  ChevronRight,
  Heart,
} from "lucide-react";

const sharedDesigns = [
  {
    id: 1,
    title: "내 방 A안",
    thumbnail: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=200&h=150&fit=crop",
    votes: { a: 12, b: 8 },
    sharedAt: "2시간 전",
    friends: ["지민", "수아", "현우"],
  },
  {
    id: 2,
    title: "내 방 B안",
    thumbnail: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=200&h=150&fit=crop",
    votes: { a: 5, b: 15 },
    sharedAt: "어제",
    friends: ["민서", "지호"],
  },
];

const communityPosts = [
  {
    id: 1,
    user: {
      name: "인테리어초보",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=user1",
    },
    title: "원룸 3개월 꾸미기 완료!",
    image: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=400&h=300&fit=crop",
    likes: 156,
    comments: 23,
    tags: ["원룸", "미니멀", "100만원이하"],
  },
  {
    id: 2,
    user: {
      name: "우드러버",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=user2",
    },
    title: "전세집 우드톤으로 변신",
    image: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=400&h=300&fit=crop",
    likes: 89,
    comments: 12,
    tags: ["전세", "우드톤", "무타공"],
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

export default function SocialPage() {
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
          <h1 className="text-2xl font-bold text-zinc-900">소셜 피드</h1>
          <p className="text-zinc-500 mt-1">친구들의 의견을 모아보세요</p>
        </motion.header>

        {/* Shared Designs Section */}
        <motion.div variants={itemVariants}>
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Share2 className="w-5 h-5 text-amber-500" />
              <h2 className="text-lg font-semibold text-zinc-900">공유한 시안</h2>
            </div>
            <Button variant="ghost" size="sm" className="text-zinc-500">
              전체보기 <ChevronRight className="w-4 h-4 ml-1" />
            </Button>
          </div>

          <div className="space-y-4">
            {sharedDesigns.map((design) => {
              const totalVotes = design.votes.a + design.votes.b;
              const percentA = Math.round((design.votes.a / totalVotes) * 100);
              const percentB = 100 - percentA;

              return (
                <Card key={design.id} className="overflow-hidden">
                  <CardContent className="p-4">
                    <div className="flex gap-4">
                      <img
                        src={design.thumbnail}
                        alt={design.title}
                        className="w-20 h-20 rounded-xl object-cover"
                      />
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <h3 className="font-medium text-zinc-900">{design.title}</h3>
                          <span className="text-xs text-zinc-400">{design.sharedAt}</span>
                        </div>

                        {/* Vote Progress */}
                        <div className="mt-3 space-y-2">
                          <div className="flex items-center gap-2">
                            <span className="text-xs text-violet-600 font-medium w-8">A안</span>
                            <div className="flex-1 h-2 bg-zinc-100 rounded-full overflow-hidden">
                              <motion.div
                                initial={{ width: 0 }}
                                animate={{ width: `${percentA}%` }}
                                transition={{ duration: 0.8, ease: "easeOut" }}
                                className="h-full bg-gradient-to-r from-violet-400 to-purple-500 rounded-full"
                              />
                            </div>
                            <span className="text-xs text-zinc-500 w-10">{percentA}%</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="text-xs text-amber-600 font-medium w-8">B안</span>
                            <div className="flex-1 h-2 bg-zinc-100 rounded-full overflow-hidden">
                              <motion.div
                                initial={{ width: 0 }}
                                animate={{ width: `${percentB}%` }}
                                transition={{ duration: 0.8, ease: "easeOut" }}
                                className="h-full bg-gradient-to-r from-amber-400 to-orange-500 rounded-full"
                              />
                            </div>
                            <span className="text-xs text-zinc-500 w-10">{percentB}%</span>
                          </div>
                        </div>

                        {/* Friends who voted */}
                        <div className="flex items-center gap-2 mt-3">
                          <Users className="w-4 h-4 text-zinc-400" />
                          <span className="text-xs text-zinc-500">
                            {design.friends.join(", ")} 님이 투표함
                          </span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </motion.div>

        {/* Kakao Talk Mockup */}
        <motion.div variants={itemVariants}>
          <Card className="bg-gradient-to-r from-amber-400 to-yellow-400 border-0 overflow-hidden">
            <CardContent className="p-5">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center">
                  <MessageCircle className="w-7 h-7 text-zinc-800" />
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-zinc-900">친구들에게 의견 물어보기</h3>
                  <p className="text-zinc-700 text-sm mt-1">카카오톡으로 시안을 공유하고 투표받아요</p>
                </div>
              </div>
              <Button className="w-full mt-4 bg-zinc-900 hover:bg-zinc-800 text-white">
                <MessageCircle className="w-4 h-4 mr-2" />
                카카오톡 공유하기
              </Button>
            </CardContent>
          </Card>
        </motion.div>

        {/* Community Section */}
        <motion.div variants={itemVariants}>
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-violet-500" />
              <h2 className="text-lg font-semibold text-zinc-900">인기 인테리어</h2>
            </div>
            <Button variant="ghost" size="sm" className="text-zinc-500">
              더보기 <ChevronRight className="w-4 h-4 ml-1" />
            </Button>
          </div>

          <div className="space-y-4">
            {communityPosts.map((post) => (
              <Card key={post.id} className="overflow-hidden">
                <div className="aspect-[16/10] relative">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4">
                    <div className="flex items-center gap-2 mb-2">
                      <Avatar className="w-6 h-6">
                        <AvatarImage src={post.user.avatar} />
                        <AvatarFallback>{post.user.name[0]}</AvatarFallback>
                      </Avatar>
                      <span className="text-white text-sm font-medium">{post.user.name}</span>
                    </div>
                    <h3 className="text-white font-semibold">{post.title}</h3>
                  </div>
                </div>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex gap-2 flex-wrap">
                      {post.tags.map((tag) => (
                        <Badge key={tag} variant="secondary" className="bg-zinc-100 text-zinc-600 text-xs">
                          #{tag}
                        </Badge>
                      ))}
                    </div>
                    <div className="flex items-center gap-4 text-zinc-500">
                      <button className="flex items-center gap-1 hover:text-rose-500 transition-colors">
                        <Heart className="w-4 h-4" />
                        <span className="text-xs">{post.likes}</span>
                      </button>
                      <button className="flex items-center gap-1 hover:text-violet-500 transition-colors">
                        <MessageCircle className="w-4 h-4" />
                        <span className="text-xs">{post.comments}</span>
                      </button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </MobileContainer>
  );
}
