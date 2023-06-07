"use client";

import { Button } from "@/components/Button";
import { Footer } from "@/components/Footer";
import { NavBar } from "@/components/Navbar";
import { ProductCard } from "@/components/ProductCard";
import { Select } from "@chakra-ui/react";

export const Home = () => {
  return (
    <>
      <NavBar />
      <main className="flex min-h-screen flex-col items-center justify-between p-24 bg-grey4">
        <Button type="submit" className="btn-alert-big">
          testando button
        </Button>

        <input className="input-outline input-placeholder" placeholder="testando input outline" />

        <input className="input-default input-placeholder" placeholder="testando input default" />

        <ProductCard />

        <Select placeholder="Select option" focusBorderColor="none" className="select-default">
          <option value="option1">Option 1</option>
          <option value="option2">Option 2</option>
          <option value="option3">Option 3</option>
        </Select>
      </main>
      <Footer />
    </>
  );
};

export default Home;
