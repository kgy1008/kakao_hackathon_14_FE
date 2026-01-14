/**
 * Kakao Bridge Module
 * 카카오 SDK 연동 모듈
 */

export interface ShareContent {
  title: string;
  description: string;
  imageUrl: string;
  link: {
    webUrl: string;
    mobileWebUrl: string;
  };
}

export interface VoteContent {
  title: string;
  optionA: {
    title: string;
    imageUrl: string;
  };
  optionB: {
    title: string;
    imageUrl: string;
  };
}

export interface VoteResult {
  optionA: number;
  optionB: number;
  voters: string[];
}

/**
 * 카카오톡으로 시안 공유
 */
export async function shareToKakao(content: ShareContent): Promise<boolean> {
  // TODO: 실제 카카오 SDK 연동
  console.log("Sharing to Kakao:", content);
  
  // 카카오 SDK가 로드되었는지 확인
  if (typeof window !== "undefined" && (window as unknown as { Kakao?: { Share?: { sendDefault: (options: unknown) => void } } }).Kakao) {
    // Kakao.Share.sendDefault({...})
  }
  
  return true;
}

/**
 * 투표용 메시지 공유
 */
export async function shareVoteToKakao(content: VoteContent): Promise<boolean> {
  // TODO: 실제 카카오 SDK 연동
  console.log("Sharing vote to Kakao:", content);
  
  return true;
}

/**
 * 투표 결과 조회
 */
export async function getVoteResults(voteId: string): Promise<VoteResult> {
  // TODO: 실제 백엔드 API 연동
  await new Promise((resolve) => setTimeout(resolve, 500));
  
  return {
    optionA: 12,
    optionB: 8,
    voters: ["지민", "수아", "현우", "민서", "지호"],
  };
}

/**
 * 카카오 SDK 초기화
 */
export function initKakaoSDK(appKey: string): void {
  if (typeof window !== "undefined") {
    const script = document.createElement("script");
    script.src = "https://developers.kakao.com/sdk/js/kakao.js";
    script.onload = () => {
      const kakao = (window as unknown as { Kakao?: { init: (key: string) => void } }).Kakao;
      if (kakao) {
        kakao.init(appKey);
      }
    };
    document.head.appendChild(script);
  }
}

/**
 * 카톡 메시지 템플릿 생성
 */
export function createMessageTemplate(
  type: "share" | "vote",
  data: ShareContent | VoteContent
) {
  if (type === "share") {
    const shareData = data as ShareContent;
    return {
      objectType: "feed",
      content: {
        title: shareData.title,
        description: shareData.description,
        imageUrl: shareData.imageUrl,
        link: shareData.link,
      },
      buttons: [
        {
          title: "자세히 보기",
          link: shareData.link,
        },
      ],
    };
  } else {
    const voteData = data as VoteContent;
    return {
      objectType: "feed",
      content: {
        title: voteData.title,
        description: "어떤 디자인이 더 마음에 드시나요?",
        imageUrl: voteData.optionA.imageUrl,
        link: {
          webUrl: "https://kakao-homes.com",
          mobileWebUrl: "https://kakao-homes.com",
        },
      },
      buttons: [
        {
          title: "A안 투표",
          link: { webUrl: "https://kakao-homes.com/vote/a" },
        },
        {
          title: "B안 투표",
          link: { webUrl: "https://kakao-homes.com/vote/b" },
        },
      ],
    };
  }
}
