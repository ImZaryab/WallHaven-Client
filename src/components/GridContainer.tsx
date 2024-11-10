import { ReactNode } from "react";

type GridContainerProps = {
  children: ReactNode;
};

const GridContainer = ({
  children,
}: GridContainerProps) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3 px-4 gap-4"
    >
      {children}
    </div>
  );
};

export default GridContainer;
