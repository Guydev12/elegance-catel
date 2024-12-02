import React from "react";
type ContainerProps = {
  children: React.ReactNode;
};
const Container: React.FC<ContainerProps> = ({ children }) => {
  return <main className="max-w-screen-2lg mx-auto">{children}</main>;
};

export default Container;
