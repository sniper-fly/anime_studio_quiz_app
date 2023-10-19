import { FC, ReactNode } from "react";

type LayoutProps = {
  children: ReactNode;
};

const Layout: FC<LayoutProps> = ({ children }) => {
  return (
    <>
      <div className="p-4">
        <h1 className="text-4xl font-bold text-center">Aniquiz</h1>
      </div>
      <main>{children}</main>
    </>
  );
};

export default Layout;
