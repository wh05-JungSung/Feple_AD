// QC 대시보드용 Mock 데이터 연결 파일
// 현재는 고정된 Mock 데이터를 사용하며, 차후 API 연결 시 이 파일을 통해 전환

import { ConsultationData } from "./consultationData";
import { 
  fixedConsultantInfo,
  getFixedEvaluationsByConsultant,
  getAllFixedEvaluations 
} from "./fixedQcMockData";

// 상담사별 평가 데이터 조회 (Mock 버전) - 고정된 데이터 사용
export const getMockEvaluationsByConsultant = (consultantId: string): ConsultationData[] => {
  return getFixedEvaluationsByConsultant(consultantId);
};

// 모든 상담사의 평가 데이터 조회 (Mock 버전) - 고정된 데이터 사용
export const getAllMockEvaluations = (): ConsultationData[] => {
  return getAllFixedEvaluations();
};

// 상담사별 최신 평가 데이터 조회
export const getLatestMockEvaluationByConsultant = (consultantId: string): ConsultationData | null => {
  const evaluations = getMockEvaluationsByConsultant(consultantId);
  
  if (evaluations.length === 0) {
    return null;
  }

  // 날짜순으로 정렬하여 최신 데이터 반환
  const sortedEvaluations = evaluations.sort((a, b) => 
    new Date(b.datetime).getTime() - new Date(a.datetime).getTime()
  );

  return sortedEvaluations[0];
};

// Mock 데이터 사용 여부 설정
export const USE_MOCK_DATA = true;

// Mock 데이터 사용 여부 확인
export const shouldUseMockData = (): boolean => {
  // 환경 변수가 명시적으로 'false'로 설정된 경우에만 API 사용
  if (process.env.NEXT_PUBLIC_USE_MOCK_DATA === 'false') {
    console.log('🔗 환경 변수로 API 모드 강제 활성화');
    return false;
  }
  
  // 기본값: Mock 데이터 사용 (개발/배포 환경 모두)
  console.log('🎭 Mock 데이터 모드 활성화 (기본값)');
  return USE_MOCK_DATA;
};

// 상담사 정보 매핑 (UI 표시용) - 고정된 정보 사용
export const consultantInfo = fixedConsultantInfo;