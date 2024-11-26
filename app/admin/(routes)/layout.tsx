import { auth } from "@/auth";
import { CustomSidebar } from "@/components/shared/CustomSidebar";
import { getUserById } from "@/lib/actions/user.actions";
import { User } from "@prisma/client";

import { redirect } from "next/navigation";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();
  const user = await getUserById(session?.user?.id);

  console.log({ layoutUser: user });
  if (user && !user.isAdmin) {
    redirect("/");
  }
  return (
    <main>
      <CustomSidebar user={user as User}>{children}</CustomSidebar>
    </main>
  );
}
