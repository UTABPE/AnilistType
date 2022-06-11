import styled from '@emotion/styled';
import { useContext } from 'react';
import { AppContext } from '../../AppContext';
import { Cross } from '../atoms/Icons';

const Span = styled.span`
  font-size: 16px;
  font-weight: 700;
  font-family: Montserrat;
`;

export const FavAnimeCard = ({ item }) => {
  const { setFavoriteAnime } = useContext(AppContext);
  const clickHandler = () => {
    setFavoriteAnime((prev) =>
      prev.filter((oldItem) => oldItem.id !== item.id)
    );
  };
  return (
    <section className=" w-[352px] h-56 flex flex-row bg-white justify-center">
      <div className="w-28 overflow-hidden">
        <img
          className="w-auto h-full max-w-none"
          src={item.coverImage.medium}
        />
      </div>
      <div className="w-60 h-full flex flex-row justify-between p-3">
        <div className="h-full flex flex-col items-center content-start py-5 pl-6">
          <Span>{item.title.english}</Span>
          <Span>{item.title.romaji}</Span>
        </div>
        <div className="h-full flex flex-col justify-end">
          <Cross onClick={clickHandler} />
        </div>
      </div>
    </section>
  );
};
