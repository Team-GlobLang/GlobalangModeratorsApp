export interface CountersResponse {
  users: UsersCounters;
  quizzes: ResourseCounter;
  shorts: ResourseCounter;
  colabs: ResourseCounter;
}

interface UsersCounters {
  active: number;
  register: number;
}

interface ResourseCounter {
  active: number;
  pending: number;
}
