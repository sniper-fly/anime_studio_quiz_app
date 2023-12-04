export interface Choice {
  name: string;
  isCorrect: boolean;
}

export interface AnimeStudioQuiz {
  title: string;
  coverImage: string;
  choices: Choice[];
}
