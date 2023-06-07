const card = {
  brand: "Nissan",
  model: "Skyline GTR R35",
  year: 2015,
  fuel_type: "Diesel",
  mileage: 60000,
  color: "black",
  on_discount: false,
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
};
export interface ICars {
  brand: string;
  model: string;
  year: number;
  fuel_type: string;
  mileage: number;
  color: string;
  on_discount: boolean;
  value: number;
  description: string;
  user: IUser;
  galleries: IGallery[];
}

export interface IUser {
  name: string;
}

export interface IGallery {
  img_url: string;
}

interface IProductCardProps {
  car?: ICars;
}

export const ProductCard = ({ car = card }: IProductCardProps) => {
  return (
    <li className="w-[312px] h-[350px] list-none flex flex-col gap-4 cursor-pointer">
      <figure className="bg-grey7 h-[152px] overflow-hidden flex justify-center items-center">
        <img src={car!.galleries[0].img_url} alt={car!.brand} className=" h-[152px]" />
      </figure>

      <h2 className="heading-7-600 text-grey1">{car!.brand}</h2>

      <p className="body-2-400 text-grey2 line-clamp-2 h-[46px]">{car!.description}</p>

      <div className="flex gap-2 items-center">
        <div className="w-8 h-8 rounded-full bg-brand2 flex justify-center items-center">
          <p className="text-whiteFixed font-medium text-sm">
            {car!.user.name[0].toUpperCase() +
              car!.user.name[car!.user.name.lastIndexOf(" ") + 1].toUpperCase()}
          </p>
        </div>
        <p className="text-grey2 body-2-500">{car!.user.name}</p>
      </div>

      <div className="flex justify-between items-center">
        <div className="flex gap-3">
          <p className="body-2-500 text-brand1 rounded py-1 px-2 bg-brand4">{car.mileage} KM</p>
          <p className="body-2-500 text-brand1 rounded py-1 px-2 bg-brand4">{car.year}</p>
        </div>

        <p className="heading-7-600 text-grey1">
          {car.value.toLocaleString(undefined, { style: "currency", currency: "BRL" })}
        </p>
      </div>
    </li>
  );
};
