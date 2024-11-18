import React, { ReactNode } from "react";
import { Card, CardContent, CardHeader } from "../ui/card";

interface CardWrapperProps {
  logo?: ReactNode; // Logo can be any valid React node (e.g., component, JSX, or text)
  title?: string | ReactNode; // Title is optional and expected to be a string
  description?: string; // Description is optional and expected to be a string
  children?: ReactNode; // Children are required and can be any valid React node
}

const CardWrapper: React.FC<CardWrapperProps> = ({ logo, title, description, children }) => {
  return (
    <div className="flex justify-center items-center min-h-screen w-full">
      <main className="w-full max-w-md mx-auto">
        <Card className="grid items-center justify-center bg-white shadow-md rounded-lg p-6">
          <CardHeader className="space-y-4 flex justify-center items-center">
            {logo && <div>{logo}</div>}
            <div className="text-center">
              {title && <h5 className="text-xl font-semibold">{title}</h5>}
              {description && <p className="text-gray-500">{description}</p>}
            </div>
          </CardHeader>
          <CardContent className="space-y-4 mt-4">{children}</CardContent>
        </Card>
      </main>
    </div>
  );
};

export default CardWrapper;
