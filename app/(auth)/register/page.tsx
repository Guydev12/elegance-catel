import AppLogo from "@/components/shared/AppLogo";
import CardWrapper from "@/components/shared/CardWrapper";
import Register from "@/components/shared/register-form";
import React from "react";


const RegisterPage: React.FC = () => {
  return (
    <CardWrapper
      logo={<AppLogo />}
      title="Register"
      description="Create your Admin Account"
    >
      <Register />
    </CardWrapper>
  );
};

export default RegisterPage;
