"use client";

import { useState, useCallback } from "react";
import { MobileContainer } from "@/components/layout/MobileContainer";
import { useUserStore } from "@/store/useUserStore";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Slider } from "@/components/ui/slider";
import { motion, AnimatePresence } from "framer-motion";
import {
  Upload,
  ImageIcon,
  Settings2,
  Sparkles,
  Check,
  ArrowRight,
  Camera,
  Palette,
  Zap,
  AlertCircle,
} from "lucide-react";

const moodOptions = [
  { id: "minimal", label: "미니멀", emoji: "🤍" },
  { id: "modern", label: "모던", emoji: "⬛" },
  { id: "wood", label: "우드톤", emoji: "🪵" },
  { id: "vintage", label: "빈티지", emoji: "🏺" },
  { id: "nordic", label: "북유럽", emoji: "🧊" },
  { id: "cozy", label: "코지", emoji: "🧸" },
  { id: "industrial", label: "인더스트리얼", emoji: "🔩" },
  { id: "natural", label: "내추럴", emoji: "🌿" },
];

const presetStyles = [
  {
    id: "style1",
    name: "모던 화이트",
    image: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=400&h=300&fit=crop",
  },
  {
    id: "style2",
    name: "우드 내추럴",
    image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=300&fit=crop",
  },
  {
    id: "style3",
    name: "미니멀 그레이",
    image: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=400&h=300&fit=crop",
  },
];

type Step = "upload" | "settings" | "results";

