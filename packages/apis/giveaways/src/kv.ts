const KV_PREFIX = {
	userById: "userById:",
	userList: "userList:",
};

export type UserResult = Array<unknown>;

export type SavedUserResult = UserResult;

const createKvKey = {
	user: (userId: number | string) => `${KV_PREFIX.userById}${userId}`,
	users: (userId: number | string) => `${KV_PREFIX.userList}${userId}`,
};

export class UserKV {
	static async getUser(userId: number | string) {
		return USERS.get<SavedUserResult>(createKvKey.user(userId), {
			type: "json",
		});
	}

	static async saveUser(userId: number | string, data: SavedUserResult) {
		return USERS.put(createKvKey.user(userId), JSON.stringify(data));
	}
}

export const userKV = new UserKV();
