type User = {
  name: string;
  admin: boolean;
  password: string;
};

const users = new Map<string, User>();
users.set("505", { name: "Lekan James", admin: true, password: "126621" });
users.set("1234", { name: "Chigozie Oduah", admin: false, password: "abcba" });
users.set("6661", { name: "Emmanuel Oduah", admin: false, password: "cbabc" });

export function validateUser(userID: string, password: string): boolean {
  if (!users.has(userID)) return false;
  else if (users.get(userID)?.password === password) return true;
  else return false;
}

export function getUser(userID: string) {
  const user = users.get(userID);
  return {
    name: user?.name,
    id: userID,
    admin: user?.admin,
  };
}
