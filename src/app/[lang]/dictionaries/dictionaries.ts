import "server-only";

export type Locale = keyof typeof dictionaries;

const dictionaries = {
  en: () => import("./en.json").then((module) => module.default),
  fr: () => import("./fr.json").then((module) => module.default),
};

export const getDictionary = async (locale: Locale) => dictionaries[locale]();
