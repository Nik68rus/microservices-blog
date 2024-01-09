import { IComment } from './IComment';

export interface IPost {
  id: string;
  title: string;
}

export interface IPostWithComments extends IPost {
  comments: IComment[];
}
