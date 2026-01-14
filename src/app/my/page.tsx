"use client";

import { useState } from "react";
import { MobileContainer } from "@/components/layout/MobileContainer";
import { useUserStore } from "@/store/useUserStore";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { motion } from "framer-motion";
import {
  User,
  Home,
  Calendar,
  Wallet,
  Package,
  CheckSquare,
  ChevronRight,
  Edit2,
  Truck,
  Clock,
} from "lucide-react";
import { format } from "date-fns";
import { ko } from "date-fns/locale";

const residenceTypes = [
  { id: "월세", label: "월세", description: "무타공 제품 추천" },
  { id: "전세", label: "전세", description: "반영구 설치 가능" },
  { id: "자가", label: "자가", description: "자유로운 시공" },
];

const checklistItems = [
  { id: 1, text: "전입신고 완료하기", completed: true },
  { id: 2, text: "인터넷/TV 설치 예약", completed: true },
  { id: 3, text: "가스/전기 명의 변경", completed: false },
  { id: 4, text: "관리비 납부 방법 확인", completed: false },
  { id: 5, text: "비상 열쇠 보관처 지정", completed: false },
];

const deliveryItems = [
  { id: 1, name: "우드 책상", store: "이케아", status: "배송준비중", date: "1/20" },
  { id: 2, name: "무타공 선반 세트", store: "오늘의집", status: "배송중", date: "1/18" },
  { id: 3, name: "LED 조명", store: "쿠팡", status: "배송완료", date: "1/15" },
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

export default function MyPage() {
  const {
    nickname,
    residenceType,
    budget,
    moveInDate,
    moods,
    setPersona,
    setResidenceType,
    setBudget,
    setMoveInDate,
  } = useUserStore();

  const [isEditing, setIsEditing] = useState(false);
  const [tempNickname, setTempNickname] = useState(nickname || "");
  const [tempBudget, setTempBudget] = useState([budget || 100]);
  const [tempMoveInDate, setTempMoveInDate] = useState(
    moveInDate ? format(new Date(moveInDate), "yyyy-MM-dd") : ""
  );
  const [checklist, setChecklist] = useState(checklistItems);

  const handleSave = () => {
    setPersona({ nickname: tempNickname });
    setBudget(tempBudget[0]);
    if (tempMoveInDate) {
      setMoveInDate(new Date(tempMoveInDate));
    }
    setIsEditing(false);
  };

  const toggleChecklistItem = (id: number) => {
    setChecklist((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, completed: !item.completed } : item
      )
    );
  };

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
          <h1 className="text-2xl font-bold text-zinc-900">마이 룸</h1>
          <p className="text-zinc-500 mt-1">내 정보와 이사 준비를 관리해요</p>
        </motion.header>

        {/* Profile Card */}
        <motion.div variants={itemVariants}>
          <Card className="overflow-hidden">
            <div className="h-20 bg-gradient-to-r from-violet-500 to-purple-600" />
            <CardContent className="p-5 -mt-10">
              <div className="flex items-end justify-between">
                <Avatar className="w-20 h-20 border-4 border-white shadow-lg">
                  <AvatarImage src="https://api.dicebear.com/7.x/avataaars/svg?seed=myavatar" />
                  <AvatarFallback className="bg-violet-100 text-violet-600 text-xl">
                    {nickname?.[0] || "U"}
                  </AvatarFallback>
                </Avatar>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setIsEditing(!isEditing)}
                >
                  <Edit2 className="w-4 h-4 mr-1" />
                  {isEditing ? "취소" : "수정"}
                </Button>
              </div>

              {isEditing ? (
                <div className="mt-4 space-y-4">
                  <div>
                    <Label className="text-zinc-600">닉네임</Label>
                    <Input
                      value={tempNickname}
                      onChange={(e) => setTempNickname(e.target.value)}
                      placeholder="닉네임을 입력하세요"
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label className="text-zinc-600">이사 예정일</Label>
                    <Input
                      type="date"
                      value={tempMoveInDate}
                      onChange={(e) => setTempMoveInDate(e.target.value)}
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <div className="flex items-center justify-between">
                      <Label className="text-zinc-600">예산</Label>
                      <span className="text-sm text-violet-600 font-medium">
                        {tempBudget[0]}만원
                      </span>
                    </div>
                    <Slider
                      value={tempBudget}
                      onValueChange={setTempBudget}
                      min={50}
                      max={500}
                      step={10}
                      className="mt-3"
                    />
                  </div>
                  <Button onClick={handleSave} className="w-full">
                    저장하기
                  </Button>
                </div>
              ) : (
                <div className="mt-4">
                  <h2 className="text-xl font-bold text-zinc-900">
                    {nickname || "설정이 필요해요"}
                  </h2>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {moods.map((mood) => (
                      <Badge key={mood} variant="secondary" className="bg-violet-100 text-violet-700">
                        #{mood}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </motion.div>

        {/* Residence Type */}
        <motion.div variants={itemVariants}>
          <div className="flex items-center gap-2 mb-3">
            <Home className="w-5 h-5 text-violet-500" />
            <h3 className="font-semibold text-zinc-900">주거 형태</h3>
          </div>
          <div className="grid grid-cols-3 gap-2">
            {residenceTypes.map((type) => (
              <button
                key={type.id}
                onClick={() => setResidenceType(type.id)}
                className={`p-4 rounded-xl border-2 text-center transition-all ${
                  residenceType === type.id
                    ? "border-violet-500 bg-violet-50"
                    : "border-zinc-100 bg-white hover:border-zinc-200"
                }`}
              >
                <span className="font-medium text-zinc-900">{type.label}</span>
                <p className="text-xs text-zinc-500 mt-1">{type.description}</p>
              </button>
            ))}
          </div>
        </motion.div>

        {/* Quick Stats */}
        <motion.div variants={itemVariants}>
          <div className="grid grid-cols-2 gap-3">
            <Card className="bg-gradient-to-br from-amber-50 to-orange-50 border-amber-100">
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-amber-100 flex items-center justify-center">
                    <Wallet className="w-5 h-5 text-amber-600" />
                  </div>
                  <div>
                    <p className="text-xs text-amber-600">예산</p>
                    <p className="font-bold text-amber-900">{budget || 0}만원</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card className="bg-gradient-to-br from-violet-50 to-purple-50 border-violet-100">
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-violet-100 flex items-center justify-center">
                    <Calendar className="w-5 h-5 text-violet-600" />
                  </div>
                  <div>
                    <p className="text-xs text-violet-600">이사일</p>
                    <p className="font-bold text-violet-900">
                      {moveInDate
                        ? format(new Date(moveInDate), "M월 d일", { locale: ko })
                        : "미설정"}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </motion.div>

        {/* Delivery Management */}
        <motion.div variants={itemVariants}>
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <Package className="w-5 h-5 text-violet-500" />
              <h3 className="font-semibold text-zinc-900">배송 관리</h3>
            </div>
            <Button variant="ghost" size="sm" className="text-zinc-500">
              전체보기 <ChevronRight className="w-4 h-4 ml-1" />
            </Button>
          </div>

          <div className="space-y-2">
            {deliveryItems.map((item) => (
              <Card key={item.id} className="border-zinc-100">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                          item.status === "배송완료"
                            ? "bg-green-100"
                            : item.status === "배송중"
                            ? "bg-blue-100"
                            : "bg-zinc-100"
                        }`}
                      >
                        <Truck
                          className={`w-5 h-5 ${
                            item.status === "배송완료"
                              ? "text-green-600"
                              : item.status === "배송중"
                              ? "text-blue-600"
                              : "text-zinc-400"
                          }`}
                        />
                      </div>
                      <div>
                        <p className="font-medium text-zinc-900">{item.name}</p>
                        <p className="text-xs text-zinc-500">{item.store}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <Badge
                        variant="secondary"
                        className={
                          item.status === "배송완료"
                            ? "bg-green-100 text-green-700"
                            : item.status === "배송중"
                            ? "bg-blue-100 text-blue-700"
                            : "bg-zinc-100 text-zinc-600"
                        }
                      >
                        {item.status}
                      </Badge>
                      <p className="text-xs text-zinc-400 mt-1">{item.date}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </motion.div>

        {/* Moving Checklist */}
        <motion.div variants={itemVariants}>
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <CheckSquare className="w-5 h-5 text-violet-500" />
              <h3 className="font-semibold text-zinc-900">이사 체크리스트</h3>
            </div>
            <span className="text-sm text-zinc-500">
              {checklist.filter((c) => c.completed).length}/{checklist.length}
            </span>
          </div>

          <Card>
            <CardContent className="p-4 space-y-3">
              {checklist.map((item) => (
                <button
                  key={item.id}
                  onClick={() => toggleChecklistItem(item.id)}
                  className="w-full flex items-center gap-3 p-2 rounded-lg hover:bg-zinc-50 transition-colors text-left"
                >
                  <div
                    className={`w-6 h-6 rounded-lg border-2 flex items-center justify-center transition-all ${
                      item.completed
                        ? "bg-violet-500 border-violet-500"
                        : "border-zinc-300"
                    }`}
                  >
                    {item.completed && (
                      <motion.svg
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="w-4 h-4 text-white"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={3}
                          d="M5 13l4 4L19 7"
                        />
                      </motion.svg>
                    )}
                  </div>
                  <span
                    className={`flex-1 ${
                      item.completed ? "text-zinc-400 line-through" : "text-zinc-700"
                    }`}
                  >
                    {item.text}
                  </span>
                </button>
              ))}
            </CardContent>
          </Card>
        </motion.div>
      </motion.div>
    </MobileContainer>
  );
}
