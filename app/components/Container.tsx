"use clinet";

type ContainerProps = {
  children: React.ReactNode;
};

const Container: React.FC<ContainerProps> = ({ children }) => {
  return (
    <div className="w-full mx-auto px-2 sm:px-2 md:px-10 xl:px-20">
      {children}
    </div>
  );
};

export default Container;
