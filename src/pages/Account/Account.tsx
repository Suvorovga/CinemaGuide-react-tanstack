import { useContext, useEffect, useState } from "react";
import { useQueries } from "@tanstack/react-query";
import { Link, Route, Routes } from "react-router-dom";

import { ProfileDataContext } from "../../App";
import { getMovieId } from "../../api/Movie";
import { queryClient } from "../../api/QueryClient";
import "./Account.css";
import { Favorite } from "./Favorite/Favorite";
import { Me } from "./Me/Me";

export const Account = () => {
  const [favoriteMovies, setFavoriteMovies] = useState([""]);
  const [activeLink, setActiveLink] = useState(
    window.location.href.includes("favorite") ? "favorite" : "me"
  );

  const profileData = useContext(ProfileDataContext);

  useEffect(() => {
    if (profileData && profileData.favorites.length > 0) {
      setFavoriteMovies(profileData.favorites);
    }
  }, [profileData]);

  const movieQueries = useQueries(
    {
      queries: favoriteMovies.map((id) => {
        return {
          queryFn: () => getMovieId(id),
          queryKey: ["favorite-film", id],
        };
      }),
    },
    queryClient
  );

  return (
    <section className="account__section">
      <div className="container account__container">
        <h2 className="account__title">Мой аккаунт</h2>
        <nav className="account__menu">
          <ul className="account__menu-list">
            <li
              onClick={() => setActiveLink("favorite")}
              className={
                activeLink === "favorite"
                  ? "account__menu-item active"
                  : "account__menu-item"
              }
            >
              <Link className="account__menu-link" to={"/account/favorite"}>
                <img
                  className="account__menu-link__img"
                  src="../../src/img/account-favorite.png"
                  alt=""
                />
                <span className="account__menu-link__text">
                  Избранные фильмы
                </span>
                <span className="account__menu-link__text account__menu-link__text-375">
                  Избранное
                </span>
              </Link>
            </li>
            <li
              onClick={() => setActiveLink("me")}
              className={
                activeLink === "me"
                  ? "account__menu-item active"
                  : "account__menu-item"
              }
            >
              <Link className="account__menu-link" to={"/account/me"}>
                <img
                  className="account__menu-link__img"
                  src="../../src/img/account-me.png"
                  alt=""
                />
                <span className="account__menu-link__text">
                  Настройка аккаунта
                </span>
                <span className="account__menu-link__text account__menu-link__text-375">
                  Настройки
                </span>
              </Link>
            </li>
          </ul>
        </nav>
      </div>

      <Routes>
        <Route
          path="/favorite"
          element={
            <Favorite
              favoriteMovies={favoriteMovies}
              movieQueries={movieQueries}
            />
          }
        />
        <Route path="/me" element={<Me profileData={profileData} />} />
      </Routes>
    </section>
  );
};
