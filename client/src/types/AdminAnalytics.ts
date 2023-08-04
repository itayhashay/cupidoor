export type UsersAnalyticsType = {
  total: number;
  month: number;
  roles: [{ _id: string; count: number }];
  avatars:[{firstName:string,lastName:string,avatar:string}];
};

export type ApartmentsAnalyticsType = {
  total: number;
  month: number;
  min: number;
  max: number;
  avg: number;
};

export type MatchesAnalyticsType = {
  total: number;
  month: number;
};
export type ChatsAnalyticsType = {
  total: number;
  messages: number;
};
