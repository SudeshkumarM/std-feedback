export type UserRole = 'student' | 'staff';

export interface User {
  id: string;
  fullname: string;
  username: string;
  email: string;
  password?: string; // Only for local validation relative to the user's manual auth
  role: UserRole;
  register_number?: string;
  staff_code?: string;
  created_at: string;
}

export interface Feedback {
  id: string;
  student_name: string;
  staff_name: string;
  subject: string;
  rating_teaching: 'Good' | 'Average' | 'Best';
  rating_coaching: 'Good' | 'Average' | 'Best';
  rating_explanation: 'Good' | 'Average' | 'Best';
  overall_rating: number; // 0-100
  comment: string;
  reply?: string;
  created_at: string;
}
