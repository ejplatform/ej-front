export class Nudge {

  static EAGER = 'eager';
  static INTERVAL_BLOCKED = 'interval_blocked';
  static GLOBAL_BLOCKED = 'global_blocked';

  static ALL_STATES = [Nudge.EAGER,Nudge.INTERVAL_BLOCKED, Nudge.GLOBAL_BLOCKED];

  public state: string;
  public title: string;
  public imagePath: string;
  public detail: string;  

  
}
