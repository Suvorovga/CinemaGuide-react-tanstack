import { useMutation, useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { useContext, useState } from "react";

import { addFavorite, deleteFavorite, getRandomMovie } from "../../api/Movie";
import { queryClient } from "../../api/QueryClient";
import "./RandomFilmSection.css";
import { Trailer } from "../../components/Trailer/Trailer";
import { ProfileDataContext } from "../../App";

export const RandomFilmSection = () => {
  const [visibleTrailer, setVisibleTrailer] = useState(false);

  const {
    status: randomFilmStatus,
    data: randomFilmData,
    refetch: randomFilmRefetch,
  } = useQuery(
    {
      queryFn: () => getRandomMovie(),
      queryKey: ["random-film"],
      retry: 0,
    },
    queryClient
  );

  const addFavoriteMutation = useMutation(
    {
      mutationFn: (id: string) => addFavorite(id),
      onSuccess() {
        queryClient.invalidateQueries({ queryKey: ["user", "me"] });
      },
    },
    queryClient
  );

  const deleteFavoriteMutation = useMutation(
    {
      mutationFn: (id: string) => deleteFavorite(id),
      onSuccess() {
        queryClient.invalidateQueries({ queryKey: ["user", "me"] });
      },
    },
    queryClient
  );

  function onClickTrailer() {
    setVisibleTrailer(true);
    document.body.style.overflow = "hidden";
  }

  const profileData = useContext(ProfileDataContext);

  switch (randomFilmStatus) {
    case "pending":
      return (
        <section className="random-film__section">
          <div className="container random-film__container">
            <p style={{ color: "white", marginLeft: 80 }}>
              Скоро что-то появится...
            </p>
          </div>
        </section>
      );

    case "error":
      return (
        <section className="random-film__section">
          <div className="container random-film__container">
            <p style={{ color: "white", marginLeft: 80 }}>
              Что-то пошло не так...
            </p>
          </div>
        </section>
      );
  }

  return (
    <section className="random-film__section">
      <Trailer
        isActive={visibleTrailer}
        onClose={() => {
          setVisibleTrailer(false);
          document.body.style.overflow = "auto";
        }}
        data={randomFilmData}
      />
      <div className="random-film__image-container">
        <img
          className="random-film__image"
          src={
            randomFilmData.backdropUrl
              ? randomFilmData.backdropUrl
              : "../../src/img/baner-movie-main.jpg"
          }
          alt="Будущая картинка постера"
        />
      </div>
      <div className="container random-film__container">
        <div className="random-film__descr">
          <div className="random-film__info">
            <span className="random-film__raiting">
              <img src="../../src/img/star.png" alt="" />{" "}
              {randomFilmData.tmdbRating}
            </span>
            <span className="random-film__year">
              {randomFilmData.releaseYear}
            </span>
            <span className="random-film__genre">
              {randomFilmData.genres.join(" ")}
            </span>
            <span className="random-film__time">{`${Math.floor(
              Number(randomFilmData.runtime) / 60
            )} ч ${Number(randomFilmData.runtime) % 60} мин`}</span>
          </div>
          <h1 className="random-film__name">{randomFilmData.originalTitle}</h1>
          <div className="random-film__plot">{randomFilmData.plot}</div>
          <div className="random-film__btns">
            <button
              onClick={onClickTrailer}
              className="random-film__btn random-film__btn-trailer"
            >
              Трейлер
            </button>
            <Link
              to={`/movie/${randomFilmData.id}`}
              className="random-film__btn random-film__btn-about"
              onClick={() =>
                window.scrollBy({
                  top: -1000,
                  behavior: "smooth",
                })
              }
            >
              О фильме
            </Link>
            <button
              className={`random-film__btn random-film__btn-favor ${
                profileData?.favorites.includes(randomFilmData.id.toString())
                  ? "active"
                  : ""
              }`}
              onClick={(e) => {
                if (e.currentTarget.className.includes("active")) {
                  deleteFavoriteMutation.mutate(randomFilmData.id.toString());
                } else {
                  addFavoriteMutation.mutate(randomFilmData.id.toString());
                }
              }}
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 20 19"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M14.5 0C17.5376 0 20 2.5 20 6C20 13 12.5 17 10 18.5C7.5 17 0 13 0 6C0 2.5 2.5 0 5.5 0C7.35997 0 9 1 10 2C11 1 12.64 0 14.5 0ZM10.9339 15.6038C11.8155 15.0485 12.61 14.4955 13.3549 13.9029C16.3337 11.533 18 8.9435 18 6C18 3.64076 16.463 2 14.5 2C13.4241 2 12.2593 2.56911 11.4142 3.41421L10 4.82843L8.5858 3.41421C7.74068 2.56911 6.5759 2 5.5 2C3.55906 2 2 3.6565 2 6C2 8.9435 3.66627 11.533 6.64514 13.9029C7.39 14.4955 8.1845 15.0485 9.0661 15.6038C9.3646 15.7919 9.6611 15.9729 10 16.1752C10.3389 15.9729 10.6354 15.7919 10.9339 15.6038Z"
                  fill="white"
                />

                <path
                  className="favorite-added"
                  d="M14.5 0C17.5376 0 20 2.5 20 6C20 13 12.5 17 10 18.5C7.5 17 0 13 0 6C0 2.5 2.5 0 5.5 0C7.35997 0 9 1 10 2C11 1 12.64 0 14.5 0Z"
                  fill=""
                />
              </svg>
            </button>
            <button
              onClick={() => {
                randomFilmRefetch();
                window.scrollBy({
                  top: -800,
                  behavior: "smooth",
                });
              }}
              className="random-film__btn random-film__btn-new"
            >
              <img src="../../src/img/new.png" alt="Картинка" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
