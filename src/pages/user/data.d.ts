export interface UserTableListItemType {
  id?: string | number;
  username?: string;
  gender?: '0' | '1';
  apartment?: string;
  registerTime?: string;
  trackNum?: number;
  isdanger?: '0' | '1';
  dangerNum?: number;
  articlePushNum?: number;
  status?: '0' | '1';
}
