const BASE_URL =
  process.env.NODE_ENV === "development"
    ? "http://localhost:3000"
    : "https://your-production-url.com";

const config = {
  url: {
    BASE_URL,
    AUTH_SIGNIN_URL: `${BASE_URL}/auth/signin`,
    WORKSPACE_URL: (slug?: string) =>
      `${BASE_URL}/workspace${slug ? `/${slug}` : ""}`,
    WORKSPACE_BOARD_HOME_URL: (slug: string) =>
      `${BASE_URL}/workspace/${slug}/home`,
    WORKSPACE_MEMBERS_URL: (slug: string) =>
      `${BASE_URL}/workspace/${slug}/members`,
    WORKSPACE_MEMBERS_GUEST_URL: (slug: string) =>
      `${BASE_URL}/workspace/${slug}/members/guests`,
    WORKSPACE_MEMBERS_REQUEST_URL: (slug: string) =>
      `${BASE_URL}/workspace/${slug}/members/requests`,
    WORKSPACE_PARAMS_URL: (slug: string) =>
      `${BASE_URL}/workspace/${slug}/account`,
    WORKSPACE_BOARD_URL: (slug: string, boardId: string) =>
      `${BASE_URL}/board/${boardId}/${slug}`,
  },
};

export default config;
