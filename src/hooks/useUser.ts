"use client";

import { UserContext } from "@/context/UserContext";
import { useContext } from "react";

export const useUser = () => {
  return useContext(UserContext);
};
