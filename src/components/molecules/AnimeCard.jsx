import styled from '@emotion/styled';
import { useContext, useState } from 'react';
import { AppContext } from '../../AppContext';
import { Like } from '../atoms/Icons';

const Span = styled.span`
  font-size: 16px;
  font-weight: 700;
  font-family: Montserrat;
`;

export const AnimeCard = ({ item }) => {
  const [isLiked, setIsLiked] = useState(false);
  const { favoriteAnime, setFavoriteAnime, isFavoriteAnime } =
    useContext(AppContext);
  const clickHandler = () => {
    if (isFavoriteAnime(favoriteAnime, item)) {
      setFavoriteAnime((prev) =>
        prev.filter((oldItem) => oldItem.id !== item.id)
      );
      setIsLiked(false);
    } else {
      setFavoriteAnime((prev) => [...prev, item]);
      setIsLiked(true);
    }
  };
  return (
    <section className="bg-white w-96 h-80 flex flex-col ">
      <div className="h-44 overflow-hidden flex justify-center">
        <img className="w-full h-[500px]" src={item.coverImage.medium} />
      </div>
      <div className="h-36 flex flex-row items-center p-3">
        <div className="h-full w-full flex flex-col items-center content-start py-5 pl-6">
          <Span>{item.title.english}</Span>
          <Span>{item.title.romaji}</Span>
        </div>
        <div className="h-full flex flex-col justify-end">
          <button onClick={clickHandler}>
            <Like stroke={`${isLiked && `red`}`} />
          </button>
        </div>
      </div>
    </section>
  );
};
