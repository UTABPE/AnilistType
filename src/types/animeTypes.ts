export type AnimeType =
  | {
      id: number | undefined;
      coverImage: {
        medium: string | undefined;
      };
      title: {
        english: string | undefined;
        romaji: string | undefined;
      };
    }
  | undefined
  | null;
export type PageType = {
  data: {
    Page: {
      pageInfo: {
        total: number;
        currentPage: number;
        lastPage: number;
        hasNextPage: boolean;
        perPage: number;
      };
      media: AnimeType[];
    };
  };
};
