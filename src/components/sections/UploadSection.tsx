'use client';

import { Upload } from 'lucide-react';

export default function UploadSection() {
  return (
    <section id="upload" className="pt-8 pb-16">
      <h2 className="text-3xl font-bold text-gray-900 mb-8">
        내 방 사진 업로드
      </h2>

      <div className="bg-white rounded-2xl shadow-sm p-10 border-2 border-dashed border-gray-300 hover:border-blue-400 transition-colors cursor-pointer">
        <div className="flex flex-col items-center justify-center py-12">
          <div className="w-24 h-24 bg-blue-50 rounded-full flex items-center justify-center mb-6">
            <Upload size={40} className="text-blue-500" />
          </div>
          <h3 className="text-xl font-bold text-gray-900 mb-2">
            사진을 업로드하세요
          </h3>
          <p className="text-gray-600 mb-6">
            JPG, PNG 파일 (최대 10MB)
          </p>
          <button className="px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium">
            파일 선택하기
          </button>
        </div>
      </div>
    </section>
  );
}
