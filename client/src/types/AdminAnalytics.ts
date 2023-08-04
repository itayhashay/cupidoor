export type AdminAnalyticsType = {
  users: {
    total: number;
    month: number;
    roles: [{ _id: string; count: number }];
  };
  apartments: {
    total: number;
    month: number;
    min: number;
    max: number;
    avg: number;
  };
  matches: {
    total: number;
    month: number;
  };
  chats:{
    total:number;
    messages:number;
  }
};