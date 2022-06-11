import { ReactComponent as ArrowRightSvg } from '../../assets/arrow_right.svg';
import { ReactComponent as CrossSvg } from '../../assets/x.svg';
import { ReactComponent as LikeSvg } from '../../assets/like.svg';
import { ReactComponent as LogoSvg } from '../../assets/logo.svg';

export const Logo = () => {
  return <LogoSvg />;
};

export const Like = ({ stroke }) => {
  return <LikeSvg stroke={stroke} />;
};

export const Cross = ({ onClick }) => {
  return (
    <button onClick={onClick}>
      <CrossSvg />
    </button>
  );
};
export const ArrowRight = () => {
  return <ArrowRightSvg />;
};
