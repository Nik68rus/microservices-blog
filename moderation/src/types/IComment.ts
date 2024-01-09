export interface IComment {
  id: string;
  postId: string;
  content: string;
  status: 'pending' | 'approved' | 'rejected';
}
