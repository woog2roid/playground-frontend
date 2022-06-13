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

export interface IChatRoom {
  title: string;
  id: number;
  unreads: number;
}

export interface IChat {
  id: number;
  roomId: number;
  system: boolean;
  message: string;
  createdAt: Date;
  sender: {
    id: string;
    nickname: string;
  };
}
