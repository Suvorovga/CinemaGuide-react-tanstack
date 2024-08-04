import { Link } from "react-router-dom";
import { FC, useEffect, useRef, useState } from "react";
import { useQuery } from "@tanstack/react-query";

import Logo from "../../img/CinemaGuide.svg";
import { Profile } from "../../api/User";
import "../Header/Header.css";
import { AuthForm } from "../../components/AuthForm/AuthForm";
import { getMoviesTimeout } from "../../api/Movie";
import { queryClient } from "../../api/QueryClient";

export interface HeaderProps {
  profileStatus: "pending" | "error" | "success";
  profileData?: Profile;
}

export const Header: FC<HeaderProps> = ({ profileStatus, profileData }) => {
  const [visibleAuthForm, setVisibleAuthForm] = useState(false);
  const [seacrhFilmTimeout, setSeacrhFilmTimeout] = useState(0);
  const [searchValue, setSearchValue] = useState("");
  const [visibleInputForm, setVisibleInputForm] = useState(false);

  const inputRef = useRef<HTMLInputElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const listResultRef = useRef(null);
  const listErrorRef = useRef(null);

  const handleVisible = () => {
    setVisibleInputForm(visibleInputForm === false ? true : false);
  };

  useEffect(() => {
    if (visibleInputForm) {
      document.addEventListener("click",() => setVisibleInputForm(false));
    }
  }, [visibleInputForm]);

  const handleClick = () => {
    setVisibleAuthForm(true);
    document.body.style.overflow = "hidden";
  };

  const moviesTimeoutQuery = useQuery(
    {
      queryFn: () => getMoviesTimeout(seacrhFilmTimeout, searchValue),
      queryKey: ["movies-timeout", searchValue],
    },
    queryClient
  );

  useEffect(() => {
    document.body.onclick = () => {
      if (listResultRef.current || listErrorRef.current) {
        setSearchValue("");
        (inputRef.current as HTMLInputElement).value = "";
      }
    };
  }, [moviesTimeoutQuery.data]);

  return (
    <header onClick={e => e.stopPropagation()} className="header">
      <AuthForm
        isActive={visibleAuthForm}
        onClose={() => {
          setVisibleAuthForm(false);
          document.body.style.overflow = "auto";
        }}
      />
      <div className="container header-container">
        <Link className="logo" to={"/"}>
          <img className="logo__image" src={Logo} alt="Логотип" />
        </Link>

        <div className="menu-container__375">
          <Link to={"/movie/genres"}>
            <img
              className="menu-link__genre-375"
              src="../../src/img/genre-375.png"
              alt=""
            />
          </Link>
          <button onClick={handleVisible} className="search-button-375">
            <img
              className="search-button-375__image"
              src="../../src/img/search-375.png"
              alt=""
            />
          </button>
          {profileStatus === "success" ? (
            <Link to={"/account/favorite"}>
              <img
                className="menu-link__account-375"
                src="../../src/img/account-375.png"
                alt=""
              />
            </Link>
          ) : (
            <button onClick={handleClick} className="login-btn-375">
              <img
                className="menu-link__account-375"
                src="../../src/img/account-375.png"
                alt=""
              />
            </button>
          )}
        </div>

        <nav className="menu-container">
          <ul className="menu">
            <li className="menu-link__main">
              <Link to={"/"}>Главная</Link>
            </li>
            <li className="menu-link__genre">
              <Link to={"/movie/genres"}>Жанры</Link>
            </li>
          </ul>
        </nav>
        <form
          ref={formRef}
          onClick={(e) => e.stopPropagation()}
          onChange={(e) => {
            clearTimeout(seacrhFilmTimeout);

            setSeacrhFilmTimeout(
              setTimeout(() => {
                setSearchValue((e.target as HTMLInputElement).value.trim());
              }, 1500)
            );
          }}
          className={`search-container ${visibleInputForm ? "visible" : ""}`}
        >
          <input
            ref={inputRef}
            placeholder="Поиск"
            className="searсh"
            type="search"
          />
          {moviesTimeoutQuery.data && moviesTimeoutQuery.data?.length > 0 && (
            <ul ref={listResultRef} className="search-result__list">
              {moviesTimeoutQuery.data.slice(0, 5).map((item) => (
                <li key={item.id} className="search-result__item">
                  <Link
                    onClick={() => {
                      setSearchValue("");
                      (inputRef.current as HTMLInputElement).value = "";
                    }}
                    className="search-result__item-container"
                    to={`/movie/${item.id}`}
                  >
                    <img
                      src={
                        item.posterUrl
                          ? item.posterUrl
                          : "../../src/img/baner-movie-main.jpg"
                      }
                      className="search-result__image"
                      alt=""
                    />
                    <div className="search-result__info-container">
                      <div className="search-result__info">
                        <span className="search-result__raiting">
                          <img src="../../src/img/star.png" alt="" />{" "}
                          {item.tmdbRating}
                        </span>
                        <span className="search-result__year">
                          {item.releaseYear}
                        </span>
                        <span className="search-result__genre">
                          {item.genres.join(" ")}
                        </span>
                        <span className="search-result__time">{`${Math.floor(
                          Number(item.runtime) / 60
                        )} ч ${Number(item.runtime) % 60} мин`}</span>
                      </div>
                      <p className="search-result__title">{item.title}</p>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          )}
          {moviesTimeoutQuery.data &&
            moviesTimeoutQuery.data?.length === 0 &&
            searchValue !== "" && (
              <ul ref={listErrorRef} className="search-result__list">
                <li className="search-result__list-error">
                  Фильм не найден...
                </li>
              </ul>
            )}
        </form>

        {profileStatus === "success" ? (
          <Link
            to={"/account/favorite"}
            className="login-btn login-btn__account"
          >
            {profileData?.name}
          </Link>
        ) : (
          <button onClick={handleClick} className="login-btn">
            Войти
          </button>
        )}
      </div>
    </header>
  );
};
