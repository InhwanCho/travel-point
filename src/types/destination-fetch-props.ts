export const themeCategories = {
  history: { cat1: 'A02', cat2: 'A0201' },
  healing: { cat1: 'A02', cat2: 'A0202' },
  nature: { cat1: 'A01', cat2: 'A0101' },
  experience: { cat1: 'A02', cat2: 'A0203' },
  activity: { cat1: 'A03', cat2: 'A0303' }
};

export interface FetchDestinationProps {
  areaName?: string;
  count?: string;
  page?: string;
}

export interface fetchThemeDestinationByCatProps {
  areaName?: string;
  count: string;
  page: string;
  theme: keyof typeof themeCategories;
}