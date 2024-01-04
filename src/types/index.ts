export type Theme = "light" | "dark";
export type WorkspaceRole = "OWNER" | "ADMIN" | "MEMBER" | "GUEST";
export type AuthProvider = {
  provider: "discord" | "google" | "github" | "twitter" | "facebook" | "twitch";
};
