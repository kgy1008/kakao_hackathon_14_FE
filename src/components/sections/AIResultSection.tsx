'use client';

import { useState } from 'react';

export default function AIResultSection() {
  const [sliderPosition, setSliderPosition] = useState(50);

  return (
    <section id="ai-result" className="py-16">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">
          AI가 <span className="text-blue-600">재해석한</span> 내 방
        </h2>
        <p className="text-gray-600">
          슬라이더를 움직여 변화를 확인해보세요
        </p>
      </div>

      <div className="bg-white rounded-2xl shadow-sm p-10">
        <div className="relative w-full aspect-[16/10] bg-gray-100 rounded-xl overflow-hidden">
          {/* Before Image */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <div className="text-8xl mb-4">🏠</div>
              <p className="text-gray-500 font-medium">원본 (Before)</p>
            </div>
          </div>

          {/* After Image with Clip */}
          <div
            className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-purple-50 to-blue-50"
            style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
          >
            <div className="text-center">
              <div className="text-8xl mb-4">✨</div>
              <p className="text-gray-700 font-medium">AI 결과 (After)</p>
            </div>
          </div>

          {/* Slider Handle */}
          <div
            className="absolute top-0 bottom-0 w-1 bg-white cursor-ew-resize shadow-lg"
            style={{ left: `${sliderPosition}%` }}
          >
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-10 h-10 bg-white rounded-full shadow-lg flex items-center justify-center">
              <div className="flex gap-1">
                <div className="w-0.5 h-4 bg-gray-400"></div>
                <div className="w-0.5 h-4 bg-gray-400"></div>
              </div>
            </div>
          </div>

          {/* Slider Input */}
          <input
            type="range"
            min="0"
            max="100"
            value={sliderPosition}
            onChange={(e) => setSliderPosition(Number(e.target.value))}
            className="absolute inset-0 w-full h-full opacity-0 cursor-ew-resize"
          />
        </div>

        <div className="grid grid-cols-2 gap-4 mt-6">
          <div className="text-center p-4 bg-gray-50 rounded-lg">
            <p className="text-sm text-gray-600 mb-1">적용 스타일</p>
            <p className="font-bold text-gray-900">미니멀 모던</p>
          </div>
          <div className="text-center p-4 bg-gray-50 rounded-lg">
            <p className="text-sm text-gray-600 mb-1">주거 형태</p>
            <p className="font-bold text-gray-900">월세 (무타공 제품)</p>
          </div>
        </div>
      </div>
    </section>
  );
}
