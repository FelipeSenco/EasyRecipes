import React, { useEffect } from "react";
import { useUserQuery } from "../../../Api/Queries/UserQueries";

export const CreateWarcraftBuildOrder = () => {
  const { data: user } = useUserQuery();

  if (!user) return null;
  return <div data-testid="warcraft-create-page">Create Warcraft</div>;
};
