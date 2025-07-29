import { Quest, QuestCategory, QuestDifficulty, Location } from '../types';
import { locationService } from './locationService';

class QuestService {
  private questTemplates = {
    [QuestCategory.NEARBY]: [
      {
        title: '편의점에서 "봉투 필요 없어요" 말하기',
        description: '환경을 생각하는 작은 실천! 편의점에서 물건을 살 때 봉투를 거절해보세요.',
        difficulty: QuestDifficulty.EASY,
        socialExp: 10,
        courageExp: 5,
        placeTypes: ['convenience_store']
      },
      {
        title: '카페에서 직접 주문하기',
        description: '키오스크 대신 직접 점원에게 주문해보세요. 간단한 "안녕하세요"부터 시작!',
        difficulty: QuestDifficulty.EASY,
        socialExp: 15,
        courageExp: 10,
        placeTypes: ['cafe']
      },
      {
        title: '마트에서 직원에게 물건 위치 물어보기',
        description: '"○○이 어디에 있나요?" 라고 직원에게 물어보세요.',
        difficulty: QuestDifficulty.MEDIUM,
        socialExp: 20,
        courageExp: 15,
        placeTypes: ['supermarket', 'mart']
      }
    ],
    [QuestCategory.INTERACTION]: [
      {
        title: '서점에서 "베스트셀러 코너 어디예요?" 질문하기',
        description: '서점 직원에게 베스트셀러 코너 위치를 물어보세요.',
        difficulty: QuestDifficulty.MEDIUM,
        socialExp: 25,
        courageExp: 20,
        placeTypes: ['book_store']
      },
      {
        title: '버스 기사님께 인사하기',
        description: '버스에 탈 때 "안녕하세요"라고 인사해보세요.',
        difficulty: QuestDifficulty.EASY,
        socialExp: 15,
        courageExp: 25,
        placeTypes: ['bus_station']
      },
      {
        title: '은행에서 번호표 뽑고 순서 기다리기',
        description: '은행 업무를 직접 처리해보세요. 차근차근 순서를 따라가면 됩니다.',
        difficulty: QuestDifficulty.MEDIUM,
        socialExp: 30,
        courageExp: 25,
        placeTypes: ['bank']
      }
    ],
    [QuestCategory.COURAGE]: [
      {
        title: '음식점에서 혼밥하기',
        description: '혼자서도 당당하게! 좋아하는 음식점에서 혼밥을 즐겨보세요.',
        difficulty: QuestDifficulty.HARD,
        socialExp: 40,
        courageExp: 50,
        placeTypes: ['restaurant']
      },
      {
        title: '미용실에서 원하는 헤어스타일 요청하기',
        description: '미용사에게 구체적으로 원하는 스타일을 설명해보세요.',
        difficulty: QuestDifficulty.HARD,
        socialExp: 35,
        courageExp: 45,
        placeTypes: ['hair_salon']
      },
      {
        title: '카페에서 음료 맞춤 주문하기',
        description: '"얼음 적게", "시럽 추가" 등 원하는 대로 주문해보세요.',
        difficulty: QuestDifficulty.MEDIUM,
        socialExp: 25,
        courageExp: 30,
        placeTypes: ['cafe']
      }
    ],
    [QuestCategory.SOCIAL]: [
      {
        title: '길에서 길 물어보기',
        description: '지나가는 사람에게 정중하게 길을 물어보세요.',
        difficulty: QuestDifficulty.EXPERT,
        socialExp: 50,
        courageExp: 40,
        placeTypes: ['street']
      },
      {
        title: '상점에서 가격 문의하기',
        description: '"이거 얼마예요?" 라고 물어보세요.',
        difficulty: QuestDifficulty.MEDIUM,
        socialExp: 30,
        courageExp: 25,
        placeTypes: ['store']
      }
    ]
  };

  async generateDailyQuests(userLevel: number, currentLocation?: Location): Promise<Quest[]> {
    const quests: Quest[] = [];
    
    // 사용자 레벨에 맞는 퀘스트 카테고리 결정
    const availableCategories = this.getAvailableCategories(userLevel);
    
    // 각 카테고리에서 하나씩 퀘스트 생성
    for (const category of availableCategories) {
      const quest = await this.generateQuestForCategory(category, userLevel, currentLocation);
      if (quest) {
        quests.push(quest);
      }
    }
    
    return quests;
  }

  private getAvailableCategories(userLevel: number): QuestCategory[] {
    const categories: QuestCategory[] = [QuestCategory.NEARBY];
    
    if (userLevel >= 2) {
      categories.push(QuestCategory.INTERACTION);
    }
    if (userLevel >= 3) {
      categories.push(QuestCategory.COURAGE);
    }
    if (userLevel >= 4) {
      categories.push(QuestCategory.SOCIAL);
    }
    
    return categories;
  }

  private async generateQuestForCategory(
    category: QuestCategory, 
    userLevel: number, 
    currentLocation?: Location
  ): Promise<Quest | null> {
    const templates = this.questTemplates[category];
    if (!templates || templates.length === 0) return null;

    // 사용자 레벨에 맞는 난이도 필터링
    const suitableTemplates = templates.filter(template => 
      template.difficulty <= Math.min(userLevel, QuestDifficulty.EXPERT)
    );

    if (suitableTemplates.length === 0) return null;

    // 랜덤으로 템플릿 선택
    const template = suitableTemplates[Math.floor(Math.random() * suitableTemplates.length)];
    
    // 현재 위치 근처의 장소 찾기
    let questLocation: Location | undefined;
    if (currentLocation && template.placeTypes.length > 0) {
      try {
        const nearbyPlaces = await locationService.findNearbyPlaces(
          currentLocation,
          template.placeTypes[0],
          1000 // 1km 반경
        );
        if (nearbyPlaces.length > 0) {
          questLocation = nearbyPlaces[0];
        }
      } catch (error) {
        console.warn('위치 기반 퀘스트 생성 실패:', error);
      }
    }

    return {
      id: `quest_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      title: template.title,
      description: questLocation 
        ? `${template.description}\n📍 ${questLocation.placeName || questLocation.address}`
        : template.description,
      category,
      difficulty: template.difficulty,
      location: questLocation,
      reward: {
        socialExp: template.socialExp,
        courageExp: template.courageExp,
      },
      isCompleted: false,
      timeLimit: 24 * 60, // 24시간
    };
  }

  async completeQuest(questId: string): Promise<boolean> {
    try {
      // 여기서 Supabase에 퀘스트 완료 저장
      // 추후 구현
      return true;
    } catch (error) {
      console.error('퀘스트 완료 처리 중 오류:', error);
      return false;
    }
  }

  getQuestsByCategory(quests: Quest[], category: QuestCategory): Quest[] {
    return quests.filter(quest => quest.category === category);
  }

  getQuestsByDifficulty(quests: Quest[], difficulty: QuestDifficulty): Quest[] {
    return quests.filter(quest => quest.difficulty === difficulty);
  }
}

export const questService = new QuestService(); 