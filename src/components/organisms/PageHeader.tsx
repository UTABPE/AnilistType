import { Logo } from '../atoms/Icons';

export const PageHeader = () => {
  return (
    <section className="w-full h-[60px] flex flex-row bg-white fixed z-50">
      <div className="pl-5 pt-2">
        <Logo />
      </div>
    </section>
  );
};
