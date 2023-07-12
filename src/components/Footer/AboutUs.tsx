import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { AiFillGithub } from "react-icons/ai";
import { FaLinkedin } from "react-icons/fa";

interface IResponseGitUserexport {
  login: string;
  id: number;
  node_id: string;
  avatar_url: string;
  gravatar_id: string;
  url: string;
  html_url: string;
  followers_url: string;
  following_url: string;
  gists_url: string;
  starred_url: string;
  subscriptions_url: string;
  organizations_url: string;
  repos_url: string;
  events_url: string;
  received_events_url: string;
  type: string;
  site_admin: boolean;
  name: string;
  company: any;
  blog: string;
  location: string;
  email: any;
  hireable: any;
  bio: string;
  twitter_username: any;
  public_repos: number;
  public_gists: number;
  followers: number;
  following: number;
  created_at: string;
  updated_at: string;
}

export const AboutUs = () => {
  const [users, setUsers] = useState<
    | undefined
    | {
        ana: IResponseGitUserexport;
        hugo: IResponseGitUserexport;
        mateus: IResponseGitUserexport;
        natalia: IResponseGitUserexport;
        wigny: IResponseGitUserexport;
      }
  >();

  useEffect(() => {
    (async () => {
      const gitAna = (await axios.get(`https://api.github.com/users/nakszor`)).data;
      const gitHugo = (await axios.get(`https://api.github.com/users/hugommbrito`)).data;
      const gitMateus = (await axios.get(`https://api.github.com/users/Mateus9286`)).data;
      const gitNatalia = (await axios.get(`https://api.github.com/users/nataliauai`)).data;
      const gitWigny = (await axios.get(`https://api.github.com/users/wiigny`)).data;

      setUsers({
        ana: gitAna,
        hugo: gitHugo,
        mateus: gitMateus,
        natalia: gitNatalia,
        wigny: gitWigny
      });
    })();
  }, []);

  return users ? (
    <div className="animate-aboutUs">
      <p className="mb-7 body-2-500 text-grey2">Pessoas que trabalharam para criar este projeto.</p>
      <ul className="flex flex-wrap gap-10 justify-center xl:justify-between xl:gap-5">
        <li className="text-grey3 hover:text-grey10 duration-300 flex gap-4 w-52 scale-95 hover:scale-100">
          <figure className="rounded-full overflow-hidden h-20 w-20">
            <Image src={users.ana.avatar_url} alt="Ana Carla" width={100} height={100} />
          </figure>

          <section className="flex flex-col justify-between">
            <p>Ana Carla</p>

            <Link href={users.ana.html_url} target="_blank" className="flex gap-2 items-center">
              <AiFillGithub />
              Github
            </Link>

            <Link
              href="https://www.linkedin.com/in/nakszor/"
              target="_blank"
              className="flex gap-2 items-center">
              <FaLinkedin />
              LinkedIn
            </Link>
          </section>
        </li>

        <li className="text-grey3 hover:text-grey10 duration-300 flex gap-4 w-52 scale-95 hover:scale-100">
          <figure className="rounded-full overflow-hidden h-20 w-20">
            <Image src={users.hugo.avatar_url} alt="Hugo Brito" width={100} height={100} />
          </figure>

          <section className="flex flex-col justify-between">
            <p>Hugo Brito</p>

            <Link href={users.hugo.html_url} target="_blank" className="flex gap-2 items-center">
              <AiFillGithub />
              Github
            </Link>

            <Link
              href="https://www.linkedin.com/in/hugommbrito/"
              target="_blank"
              className="flex gap-2 items-center">
              <FaLinkedin />
              LinkedIn
            </Link>
          </section>
        </li>

        <li className="text-grey3 hover:text-grey10 duration-300 flex gap-4 w-52 scale-95 hover:scale-100">
          <figure className="rounded-full overflow-hidden h-20 w-20">
            <Image src={users.mateus.avatar_url} alt="Mateus Rossi" width={100} height={100} />
          </figure>

          <section className="flex flex-col justify-between">
            <p>Mateus Rossi</p>

            <Link href={users.mateus.html_url} target="_blank" className="flex gap-2 items-center">
              <AiFillGithub />
              Github
            </Link>

            <Link
              href="https://www.linkedin.com/in/mateus-rossi/"
              target="_blank"
              className="flex gap-2 items-center">
              <FaLinkedin />
              LinkedIn
            </Link>
          </section>
        </li>

        <li className="text-grey3 hover:text-grey10 duration-300 flex gap-4 w-52 scale-95 hover:scale-100">
          <figure className="rounded-full overflow-hidden h-20 w-20">
            <Image src={users.natalia.avatar_url} alt="Natalia Silva" width={100} height={100} />
          </figure>

          <section className="flex flex-col justify-between">
            <p>Natalia Silva</p>

            <Link href={users.natalia.html_url} target="_blank" className="flex gap-2 items-center">
              <AiFillGithub />
              Github
            </Link>

            <Link
              href="https://www.linkedin.com/in/natalia-s-p/"
              target="_blank"
              className="flex gap-2 items-center">
              <FaLinkedin />
              LinkedIn
            </Link>
          </section>
        </li>

        <li className="text-grey3 hover:text-grey10 duration-300 flex gap-4 w-52 scale-95 hover:scale-100">
          <figure className="rounded-full overflow-hidden h-20 w-20">
            <Image src={users.wigny.avatar_url} alt="Wigny Oliveira" width={100} height={100} />
          </figure>

          <section className="flex flex-col justify-between">
            <p>Wigny Oliveira</p>

            <Link href={users.wigny.html_url} target="_blank" className="flex gap-2 items-center">
              <AiFillGithub />
              Github
            </Link>

            <Link
              href="https://www.linkedin.com/in/wigny-oliveira/"
              target="_blank"
              className="flex gap-2 items-center">
              <FaLinkedin />
              LinkedIn
            </Link>
          </section>
        </li>
      </ul>
    </div>
  ) : null;
};
