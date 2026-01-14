import type { Metadata } from "next";
import { Noto_Sans_KR } from "next/font/google";
import "./globals.css";
import { BottomNavigation } from "@/components/layout/BottomNavigation";

const notoSansKR = Noto_Sans_KR({
  variable: "--font-noto-sans-kr",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "카카오 홈즈 | Kakao Homes",
  description: "상상을 확신으로, 1인 가구를 위한 초개인화 AI 인테리어",
  keywords: ["인테리어", "AI", "1인 가구", "가구 추천", "카카오"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className={`${notoSansKR.variable} font-sans antialiased bg-zinc-100`}>
        <main className="relative">
          {children}
        </main>
        <BottomNavigation />
      </body>
    </html>
  );
}
