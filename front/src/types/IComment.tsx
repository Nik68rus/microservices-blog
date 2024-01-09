export interface IComment {
  id: string;
  content: string;
  status: 'pending' | 'approved' | 'rejected';
}
