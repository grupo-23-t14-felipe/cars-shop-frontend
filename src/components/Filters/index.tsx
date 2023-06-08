import { Button } from "../Button";

export const FilterHome = ({ className }: { className?: string }) => {
  return (
    <section className={className}>
      <div className="flex flex-col gap-4">
        <h3 className="heading-4-600 text-black">Marca</h3>
        <ul>
          <li className="heading-6-500 pl-2 -my-1">
            <Button className="text-grey3 hover:text-grey0 duration-300">General Motors</Button>
          </li>

          <li className="heading-6-500 pl-2 -my-1">
            <Button className="text-grey3 hover:text-grey0 duration-300">Fiat</Button>
          </li>

          <li className="heading-6-500 pl-2 -my-1">
            <Button className="text-grey3 hover:text-grey0 duration-300">Ford</Button>
          </li>

          <li className="heading-6-500 pl-2 -my-1">
            <Button className="text-grey3 hover:text-grey0 duration-300">Honda</Button>
          </li>

          <li className="heading-6-500 pl-2 -my-1">
            <Button className="text-grey3 hover:text-grey0 duration-300">Porsche</Button>
          </li>

          <li className="heading-6-500 pl-2 -my-1">
            <Button className="text-grey3 hover:text-grey0 duration-300">Volkswagen</Button>
          </li>
        </ul>
      </div>

      <div className="flex flex-col gap-4">
        <h3 className="heading-4-600 text-black">Modelo</h3>
        <ul>
          <li className="heading-6-500 pl-2 -my-1">
            <Button className="text-grey3 hover:text-grey0 duration-300">Civic</Button>
          </li>

          <li className="heading-6-500 pl-2 -my-1">
            <Button className="text-grey3 hover:text-grey0 duration-300">Corolla</Button>
          </li>

          <li className="heading-6-500 pl-2 -my-1">
            <Button className="text-grey3 hover:text-grey0 duration-300">Cruze</Button>
          </li>

          <li className="heading-6-500 pl-2 -my-1">
            <Button className="text-grey3 hover:text-grey0 duration-300">Fit</Button>
          </li>

          <li className="heading-6-500 pl-2 -my-1">
            <Button className="text-grey3 hover:text-grey0 duration-300">Gol</Button>
          </li>

          <li className="heading-6-500 pl-2 -my-1">
            <Button className="text-grey3 hover:text-grey0 duration-300">Ka</Button>
          </li>

          <li className="heading-6-500 pl-2 -my-1">
            <Button className="text-grey3 hover:text-grey0 duration-300">Onix</Button>
          </li>

          <li className="heading-6-500 pl-2 -my-1">
            <Button className="text-grey3 hover:text-grey0 duration-300">Porsche 718</Button>
          </li>
        </ul>
      </div>

      <div className="flex flex-col gap-4">
        <h3 className="heading-4-600 text-black">Cor</h3>
        <ul>
          <li className="heading-6-500 pl-2 -my-1">
            <Button className="text-grey3 hover:text-grey0 duration-300">Azul</Button>
          </li>

          <li className="heading-6-500 pl-2 -my-1">
            <Button className="text-grey3 hover:text-grey0 duration-300">Branco</Button>
          </li>

          <li className="heading-6-500 pl-2 -my-1">
            <Button className="text-grey3 hover:text-grey0 duration-300">Cinza</Button>
          </li>

          <li className="heading-6-500 pl-2 -my-1">
            <Button className="text-grey3 hover:text-grey0 duration-300">Prata</Button>
          </li>

          <li className="heading-6-500 pl-2 -my-1">
            <Button className="text-grey3 hover:text-grey0 duration-300">Preto</Button>
          </li>

          <li className="heading-6-500 pl-2 -my-1">
            <Button className="text-grey3 hover:text-grey0 duration-300">Verde</Button>
          </li>
        </ul>
      </div>

      <div className="flex flex-col gap-4">
        <h3 className="heading-4-600 text-black">Ano</h3>
        <ul>
          <li className="heading-6-500 pl-2 -my-1">
            <Button className="text-grey3 hover:text-grey0 duration-300">2022</Button>
          </li>

          <li className="heading-6-500 pl-2 -my-1">
            <Button className="text-grey3 hover:text-grey0 duration-300">2021</Button>
          </li>

          <li className="heading-6-500 pl-2 -my-1">
            <Button className="text-grey3 hover:text-grey0 duration-300">2018</Button>
          </li>

          <li className="heading-6-500 pl-2 -my-1">
            <Button className="text-grey3 hover:text-grey0 duration-300">2015</Button>
          </li>

          <li className="heading-6-500 pl-2 -my-1">
            <Button className="text-grey3 hover:text-grey0 duration-300">2013</Button>
          </li>

          <li className="heading-6-500 pl-2 -my-1">
            <Button className="text-grey3 hover:text-grey0 duration-300">2012</Button>
          </li>

          <li className="heading-6-500 pl-2 -my-1">
            <Button className="text-grey3 hover:text-grey0 duration-300">2010</Button>
          </li>
        </ul>
      </div>

      <div className="flex flex-col gap-4">
        <h3 className="heading-4-600 text-black">Combustível</h3>
        <ul>
          <li className="heading-6-500 pl-2 -my-1">
            <Button className="text-grey3 hover:text-grey0 duration-300">Diesel</Button>
          </li>

          <li className="heading-6-500 pl-2 -my-1">
            <Button className="text-grey3 hover:text-grey0 duration-300">Etanol</Button>
          </li>

          <li className="heading-6-500 pl-2 -my-1">
            <Button className="text-grey3 hover:text-grey0 duration-300">Gasolina</Button>
          </li>

          <li className="heading-6-500 pl-2 -my-1">
            <Button className="text-grey3 hover:text-grey0 duration-300">Flex</Button>
          </li>
        </ul>
      </div>

      <div className="flex flex-col gap-4">
        <h3 className="heading-4-600 text-black">Km</h3>
        <div className="flex gap-6 pl-2">
          <Button className="heading-7-600 bg-grey5 text-grey3 flex justify-center items-center py-[0.4rem] w-full max-w-[125px]">
            Mínima
          </Button>
          <Button className="heading-7-600 bg-grey5 text-grey3 flex justify-center items-center py-[0.4rem] w-full max-w-[125px]">
            Máxima
          </Button>
        </div>
      </div>

      <div className="flex flex-col gap-4">
        <h3 className="heading-4-600 text-black">Preço</h3>
        <div className="flex gap-6 pl-2">
          <Button className="heading-7-600 bg-grey5 text-grey3 flex justify-center items-center py-[0.4rem] w-full max-w-[125px]">
            Mínima
          </Button>
          <Button className="heading-7-600 bg-grey5 text-grey3 flex justify-center items-center py-[0.4rem] w-full max-w-[125px]">
            Máxima
          </Button>
        </div>
      </div>
    </section>
  );
};
