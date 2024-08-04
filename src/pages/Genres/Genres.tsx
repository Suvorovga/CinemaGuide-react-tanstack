import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";

import "./Genres.css";
import { getGenres } from "../../api/Movie";
import { queryClient } from "../../api/QueryClient";
import GenresImage from "../../img/genres-image2.jpg";

export const Genres = () => {
  const genresQuery = useQuery(
    {
      queryFn: () => getGenres(),
      queryKey: ["genres"],
    },
    queryClient
  );

  return (
    <section className="genres__section">
      <div className="container genres__container">
        <h2 className="genres__title">Жанры фильмов</h2>
        <ul className="genres__list">
          {genresQuery.data?.map((it) => (
            <li className="genres__item" key={it}>
              <Link
                onClick={() =>
                  window.scrollTo({
                    top: 0,
                    behavior: "smooth",
                  })
                }
                to={`${it}`}
              >
                <img
                  className="genres__item-img"
                  src={GenresImage}
                  alt="Картинка"
                />
                <span className="genres__item-title">{`${it[0].toUpperCase()}${it.slice(
                  1
                )}`}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};
