"use client";

import { Select } from "@chakra-ui/react";

export const Home = () => {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24 bg-grey4">
      <button type="button" className="btn-outline-1-big">
        testando button
      </button>

      <input className="input-outline" placeholder="testando input outline" />

      <input className="input-default" placeholder="testando input default" />

      <Select placeholder="Select option" focusBorderColor="none" className="select-default">
        <option value="option1">Option 1</option>
        <option value="option2">Option 2</option>
        <option value="option3">Option 3</option>
      </Select>
    </main>
  );
};

export default Home;
