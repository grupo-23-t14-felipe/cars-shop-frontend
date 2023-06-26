export interface IListCars {
  chevrolet: IChevrolet[];
  citroën: ICitron[];
  fiat: IFiat[];
  ford: IFord[];
  honda: IHonda[];
  hyundai: IHyundai[];
  nissan: INissan[];
  peugeot: IPeugeot[];
  renault: IRenault[];
  toyota: IToyoum[];
  volkswagen: IVolkswagen[];
}

export interface IListModelCars {
  brand: string;
  fuel: number;
  id: string;
  name: string;
  value: number;
  year: string;
}

interface IChevrolet {
  name: string;
}

interface ICitron {
  name: string;
}

interface IFiat {
  name: string;
}

interface IFord {
  name: string;
}

interface IHonda {
  name: string;
}

interface IHyundai {
  name: string;
}

interface INissan {
  name: string;
}

interface IPeugeot {
  name: string;
}

interface IRenault {
  name: string;
}

interface IToyoum {
  name: string;
}

interface IVolkswagen {
  name: string;
}