export default function CanvasPage() {
  const [currentStep, setCurrentStep] = useState<Step>("upload");
  const [selectedMoods, setSelectedMoods] = useState<string[]>([]);
  const [sliderValue, setSliderValue] = useState([50]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [selectedPreset, setSelectedPreset] = useState<string | null>(null);

  const {
    uploadedRoomImg,
    setUploadedRoomImg,
    aiResultImg,
    setAiResult,
    residenceType,
  } = useUserStore();

  const handleImageUpload = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file) {
        const reader = new FileReader();
        reader.onloadend = () => {
          setUploadedRoomImg(reader.result as string);
        };
        reader.readAsDataURL(file);
      }
    },
    [setUploadedRoomImg]
  );

  const handleMoodToggle = (moodId: string) => {
    setSelectedMoods((prev) =>
      prev.includes(moodId)
        ? prev.filter((m) => m !== moodId)
        : prev.length < 3
        ? [...prev, moodId]
        : prev
    );
  };

  const handleGenerate = async () => {
    setIsGenerating(true);
    // AI 생성 시뮬레이션
    await new Promise((resolve) => setTimeout(resolve, 2500));
    
    // 선택한 프리셋 또는 기본 이미지로 결과 설정
    const resultImage = selectedPreset 
      ? presetStyles.find(p => p.id === selectedPreset)?.image 
      : "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=800&h=600&fit=crop";
    
    setAiResult(resultImage || "");
    setIsGenerating(false);
    setCurrentStep("results");
  };

  const stepVariants = {
    hidden: { opacity: 0, x: 50 },
    visible: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -50 },
  };

  return (
    <MobileContainer>
      <div className="space-y-6">
        {/* Header */}
        <header className="pt-2">
          <h1 className="text-2xl font-bold text-zinc-900">AI 캔버스</h1>
          <p className="text-zinc-500 mt-1">내 방을 새롭게 변신시켜보세요</p>
        </header>

        {/* Step Indicator */}
        <div className="flex items-center justify-between px-2">
          {[
            { step: "upload", icon: Camera, label: "업로드" },
            { step: "settings", icon: Settings2, label: "설정" },
            { step: "results", icon: Sparkles, label: "결과" },
          ].map((item, index) => {
            const Icon = item.icon;
            const isActive = currentStep === item.step;
            const isPast =
              (currentStep === "settings" && item.step === "upload") ||
              (currentStep === "results" &&
                (item.step === "upload" || item.step === "settings"));

            return (
              <div key={item.step} className="flex items-center">
                <div className="flex flex-col items-center">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 ${
                      isActive
                        ? "bg-gradient-to-br from-violet-500 to-purple-600 text-white shadow-lg shadow-purple-200"
                        : isPast
                        ? "bg-green-500 text-white"
                        : "bg-zinc-100 text-zinc-400"
                    }`}
                  >
                    {isPast ? <Check className="w-5 h-5" /> : <Icon className="w-5 h-5" />}
                  </div>
                  <span
                    className={`text-xs mt-2 ${
                      isActive ? "text-violet-600 font-semibold" : "text-zinc-400"
                    }`}
                  >
                    {item.label}
                  </span>
                </div>
                {index < 2 && (
                  <div
                    className={`w-16 h-0.5 mx-2 ${
                      isPast ? "bg-green-500" : "bg-zinc-200"
                    }`}
                  />
                )}
              </div>
            );
          })}
        </div>

        {/* Step Content */}
        <AnimatePresence mode="wait">
          {currentStep === "upload" && (
            <motion.div
              key="upload"
              variants={stepVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              transition={{ duration: 0.3 }}
              className="space-y-4"
            >
              <Card className="border-2 border-dashed border-zinc-200 bg-zinc-50/50">
                <CardContent className="p-6">
                  {uploadedRoomImg ? (
                    <div className="relative">
                      <img
                        src={uploadedRoomImg}
                        alt="Uploaded room"
                        className="w-full aspect-[4/3] object-cover rounded-xl"
                      />
                      <Button
                        variant="secondary"
                        size="sm"
                        className="absolute bottom-3 right-3"
                        onClick={() => setUploadedRoomImg(null)}
                      >
                        다시 선택
                      </Button>
                    </div>
                  ) : (
                    <label className="flex flex-col items-center justify-center py-12 cursor-pointer">
                      <div className="w-16 h-16 rounded-full bg-gradient-to-br from-violet-100 to-purple-100 flex items-center justify-center mb-4">
                        <Upload className="w-8 h-8 text-violet-500" />
                      </div>
                      <span className="text-lg font-medium text-zinc-700">
                        내 방 사진 업로드
                      </span>
                      <span className="text-sm text-zinc-400 mt-1">
                        JPG, PNG 형식 지원
                      </span>
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={handleImageUpload}
                      />
                    </label>
                  )}
                </CardContent>
              </Card>

              <Button
                className="w-full bg-gradient-to-r from-violet-500 to-purple-600 hover:from-violet-600 hover:to-purple-700 h-12 text-base font-medium"
                disabled={!uploadedRoomImg}
                onClick={() => setCurrentStep("settings")}
              >
                다음 단계로
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </motion.div>
          )}

          {currentStep === "settings" && (
            <motion.div
              key="settings"
              variants={stepVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              transition={{ duration: 0.3 }}
              className="space-y-6"
            >
              {/* Residence Type Notice */}
              {residenceType === "월세" && (
                <Card className="bg-amber-50 border-amber-200">
                  <CardContent className="p-4 flex items-start gap-3">
                    <AlertCircle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium text-amber-800">
                        월세 거주자를 위한 맞춤 추천
                      </p>
                      <p className="text-xs text-amber-600 mt-1">
                        무타공 상품 위주로 구성됩니다
                      </p>
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Mood Selection */}
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <Palette className="w-5 h-5 text-violet-500" />
                  <h3 className="font-semibold text-zinc-900">스타일 선택</h3>
                  <span className="text-xs text-zinc-400">(최대 3개)</span>
                </div>
                <div className="grid grid-cols-4 gap-2">
                  {moodOptions.map((mood) => (
                    <button
                      key={mood.id}
                      onClick={() => handleMoodToggle(mood.id)}
                      className={`p-3 rounded-xl border-2 transition-all duration-200 ${
                        selectedMoods.includes(mood.id)
                          ? "border-violet-500 bg-violet-50"
                          : "border-zinc-100 bg-white hover:border-zinc-200"
                      }`}
                    >
                      <span className="text-xl">{mood.emoji}</span>
                      <p className="text-xs text-zinc-600 mt-1 truncate">{mood.label}</p>
                    </button>
                  ))}
                </div>
              </div>

              {/* Style Intensity */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <Zap className="w-5 h-5 text-violet-500" />
                    <h3 className="font-semibold text-zinc-900">변화 강도</h3>
                  </div>
                  <span className="text-sm text-violet-600 font-medium">{sliderValue}%</span>
                </div>
                <Slider
                  value={sliderValue}
                  onValueChange={setSliderValue}
                  max={100}
                  step={10}
                  className="w-full"
                />
                <div className="flex justify-between mt-2">
                  <span className="text-xs text-zinc-400">자연스럽게</span>
                  <span className="text-xs text-zinc-400">과감하게</span>
                </div>
              </div>

              {/* Preset Styles */}
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <ImageIcon className="w-5 h-5 text-violet-500" />
                  <h3 className="font-semibold text-zinc-900">스타일 프리셋</h3>
                </div>
                <div className="grid grid-cols-3 gap-2">
                  {presetStyles.map((preset) => (
                    <button
                      key={preset.id}
                      onClick={() => setSelectedPreset(preset.id)}
                      className={`relative rounded-xl overflow-hidden aspect-square border-2 transition-all ${
                        selectedPreset === preset.id
                          ? "border-violet-500 ring-2 ring-violet-200"
                          : "border-transparent"
                      }`}
                    >
                      <img
                        src={preset.image}
                        alt={preset.name}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                      <span className="absolute bottom-2 left-2 text-xs text-white font-medium">
                        {preset.name}
                      </span>
                      {selectedPreset === preset.id && (
                        <div className="absolute top-2 right-2 w-5 h-5 bg-violet-500 rounded-full flex items-center justify-center">
                          <Check className="w-3 h-3 text-white" />
                        </div>
                      )}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex gap-3">
                <Button
                  variant="outline"
                  className="flex-1 h-12"
                  onClick={() => setCurrentStep("upload")}
                >
                  이전
                </Button>
                <Button
                  className="flex-[2] bg-gradient-to-r from-violet-500 to-purple-600 hover:from-violet-600 hover:to-purple-700 h-12 text-base font-medium"
                  onClick={handleGenerate}
                  disabled={selectedMoods.length === 0 && !selectedPreset}
                >
                  {isGenerating ? (
                    <>
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                      >
                        <Sparkles className="w-5 h-5 mr-2" />
                      </motion.div>
                      생성 중...
                    </>
                  ) : (
                    <>
                      AI로 변신하기
                      <Sparkles className="w-5 h-5 ml-2" />
                    </>
                  )}
                </Button>
              </div>
            </motion.div>
          )}

          {currentStep === "results" && (
            <motion.div
              key="results"
              variants={stepVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              transition={{ duration: 0.3 }}
              className="space-y-4"
            >
              {/* Before/After Comparison */}
              <Card className="overflow-hidden">
                <CardContent className="p-0">
                  <Tabs defaultValue="after" className="w-full">
                    <TabsList className="w-full grid grid-cols-2 rounded-none h-12 bg-zinc-100">
                      <TabsTrigger
                        value="before"
                        className="rounded-none data-[state=active]:bg-white data-[state=active]:shadow-none"
                      >
                        Before
                      </TabsTrigger>
                      <TabsTrigger
                        value="after"
                        className="rounded-none data-[state=active]:bg-white data-[state=active]:shadow-none"
                      >
                        After ✨
                      </TabsTrigger>
                    </TabsList>
                    <TabsContent value="before" className="m-0">
                      <img
                        src={uploadedRoomImg || ""}
                        alt="Before"
                        className="w-full aspect-[4/3] object-cover"
                      />
                    </TabsContent>
                    <TabsContent value="after" className="m-0">
                      <img
                        src={aiResultImg || ""}
                        alt="After"
                        className="w-full aspect-[4/3] object-cover"
                      />
                    </TabsContent>
                  </Tabs>
                </CardContent>
              </Card>

              {/* Selected Moods */}
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-sm text-zinc-500">적용된 스타일:</span>
                {selectedMoods.map((moodId) => {
                  const mood = moodOptions.find((m) => m.id === moodId);
                  return (
                    <Badge key={moodId} variant="secondary" className="bg-violet-100 text-violet-700">
                      {mood?.emoji} {mood?.label}
                    </Badge>
                  );
                })}
              </div>

              {/* Actions */}
              <div className="space-y-3">
                <Button className="w-full bg-gradient-to-r from-amber-400 to-orange-500 hover:from-amber-500 hover:to-orange-600 h-12 text-base font-medium">
                  카카오톡으로 공유하기
                </Button>
                <div className="flex gap-3">
                  <Button
                    variant="outline"
                    className="flex-1 h-12"
                    onClick={() => {
                      setCurrentStep("settings");
                    }}
                  >
                    다시 생성
                  </Button>
                  <Button variant="outline" className="flex-1 h-12">
                    저장하기
                  </Button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </MobileContainer>
  );
}
