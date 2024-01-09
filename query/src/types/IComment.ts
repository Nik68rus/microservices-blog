export interface IComment {
  id: string;
  content: string;
  status: 'approved' | 'rejected' | 'pending';
}

export interface IPostComment extends IComment {
  postId: string;
}
