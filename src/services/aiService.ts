import { AISimulation, ChatMessage, Emotion } from '../types';

class AIService {
  private apiKey = 'YOUR_OPENAI_API_KEY';

  private scenarios = {
    cafe_order: {
      title: '카페에서 주문하기',
      description: '카페 직원과 자연스럽게 대화하며 음료를 주문해보세요',
      systemPrompt: '당신은 친절한 카페 직원입니다. 고객이 주문을 할 때 자연스럽고 따뜻하게 응대해주세요.',
    },
    hair_salon: {
      title: '미용실에서 스타일 요청',
      description: '미용사에게 원하는 헤어스타일을 설명하고 상담받아보세요',
      systemPrompt: '당신은 경험이 풍부한 미용사입니다. 고객의 요청을 듣고 전문적이면서도 친근하게 상담해주세요.',
    },
    store_inquiry: {
      title: '매장에서 물건 문의',
      description: '매장 직원에게 찾는 물건의 위치나 정보를 물어보세요',
      systemPrompt: '당신은 매장의 친절한 직원입니다. 고객의 문의에 도움이 되도록 정확하고 친절하게 안내해주세요.',
    },
    restaurant: {
      title: '식당에서 주문하기',
      description: '식당에서 메뉴를 보고 음식을 주문해보세요',
      systemPrompt: '당신은 식당의 서빙 직원입니다. 메뉴 추천과 주문을 받을 때 친절하게 도와주세요.',
    },
    bank: {
      title: '은행 업무 처리',
      description: '은행에서 계좌 개설이나 기타 업무를 처리해보세요',
      systemPrompt: '당신은 은행의 직원입니다. 고객의 업무를 전문적이면서도 친절하게 도와주세요.',
    },
    // 전화 관련 시나리오들 추가
    phone_reservation: {
      title: '전화로 식당 예약하기',
      description: '식당에 전화를 걸어 테이블을 예약해보세요. 날짜, 시간, 인원수를 명확히 전달하는 연습을 해보세요',
      systemPrompt: '당신은 식당의 예약 담당 직원입니다. 고객이 전화로 예약을 할 때 필요한 정보(날짜, 시간, 인원수, 연락처)를 친절하게 안내하고 확인해주세요. 간혹 원하는 시간이 만석일 수도 있으니 대안을 제시해주세요.',
    },
    phone_delivery: {
      title: '전화로 배달 주문하기',
      description: '치킨이나 피자 등을 전화로 주문해보세요. 메뉴, 주소, 결제방법을 또박또박 말하는 연습을 해보세요',
      systemPrompt: '당신은 배달음식점의 주문 받는 직원입니다. 고객이 전화로 주문할 때 메뉴 확인, 주소 확인, 결제방법, 예상 배달시간을 안내해주세요. 메뉴를 잘못 들었거나 주소가 불분명할 때는 다시 확인해주세요.',
    },
    phone_appointment: {
      title: '전화로 병원 예약하기',
      description: '병원에 전화를 걸어 진료 예약을 잡아보세요. 증상과 희망 날짜를 차근차근 설명해보세요',
      systemPrompt: '당신은 병원의 접수 담당자입니다. 환자가 전화로 예약을 할 때 이름, 생년월일, 증상, 희망 날짜와 시간을 확인하고 가능한 예약 시간을 안내해주세요. 초진인지 재진인지도 확인해주세요.',
    },
    phone_inquiry: {
      title: '전화로 고객센터 문의하기',
      description: '인터넷, 택배, 카드 등의 고객센터에 전화해서 문제를 해결해보세요. 상황을 정리해서 설명하는 연습을 해보세요',
      systemPrompt: '당신은 고객센터 상담원입니다. 고객이 전화로 문의할 때 문제 상황을 차근차근 들어보고, 필요한 정보(고객번호, 주소, 상품명 등)를 확인한 후 해결방안을 안내해주세요. 복잡한 경우 단계별로 설명해주세요.',
    },
    phone_complaint: {
      title: '전화로 정중하게 컴플레인하기',
      description: '서비스에 문제가 있을 때 감정적이지 않고 차분하게 문제를 설명하고 해결을 요청해보세요',
      systemPrompt: '당신은 고객센터 상담원입니다. 고객이 불만사항을 제기할 때 공감하며 들어보고, 문제 상황을 정확히 파악한 후 가능한 해결방안을 제시해주세요. 고객이 화가 나더라도 차분하게 응대해주세요.',
    },
    phone_job_call: {
      title: '전화로 면접 일정 조율하기',
      description: '면접 연락이 왔을 때 침착하게 일정을 조율하고 필요한 정보를 확인해보세요',
      systemPrompt: '당신은 회사의 인사담당자입니다. 면접 대상자에게 전화를 걸어 면접 일정을 조율하고, 면접 장소, 준비물, 소요시간 등을 안내해주세요. 지원자가 긴장해하면 친근하게 격려해주세요.',
    },
  };

