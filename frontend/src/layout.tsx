import React from 'react';

type Props = {
  children: React.ReactNode;
};

const Layout = ({ children }: Props) => {
  return (
    <>
      <main className="lg:pl-[300px]">{children}</main>
    </>
  );
};

export default Layout;
