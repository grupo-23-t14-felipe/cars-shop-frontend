import { Button } from "@/components/Button";
import { Footer } from "@/components/Footer";
import { NavBar } from "@/components/Navbar";
import { ProductCard } from "@/components/ProductCard";
import background from "@/assets/bg_header.png";
import Image from "next/image";
import { FilterHome } from "@/components/Filters";

const cars = [
  {
    id: "25f228f7-fb6e-4fcf-8814-61adc5ebfd05",
    brand: "Nissan",
    model: "Skyline GTR R35",
    year: 2015,
    fuel_type: "Diesel",
    mileage: 60000,
    color: "black",
    on_discount: true,
    value: 500000,
    description:
      "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Consequuntur adipisci praesentium inventore dolorum laudantium veniam a quaerat corrupti? Consectetur a alias eveniet suscipit? Debitis ducimus eveniet non fuga, praesentium sed.",
    user: {
      name: "Samuel Leão"
    },
    galleries: [
      {
        img_url: "https://www.pastorecc.com.br/site/photos/cars/775/bg_1968567413558c4015e16d9.jpg"
      },
      {
        img_url: "https://www.pastorecc.com.br/site/photos/cars/775/bg_1726740558558c67254e0b0.jpg"
      },
      {
        img_url: "https://www.pastorecc.com.br/site/photos/cars/775/bg_569043550558c66b3b06a5.jpg"
      },
      {
        img_url: "https://www.pastorecc.com.br/site/photos/cars/775/bg_1334620571558c66c682d04.jpg"
      }
    ]
  },
  {
    id: "25f228f7-fb6e-4fcf-8814-61adc5ebfd05",
    brand: "Nissan",
    model: "Skyline GTR R35",
    year: 2015,
    fuel_type: "Diesel",
    mileage: 60000,
    color: "black",
    on_discount: true,
    value: 500000,
    description:
      "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Consequuntur adipisci praesentium inventore dolorum laudantium veniam a quaerat corrupti? Consectetur a alias eveniet suscipit? Debitis ducimus eveniet non fuga, praesentium sed.",
    user: {
      name: "Samuel Leão"
    },
    galleries: [
      {
        img_url: "https://www.pastorecc.com.br/site/photos/cars/775/bg_1968567413558c4015e16d9.jpg"
      },
      {
        img_url: "https://www.pastorecc.com.br/site/photos/cars/775/bg_1726740558558c67254e0b0.jpg"
      },
      {
        img_url: "https://www.pastorecc.com.br/site/photos/cars/775/bg_569043550558c66b3b06a5.jpg"
      },
      {
        img_url: "https://www.pastorecc.com.br/site/photos/cars/775/bg_1334620571558c66c682d04.jpg"
      }
    ]
  },
  {
    id: "25f228f7-fb6e-4fcf-8814-61adc5ebfd05",
    brand: "Nissan",
    model: "Skyline GTR R35",
    year: 2015,
    fuel_type: "Diesel",
    mileage: 60000,
    color: "black",
    on_discount: true,
    value: 500000,
    description:
      "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Consequuntur adipisci praesentium inventore dolorum laudantium veniam a quaerat corrupti? Consectetur a alias eveniet suscipit? Debitis ducimus eveniet non fuga, praesentium sed.",
    user: {
      name: "Samuel Leão"
    },
    galleries: [
      {
        img_url: "https://www.pastorecc.com.br/site/photos/cars/775/bg_1968567413558c4015e16d9.jpg"
      },
      {
        img_url: "https://www.pastorecc.com.br/site/photos/cars/775/bg_1726740558558c67254e0b0.jpg"
      },
      {
        img_url: "https://www.pastorecc.com.br/site/photos/cars/775/bg_569043550558c66b3b06a5.jpg"
      },
      {
        img_url: "https://www.pastorecc.com.br/site/photos/cars/775/bg_1334620571558c66c682d04.jpg"
      }
    ]
  },
  {
    id: "25f228f7-fb6e-4fcf-8814-61adc5ebfd05",
    brand: "Nissan",
    model: "Skyline GTR R35",
    year: 2015,
    fuel_type: "Diesel",
    mileage: 60000,
    color: "black",
    on_discount: true,
    value: 500000,
    description:
      "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Consequuntur adipisci praesentium inventore dolorum laudantium veniam a quaerat corrupti? Consectetur a alias eveniet suscipit? Debitis ducimus eveniet non fuga, praesentium sed.",
    user: {
      name: "Samuel Leão"
    },
    galleries: [
      {
        img_url: "https://www.pastorecc.com.br/site/photos/cars/775/bg_1968567413558c4015e16d9.jpg"
      },
      {
        img_url: "https://www.pastorecc.com.br/site/photos/cars/775/bg_1726740558558c67254e0b0.jpg"
      },
      {
        img_url: "https://www.pastorecc.com.br/site/photos/cars/775/bg_569043550558c66b3b06a5.jpg"
      },
      {
        img_url: "https://www.pastorecc.com.br/site/photos/cars/775/bg_1334620571558c66c682d04.jpg"
      }
    ]
  },
  {
    id: "25f228f7-fb6e-4fcf-8814-61adc5ebfd05",
    brand: "Nissan",
    model: "Skyline GTR R35",
    year: 2015,
    fuel_type: "Diesel",
    mileage: 60000,
    color: "black",
    on_discount: true,
    value: 500000,
    description:
      "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Consequuntur adipisci praesentium inventore dolorum laudantium veniam a quaerat corrupti? Consectetur a alias eveniet suscipit? Debitis ducimus eveniet non fuga, praesentium sed.",
    user: {
      name: "Samuel Leão"
    },
    galleries: [
      {
        img_url: "https://www.pastorecc.com.br/site/photos/cars/775/bg_1968567413558c4015e16d9.jpg"
      },
      {
        img_url: "https://www.pastorecc.com.br/site/photos/cars/775/bg_1726740558558c67254e0b0.jpg"
      },
      {
        img_url: "https://www.pastorecc.com.br/site/photos/cars/775/bg_569043550558c66b3b06a5.jpg"
      },
      {
        img_url: "https://www.pastorecc.com.br/site/photos/cars/775/bg_1334620571558c66c682d04.jpg"
      }
    ]
  },
  {
    id: "25f228f7-fb6e-4fcf-8814-61adc5ebfd05",
    brand: "Nissan",
    model: "Skyline GTR R35",
    year: 2015,
    fuel_type: "Diesel",
    mileage: 60000,
    color: "black",
    on_discount: true,
    value: 500000,
    description:
      "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Consequuntur adipisci praesentium inventore dolorum laudantium veniam a quaerat corrupti? Consectetur a alias eveniet suscipit? Debitis ducimus eveniet non fuga, praesentium sed.",
    user: {
      name: "Samuel Leão"
    },
    galleries: [
      {
        img_url: "https://www.pastorecc.com.br/site/photos/cars/775/bg_1968567413558c4015e16d9.jpg"
      },
      {
        img_url: "https://www.pastorecc.com.br/site/photos/cars/775/bg_1726740558558c67254e0b0.jpg"
      },
      {
        img_url: "https://www.pastorecc.com.br/site/photos/cars/775/bg_569043550558c66b3b06a5.jpg"
      },
      {
        img_url: "https://www.pastorecc.com.br/site/photos/cars/775/bg_1334620571558c66c682d04.jpg"
      }
    ]
  },
  {
    id: "25f228f7-fb6e-4fcf-8814-61adc5ebfd05",
    brand: "Nissan",
    model: "Skyline GTR R35",
    year: 2015,
    fuel_type: "Diesel",
    mileage: 60000,
    color: "black",
    on_discount: true,
    value: 500000,
    description:
      "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Consequuntur adipisci praesentium inventore dolorum laudantium veniam a quaerat corrupti? Consectetur a alias eveniet suscipit? Debitis ducimus eveniet non fuga, praesentium sed.",
    user: {
      name: "Samuel Leão"
    },
    galleries: [
      {
        img_url: "https://www.pastorecc.com.br/site/photos/cars/775/bg_1968567413558c4015e16d9.jpg"
      },
      {
        img_url: "https://www.pastorecc.com.br/site/photos/cars/775/bg_1726740558558c67254e0b0.jpg"
      },
      {
        img_url: "https://www.pastorecc.com.br/site/photos/cars/775/bg_569043550558c66b3b06a5.jpg"
      },
      {
        img_url: "https://www.pastorecc.com.br/site/photos/cars/775/bg_1334620571558c66c682d04.jpg"
      }
    ]
  },
  {
    id: "25f228f7-fb6e-4fcf-8814-61adc5ebfd05",
    brand: "Nissan",
    model: "Skyline GTR R35",
    year: 2015,
    fuel_type: "Diesel",
    mileage: 60000,
    color: "black",
    on_discount: true,
    value: 500000,
    description:
      "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Consequuntur adipisci praesentium inventore dolorum laudantium veniam a quaerat corrupti? Consectetur a alias eveniet suscipit? Debitis ducimus eveniet non fuga, praesentium sed.",
    user: {
      name: "Samuel Leão"
    },
    galleries: [
      {
        img_url: "https://www.pastorecc.com.br/site/photos/cars/775/bg_1968567413558c4015e16d9.jpg"
      },
      {
        img_url: "https://www.pastorecc.com.br/site/photos/cars/775/bg_1726740558558c67254e0b0.jpg"
      },
      {
        img_url: "https://www.pastorecc.com.br/site/photos/cars/775/bg_569043550558c66b3b06a5.jpg"
      },
      {
        img_url: "https://www.pastorecc.com.br/site/photos/cars/775/bg_1334620571558c66c682d04.jpg"
      }
    ]
  },
  {
    id: "25f228f7-fb6e-4fcf-8814-61adc5ebfd05",
    brand: "Nissan",
    model: "Skyline GTR R35",
    year: 2015,
    fuel_type: "Diesel",
    mileage: 60000,
    color: "black",
    on_discount: true,
    value: 500000,
    description:
      "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Consequuntur adipisci praesentium inventore dolorum laudantium veniam a quaerat corrupti? Consectetur a alias eveniet suscipit? Debitis ducimus eveniet non fuga, praesentium sed.",
    user: {
      name: "Samuel Leão"
    },
    galleries: [
      {
        img_url: "https://www.pastorecc.com.br/site/photos/cars/775/bg_1968567413558c4015e16d9.jpg"
      },
      {
        img_url: "https://www.pastorecc.com.br/site/photos/cars/775/bg_1726740558558c67254e0b0.jpg"
      },
      {
        img_url: "https://www.pastorecc.com.br/site/photos/cars/775/bg_569043550558c66b3b06a5.jpg"
      },
      {
        img_url: "https://www.pastorecc.com.br/site/photos/cars/775/bg_1334620571558c66c682d04.jpg"
      }
    ]
  },
  {
    id: "25f228f7-fb6e-4fcf-8814-61adc5ebfd05",
    brand: "Nissan",
    model: "Skyline GTR R35",
    year: 2015,
    fuel_type: "Diesel",
    mileage: 60000,
    color: "black",
    on_discount: true,
    value: 500000,
    description:
      "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Consequuntur adipisci praesentium inventore dolorum laudantium veniam a quaerat corrupti? Consectetur a alias eveniet suscipit? Debitis ducimus eveniet non fuga, praesentium sed.",
    user: {
      name: "Samuel Leão"
    },
    galleries: [
      {
        img_url: "https://www.pastorecc.com.br/site/photos/cars/775/bg_1968567413558c4015e16d9.jpg"
      },
      {
        img_url: "https://www.pastorecc.com.br/site/photos/cars/775/bg_1726740558558c67254e0b0.jpg"
      },
      {
        img_url: "https://www.pastorecc.com.br/site/photos/cars/775/bg_569043550558c66b3b06a5.jpg"
      },
      {
        img_url: "https://www.pastorecc.com.br/site/photos/cars/775/bg_1334620571558c66c682d04.jpg"
      }
    ]
  },
  {
    id: "25f228f7-fb6e-4fcf-8814-61adc5ebfd05",
    brand: "Nissan",
    model: "Skyline GTR R35",
    year: 2015,
    fuel_type: "Diesel",
    mileage: 60000,
    color: "black",
    on_discount: true,
    value: 500000,
    description:
      "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Consequuntur adipisci praesentium inventore dolorum laudantium veniam a quaerat corrupti? Consectetur a alias eveniet suscipit? Debitis ducimus eveniet non fuga, praesentium sed.",
    user: {
      name: "Samuel Leão"
    },
    galleries: [
      {
        img_url: "https://www.pastorecc.com.br/site/photos/cars/775/bg_1968567413558c4015e16d9.jpg"
      },
      {
        img_url: "https://www.pastorecc.com.br/site/photos/cars/775/bg_1726740558558c67254e0b0.jpg"
      },
      {
        img_url: "https://www.pastorecc.com.br/site/photos/cars/775/bg_569043550558c66b3b06a5.jpg"
      },
      {
        img_url: "https://www.pastorecc.com.br/site/photos/cars/775/bg_1334620571558c66c682d04.jpg"
      }
    ]
  },
  {
    id: "25f228f7-fb6e-4fcf-8814-61adc5ebfd05",
    brand: "Nissan",
    model: "Skyline GTR R35",
    year: 2015,
    fuel_type: "Diesel",
    mileage: 60000,
    color: "black",
    on_discount: true,
    value: 500000,
    description:
      "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Consequuntur adipisci praesentium inventore dolorum laudantium veniam a quaerat corrupti? Consectetur a alias eveniet suscipit? Debitis ducimus eveniet non fuga, praesentium sed.",
    user: {
      name: "Samuel Leão"
    },
    galleries: [
      {
        img_url: "https://www.pastorecc.com.br/site/photos/cars/775/bg_1968567413558c4015e16d9.jpg"
      },
      {
        img_url: "https://www.pastorecc.com.br/site/photos/cars/775/bg_1726740558558c67254e0b0.jpg"
      },
      {
        img_url: "https://www.pastorecc.com.br/site/photos/cars/775/bg_569043550558c66b3b06a5.jpg"
      },
      {
        img_url: "https://www.pastorecc.com.br/site/photos/cars/775/bg_1334620571558c66c682d04.jpg"
      }
    ]
  }
];

