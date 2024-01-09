export interface IComment {
  id: string;
  content: string;
  status: 'approved' | 'rejected' | 'pending';
}
