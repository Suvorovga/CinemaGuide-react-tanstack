import { useMutation, useQuery } from "@tanstack/react-query";
import { useContext, useState } from "react";
import { useParams } from "react-router-dom";

import { addFavorite, deleteFavorite, getMovieId } from "../../api/Movie";
import { queryClient } from "../../api/QueryClient";
import { ProfileDataContext } from "../../App";
import { Trailer } from "../../components/Trailer/Trailer";
import "./FilmPage.css";

export const FilmPage = () => {
  const [visibleTrailer, setVisibleTrailer] = useState(false);

  const { id } = useParams();

  const { status: filmStatus, data: filmData } = useQuery(
    {
      queryFn: () => getMovieId(id),
      queryKey: ["film", id],
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

  switch (filmStatus) {
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

  if (filmData) {
    return (
      <>
        <section className="random-film__section">
          <Trailer
            isActive={visibleTrailer}
            onClose={() => {
              setVisibleTrailer(false);
              document.body.style.overflow = "auto";
            }}
            data={filmData}
          />
          <div className="random-film__image-container">
            <img
              className="random-film__image"
              src={
                filmData.backdropUrl
                  ? filmData.backdropUrl
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
                  {filmData.tmdbRating}
                </span>
                <span className="random-film__year">
                  {filmData.releaseYear}
                </span>
                <span className="random-film__genre">
                  {filmData.genres.join(" ")}
                </span>
                <span className="random-film__time">{`${Math.floor(
                  Number(filmData.runtime) / 60
                )} ч ${Number(filmData.runtime) % 60} мин`}</span>
              </div>
              <h1 className="random-film__name">{filmData.originalTitle}</h1>
              <div className="random-film__plot">{filmData.plot}</div>
              <div className="random-film__btns film-page__btns">
                <button
                  onClick={onClickTrailer}
                  className="random-film__btn random-film__btn-trailer film-page__btn-trailer"
                >
                  Трейлер
                </button>
                <button
                  className={`random-film__btn random-film__btn-favor ${
                    profileData?.favorites.includes(filmData.id.toString())
                      ? "active"
                      : ""
                  }`}
                  onClick={(e) => {
                    if (e.currentTarget.className.includes("active")) {
                      deleteFavoriteMutation.mutate(filmData.id.toString());
                    } else {
                      addFavoriteMutation.mutate(filmData.id.toString());
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
              </div>
            </div>
          </div>
        </section>
        <section className="film-info__section">
          <div className="container film-info__container">
            <h3 className="film-info__main-title">О фильме</h3>
            <ul className="film-info__list">
              {filmData.language && (
                <li className="film-info__item">{`Язык оригинала ....................................... ${filmData.language}`}</li>
              )}
              {filmData.budget && (
                <li className="film-info__item">{`Бюджет ...................................................... 1${filmData.budget}`}</li>
              )}
              {filmData.cast[0] && (
                <li className="film-info__item">{`Выручка ..................................................... 1${filmData.cast.join(
                  " "
                )}`}</li>
              )}
              {filmData.director && (
                <li className="film-info__item">{`Режиссер ................................................... ${filmData.director}`}</li>
              )}
              {filmData.production && (
                <li className="film-info__item">{`Продакшен ................................................ ${filmData.production}`}</li>
              )}
              {filmData.awardsSummary && (
                <li className="film-info__item">{`Награды ..................................................... ${filmData.awardsSummary}`}</li>
              )}
            </ul>
          </div>
        </section>
      </>
    );
  }
  return <></>
};
