import styled from '@emotion/styled';
import { useContext, useEffect, useState } from 'react';
import { AppContext } from '../AppContext';
import { ArrowRight } from '../components/atoms/Icons.jsx';
import { SearchBar } from '../components/atoms/SearchBar.jsx';
import { AnimeCard } from '../components/molecules/AnimeCard.jsx';
import { FavAnimeCard } from '../components/molecules/FavAnimeCard.jsx';

const Title = styled.h1`
  font-size: 36px;
  font-weight: 700;
  font-family: Noto;
  color: #00cc99;
`;
const Table = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  row-gap: 1rem;
  @media only screen and (max-width: 1200px) {
    grid-template-columns: repeat(1, minmax(0, 1fr));
  }
`;
export const MainPage = () => {
  const { favoriteAnime } = useContext(AppContext);
  const [searchTerm, setSearchTerm] = useState();
  const [searchedAnime, setSearchedAnime] = useState([]);
  const [hasNextPage, setHasNextPage] = useState(false);
  const [page, setPage] = useState(1);
  const [pageLoading, setPageLoading] = useState(false);
  const searchHandler = (e) => {
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

        function handleResponse(response) {
          return response.json().then(function (json) {
            return response.ok ? json : Promise.reject(json);
          });
        }

        function handleData(data) {
          setSearchedAnime((prev) => [...prev, ...data.data.Page.media]);
          setHasNextPage(data.data.Page.pageInfo.hasNextPage);
          // console.log(data);
          setPageLoading(false);
        }

        function handleError(error) {
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
      <Table className="gap-x-6">
        {searchedAnime?.map((item) => (
          <AnimeCard key={item.id} item={item} />
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
        {favoriteAnime?.map((item) => (
          <FavAnimeCard key={item.id} item={item} />
        ))}
      </Table>
    </section>
  );
};
