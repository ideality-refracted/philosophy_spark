export interface PhilosophyConcept {
  name: string;
  philosopherOrSchool: string;
  coreIdea: string;
  applicationToLife: string;
  sepTerm: string;
  iepTerm: string;
  crashCourseTopic: string;
}

export type SparkResponse = PhilosophyConcept[];

export interface Post {
  id: string;
  content: string;
  timestamp: number;
  insights?: SparkResponse;
}