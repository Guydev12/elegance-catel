import { auth } from "@/auth";
import Container from "@/components/shared/store/container";
import { Footer } from "@/components/shared/store/footer";
import Header from "@/components/shared/store/header";
import React from "react";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await auth();
  return (
    <Container>
      <Header session={user} />
      {children}
      <Footer />
    </Container>
  );
}
