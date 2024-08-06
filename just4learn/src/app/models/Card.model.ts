export interface Card {
    title: string;
    content: string;
    question: string;
    answer: string;
    calls: number;
    right: number;
    wrong: number;
    creationDate: Date;
    cardCollectionId: string; // referring to CardCollection
    userId: string; // referring to User
    _id: string;
    id: string; // additional id field
  }
  