  async createSimulation(scenarioId: string): Promise<AISimulation> {
    const scenario = this.scenarios[scenarioId as keyof typeof this.scenarios];
    if (!scenario) {
      throw new Error('시나리오를 찾을 수 없습니다.');
    }

    return {
      id: `sim_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      scenarioId,
      messages: [
        {
          id: `msg_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
          role: 'assistant',
          content: this.getScenarioStartMessage(scenarioId),
          timestamp: new Date().toISOString(),
        }
      ],
      isActive: true,
      startedAt: new Date().toISOString(),
    };
  }

  private getScenarioStartMessage(scenarioId: string): string {
    const startMessages = {
      cafe_order: '안녕하세요! 저희 카페에 오신 것을 환영합니다. 주문하실 음료가 있으신가요?',
      hair_salon: '안녕하세요! 오늘은 어떤 스타일로 해드릴까요? 원하시는 느낌이나 길이가 있으시면 말씀해주세요.',
      store_inquiry: '안녕하세요! 무엇을 도와드릴까요? 찾으시는 물건이 있으시면 알려주세요.',
      restaurant: '안녕하세요! 어서오세요. 메뉴 보시고 주문하실 준비가 되시면 말씀해주세요.',
      bank: '안녕하세요. 오늘 어떤 업무를 도와드릴까요?',
      phone_reservation: '네, 안녕하세요. ○○식당입니다. 예약 도와드릴까요?',
      phone_delivery: '네, 안녕하세요! ○○치킨입니다. 주문 받겠습니다.',
      phone_appointment: '네, ○○병원입니다. 진료 예약 도와드릴까요?',
      phone_inquiry: '안녕하세요. ○○고객센터입니다. 어떤 문의사항이 있으신가요?',
      phone_complaint: '안녕하세요. 고객센터입니다. 불편사항이 있으셨나요? 자세히 말씀해주시면 도와드리겠습니다.',
      phone_job_call: '안녕하세요. ○○회사 인사팀입니다. 면접 일정 관련해서 연락드렸는데요, 지금 통화 가능하신가요?',
    };

    return startMessages[scenarioId as keyof typeof startMessages] || '안녕하세요! 대화를 시작해볼까요?';
  }

  getAvailableScenarios() {
    return Object.entries(this.scenarios).map(([id, scenario]) => ({
      id,
      ...scenario,
    }));
  }

  async sendMessage(simulationId: string, content: string): Promise<ChatMessage> {
    // 실제로는 OpenAI API를 호출하지만, 여기서는 시뮬레이션된 응답을 반환
    const responses = [
      '네, 좋은 선택이네요! 다른 것도 필요하신가요?',
      '그렇게 해드릴게요. 잠시만 기다려주세요.',
      '혹시 다른 궁금한 점이 있으시면 언제든 말씀해주세요.',
      '네, 알겠습니다. 그럼 이렇게 진행해드릴게요.',
      '좋은 생각이에요! 그 방법으로 해보시죠.',
    ];

    return {
      id: `msg_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      role: 'assistant',
      content: responses[Math.floor(Math.random() * responses.length)],
      timestamp: new Date().toISOString(),
    };
  }

  async generateEmotionFeedback(emotion: Emotion, context: string): Promise<string> {
    const feedbackTemplates = {
      [Emotion.EXCITED]: [
        '정말 멋져요! 🎉 이런 뿌듯함이 바로 성장의 증거예요. 특히 전화 통화는 많은 사람들이 어려워하는데, 성공적으로 해내신 것이 대단합니다!',
        '와! 정말 잘하셨네요! 😊 전화로 대화하는 것이 점점 더 자연스러워지고 있어요. 이런 성취감을 계속 쌓아가세요!',
        '훌륭합니다! ✨ 전화 공포를 이겨내고 성공한 경험이 앞으로 더 큰 자신감이 될 거예요!',
      ],
      [Emotion.HAPPY]: [
        '행복한 마음이 전해져요! 😊 전화 통화를 무사히 마치신 것만으로도 큰 발전이에요. 작은 성공들이 모여 큰 변화를 만들어내고 있어요.',
        '기쁜 마음이 느껴져요! 🌟 전화로 소통하는 것이 생각보다 어렵지 않다는 것을 경험하셨겠네요.',
        '정말 뿌듯하셨을 것 같아요! 💝 전화 한 통으로 문제를 해결하는 경험은 분명 자신감을 키워줄 거예요.',
      ],
      [Emotion.CONFIDENT]: [
        '자신감이 느껴져요! 💪 전화 통화에 대한 두려움이 줄어들고 있다는 증거예요. 이런 마음가짐이면 다음 통화는 더 쉬울 거예요.',
        '당당하게 해내셨네요! 😎 전화로 할 말을 또박또박 전달하는 것은 정말 중요한 스킬이에요.',
        '자신있게 통화하시는 모습이 멋져요! ⭐ 이제 전화가 더 이상 두렵지 않을 거예요.',
      ],
      [Emotion.NERVOUS]: [
        '떨리는 마음으로도 해내신 당신이 정말 대단해요! 😊 전화 공포는 누구나 경험하는 자연스러운 감정이에요. 용기 있는 첫 발걸음이었습니다.',
        '긴장하셨지만 끝까지 해내셨네요! 💪 처음엔 누구나 떨려요. 하지만 경험이 쌓일수록 편해질 거예요.',
        '떨렸지만 포기하지 않은 것이 중요해요! 🌟 다음번엔 조금 더 수월할 거예요. 차근차근 연습해보세요.',
      ],
      [Emotion.DIFFICULT]: [
        '힘들었지만 포기하지 않은 당신을 응원해요! 💪 전화 통화는 연습이 필요한 스킬이에요. 오늘의 경험이 다음번을 더 쉽게 만들어줄 거예요.',
        '어려우셨지만 끝까지 해내셨네요! 🌟 전화로 의사소통하는 것은 많은 사람들이 어려워해요. 조금씩 늘어가고 있어요.',
        '힘든 과정이었지만 성장하고 계세요! ✨ 전화 대화 스킬은 하루아침에 늘지 않아요. 꾸준히 연습하면 분명 편해질 거예요.',
      ],
      [Emotion.ANXIOUS]: [
        '불안함에도 불구하고 도전한 당신이 훌륭해요! 🌟 전화 통화 전 불안한 마음은 당연해요. 미리 할 말을 정리하고 연습하면 다음엔 더 편할 거예요.',
        '걱정이 많으셨지만 해내셨네요! 😊 전화 공포증은 충분히 극복할 수 있어요. 작은 성공을 쌓아가고 계시는 중이에요.',
        '불안했지만 용기를 내셨군요! 💝 전화 통화가 생각보다 괜찮다는 것을 느끼셨을 거예요. 조금씩 자신감을 키워가세요.',
      ],
    };

    const templates = feedbackTemplates[emotion] || feedbackTemplates[Emotion.CONFIDENT];
    return templates[Math.floor(Math.random() * templates.length)];
  }
}

export const aiService = new AIService(); 