//createdAt, deletedAt, updatedAt은 무시.

export interface IUser {
  id: string;
  nickname: string;
}

export interface IUserRelation {
  follower: {
    id: string;
    nickname: string;
  };
  following: {
    id: string;
    nickname: string;
  };
  id: number;
  friend: boolean;
}

export interface IFriends {
  followings?: IUserRelation[];
  followers?: IUserRelation[];
  friends?: IUserRelation[];
}
