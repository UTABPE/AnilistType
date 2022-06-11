import styled from '@emotion/styled';

export const Title = styled.h1`
  font-size: 36px;
  font-weight: 700;
  font-family: Noto;
  color: #00cc99;
`;
export const Table = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  row-gap: 1rem;
  @media only screen and (max-width: 1200px) {
    grid-template-columns: repeat(1, minmax(0, 1fr));
  }
`;