export const Home = () => {
  return (
    <>
      <NavBar />
      <header className="h-screen lg:h-[537px] w-full relative">
        <figure className="absolute top-0 right-0 left-0 bottom-0 -z-10">
          <Image src={background} alt="background" className="object-contain h-full w-full" />
        </figure>

        <div className="h-full pb-72 lg:pb-32 gap-8 flex flex-col justify-center items-center text-center text-grey10 bg-gradient-to-t from-black to-[#868e9630]">
          <h1 className="heading-3-500 md:heading-1-700">Motors Shop</h1>
          <p className="heading-5-500 md:heading-2-600">
            A melhor plataforma de anúncios de carros do país
          </p>
        </div>
      </header>

      <main className="py-14 pb-20 flex flex-col container-1">
        <section className="flex justify-between gap-7">
          <FilterHome className="hidden lg:flex lg:flex-col w-full max-w-[454px] pl-4 sm:pl-[1.875rem] lg:gap-9 xl:w-1/4 2xl:w-full" />
          <section className="flex h-min flex-nowrap overflow-scroll pl-[1.875rem] pr-4 sm:pr-[1.875rem] lg:pr-[3.75rem] gap-12 mb-20 lg:overflow-auto lg:flex-wrap xl:grid xl:grid-cols-3 xl:w-9/12 2xl:flex 2xl:w-auto 2xl:gap-10">
            {cars.map((car) => (
              <ProductCard car={car} />
            ))}
          </section>
        </section>

        <div className="flex justify-center mb-12 lg:hidden">
          <Button className="btn-brand1-big w-[279px]">Filtros</Button>
        </div>

        <div className="flex flex-col md:flex-row justify-center items-center gap-5">
          {/* <Button className="text-brand2 heading-5-600 hover:scale-105 duration-300">
            {"<"} Anterior
          </Button> */}

          <p className="heading-5-600 text-grey4">
            <span className="text-grey3">1</span> de 2
          </p>

          <Button className="text-brand2 heading-5-600 hover:scale-105 duration-300">
            Seguinte {">"}
          </Button>
        </div>
      </main>

      <Footer />
    </>
  );
};

export default Home;
