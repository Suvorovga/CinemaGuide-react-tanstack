import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";

import "./Top10FilmSection.css";
import { getTop10Movie } from "../../api/Movie";
import { queryClient } from "../../api/QueryClient";
import { FilmCard } from "../../components/FilmCard/FilmCard";

export const Top10FilmSection = () => {
  const {
    status: top10FilmStatus,
    data: top10FilmData,
    error,
  } = useQuery(
    {
      queryFn: () => getTop10Movie(),
      queryKey: ["top10"],
      retry: 0,
    },
    queryClient
  );

  switch (top10FilmStatus) {
    case "pending":
      return (
        <section className="top-film__section">
          <div className="container top-film__container">
            <p style={{ color: "white", marginLeft: 80 }}>
              Скоро что-то появится...
            </p>
          </div>
        </section>
      );

    case "error":
      return (
        <section className="top-film__section">
          <div className="container top-film__container">
            <p style={{ color: "white", marginLeft: 80 }}>{error.message}</p>
          </div>
        </section>
      );
  }

  return (
    <section className="top-film__section">
      <div className="container top-film__container">
        <h2 className="top-film__title">Топ 10 фильмов</h2>
        <ul className="top-film__list">
          {top10FilmData.map((it, index) => (
            <li key={it.id} className="top-film__item">
              <Link
                onClick={() =>
                  window.scrollTo({
                    top: 0,
                    behavior: "smooth",
                  })
                }
                to={`/movie/${it.id}`}
              >
                <FilmCard type={"top10"} filmData={it} number={index} />
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};
