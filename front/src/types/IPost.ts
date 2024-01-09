import { IComment } from './IComment';

export interface IPost {
  id: string;
  title: string;
  comments: IComment[];
}
