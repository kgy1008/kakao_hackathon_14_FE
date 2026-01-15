/**
 * Constraint Filter Module
 * 예산 및 주거형태별 가구 추천 로직
 */

export interface Furniture {
  id: string;
  name: string;
  price: number;
  category: string;
  tags: string[];
  isRemovable: boolean; // 무타공 여부
  imageUrl: string;
}

export interface FilterOptions {
  residenceType: "월세" | "전세" | "자가";
  budget: number;
  moods: string[];
}

// 샘플 가구 데이터
const sampleFurniture: Furniture[] = [
  {
    id: "1",
    name: "무타공 벽선반 3단",
    price: 45000,
    category: "수납",
    tags: ["minimal", "modern"],
    isRemovable: true,
    imageUrl: "https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?w=200&h=200&fit=crop",
  },
  {
    id: "2",
    name: "접착식 LED 조명",
    price: 25000,
    category: "조명",
    tags: ["modern", "cozy"],
    isRemovable: true,
    imageUrl: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=200&h=200&fit=crop",
  },
  {
    id: "3",
    name: "우드 책상 세트",
    price: 180000,
    category: "가구",
    tags: ["wood", "natural"],
    isRemovable: false,
    imageUrl: "https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?w=200&h=200&fit=crop",
  },
  {
    id: "4",
    name: "미니멀 행거",
    price: 89000,
    category: "수납",
    tags: ["minimal", "modern"],
    isRemovable: true,
    imageUrl: "https://images.unsplash.com/photo-1558997519-83ea9252edf8?w=200&h=200&fit=crop",
  },
  {
    id: "5",
    name: "빈티지 러그",
    price: 75000,
    category: "패브릭",
    tags: ["vintage", "cozy"],
    isRemovable: true,
    imageUrl: "https://images.unsplash.com/photo-1600166898405-da9535204843?w=200&h=200&fit=crop",
  },
];

/**
 * 주거형태와 예산에 맞는 가구 필터링
 */
export function filterFurniture(options: FilterOptions): Furniture[] {
  return sampleFurniture.filter((furniture) => {
    // 예산 필터
    if (furniture.price > options.budget * 10000) {
      return false;
    }

    // 월세인 경우 무타공 제품만
    if (options.residenceType === "월세" && !furniture.isRemovable) {
      return false;
    }

    // 무드 매칭 (적어도 하나 이상 매칭)
    if (options.moods.length > 0) {
      const hasMatchingMood = furniture.tags.some((tag) =>
        options.moods.includes(tag)
      );
      if (!hasMatchingMood) {
        return false;
      }
    }

    return true;
  });
}

/**
 * 예산 내 추천 가구 조합 생성
 */
export function generateFurnitureBundle(
  options: FilterOptions
): { items: Furniture[]; totalPrice: number } {
  const filtered = filterFurniture(options);
  const bundle: Furniture[] = [];
  let totalPrice = 0;
  const budgetWon = options.budget * 10000;

  // 각 카테고리에서 하나씩 선택 (예산 내)
  const categories = ["수납", "조명", "가구", "패브릭"];

  for (const category of categories) {
    const categoryItems = filtered.filter((f) => f.category === category);
    const affordable = categoryItems.filter(
      (f) => totalPrice + f.price <= budgetWon
    );

    if (affordable.length > 0) {
      const selected = affordable[0];
      bundle.push(selected);
      totalPrice += selected.price;
    }
  }

  return { items: bundle, totalPrice };
}

/**
 * 주거형태별 안내 메시지 생성
 */
export function getResidenceTypeMessage(
  residenceType: "월세" | "전세" | "자가"
): string {
  const messages = {
    월세: "월세 거주자를 위한 무타공 상품 위주로 구성되었습니다",
    전세: "전세 거주자를 위한 반영구 설치 가능 상품을 추천드립니다",
    자가: "자유로운 시공이 가능한 다양한 상품을 추천드립니다",
  };

  return messages[residenceType];
}
