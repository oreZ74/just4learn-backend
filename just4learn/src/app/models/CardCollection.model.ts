import { User } from "./User.model";

export interface CardCollection {
  collectionName: string;
  userId: User;
  _id: string;
  id: string; // hinzugefügt
  cardCount: string;
  creationDate: Date
}
