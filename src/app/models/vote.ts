export class Vote {

  id: number;
  comment: number;
  value: number;
  created_at: string;

  static AGREE = 1
  static PASS = 0
  static DISAGREE = -1
}
