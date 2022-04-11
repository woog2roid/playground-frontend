export interface IUser {
  id: string;
  nickname: string;
  //createdAt, deletedAt, updatedAt은 무시.
}

interface friendRelation {
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
  followings?: friendRelation[];
  followers?: friendRelation[];
  friends?: friendRelation[];
}
