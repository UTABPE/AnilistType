import { createContext, useContext, useEffect, useState } from 'react';

import React from 'react';
import { AnimeType } from 'types/animeTypes';
export type FavoriteAnime = {};

export type PageMeatType = {
  favoriteAnime?: AnimeType[];
};
export type AppContextType = PageMeatType & {
  setFavoriteAnime: (favoriteAnime?: any) => void;
  isFavoriteAnime: (data: any, obj: any) => any;
};

export const AppContext = createContext<AppContextType>({
  favoriteAnime: [],
  /* eslint-disable @typescript-eslint/no-empty-function */
  setFavoriteAnime: () => {
    //int
  },
  isFavoriteAnime: () => {
    //init
  },
  /* eslint-enable @typescript-eslint/no-empty-function */
});

export const AppContextProvider = ({ children }: any) => {
  const [favoriteAnime, setFavoriteAnime] = useState<AnimeType[]>([]);
  const isFavoriteAnime = (data: AnimeType[], obj: any) => {
    return data?.some((el: any) =>
      Object.entries(obj).every(([key, value]) => value === el[key])
    );
  };
  return (
    <AppContext.Provider
      value={{
        favoriteAnime,
        setFavoriteAnime,
        isFavoriteAnime,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

/**
 * Use this component to define the PageMeta in the AppContext in declarative way
 * @param props
 * @returns null. not rendered in the component
 */
export const PageMeta: React.FC<PageMeatType> = ({ favoriteAnime }: any) => {
  const appContext: any = useContext(AppContext);

  useEffect(() => {
    appContext.setFavoriteAnime(favoriteAnime);
  }, [favoriteAnime]);

  return <></>;
};
