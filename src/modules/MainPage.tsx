import { AnimeType, PageType } from 'types/animeTypes';
import { useContext, useEffect, useState } from 'react';
import { AppContext } from '../AppContext';
import { ArrowRight } from '../components/atoms/Icons.jsx';
import { SearchBar } from '../components/atoms/SearchBar';
import { AnimeCard } from '../components/molecules/AnimeCard';
import { FavAnimeCard } from '../components/molecules/FavAnimeCard';
import { Table, Title } from '../components/atoms/CssTags.jsx';
// import { useMemo } from 'react';

export const MainPage = () => {
  const { favoriteAnime } = useContext(AppContext);
  const [searchTerm, setSearchTerm] = useState();
  const [page, setPage] = useState(1);
  const [hasNextPage, setHasNextPage] = useState(false);
  const [searchedAnime, setSearchedAnime] = useState<AnimeType[]>([]);
  const [pageLoading, setPageLoading] = useState<boolean>(false);

  const searchHandler = (e: React.BaseSyntheticEvent) => {
    setPageLoading(true);
    setSearchTerm(e.target.value);
    setPage(1);
    setTimeout(() => {
      setHasNextPage(false);
      setSearchedAnime([]);
    }, 500);
  };

  useEffect(() => {
    const searchDelay = setTimeout(() => {
      if (searchTerm) {
        let query = `
        query ($id: Int, $page: Int, $perPage: Int, $search: String) {
          Page (page: $page, perPage: $perPage) {
            pageInfo {
              total
              currentPage
              lastPage
              hasNextPage
              perPage
            }
            media (id: $id, search: $search) {
              id
              coverImage {
                medium
              }
              title {
                english
                romaji
              }
            }
          }
        }
        `;
        var variables = {
          search: searchTerm,
          page: page,
          perPage: 6,
        };

        var url = 'https://graphql.anilist.co',
          options = {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              Accept: 'application/json',
            },
            body: JSON.stringify({
              query: query,
              variables: variables,
            }),
          };

        fetch(url, options)
          .then(handleResponse)
          .then(handleData)
          .catch(handleError);

        function handleResponse(response: any) {
          return response.json().then(function (json: any) {
            return response.ok ? json : Promise.reject(json);
          });
        }

        function handleData(data: PageType) {
          setSearchedAnime((prevState: AnimeType[]) => [
            ...prevState,
            ...data.data.Page.media,
          ]);
          setHasNextPage(data.data.Page.pageInfo.hasNextPage);
          setPageLoading(false);
        }

        function handleError(error: any) {
          console.error(error);
        }
      }
    }, 500);
    return () => clearTimeout(searchDelay);
  }, [searchTerm, page]);

  return (
    <section className="w-[1200px] flex flex-col items-center gap-7 py-7 sm:w-[385px]">
      <Title>Список аниме</Title>
      <SearchBar onChange={searchHandler} />
      <Table className={`gap-x-6 min-h-[50px] ${pageLoading && 'opacity-50'}`}>
        {searchedAnime?.map((item: AnimeType) => (
          <AnimeCard key={item?.id} item={item} />
        ))}
      </Table>
      {hasNextPage && (
        <button
          className="w-40 h-12 flex flex-row items-center justify-center gap-5 bg-[#00cc99] rounded"
          onClick={() => {
            setPage((prev) => prev + 1);
            setPageLoading(true);
          }}
        >
          {pageLoading ? (
            <>Loading ...</>
          ) : (
            <>
              More <ArrowRight />
            </>
          )}
        </button>
      )}
      <Title>Любимое аниме</Title>
      <Table className="gap-x-[71px]">
        {favoriteAnime?.map((item: any) => (
          <FavAnimeCard key={item.id} item={item} />
        ))}
      </Table>
    </section>
  );
};
