import { FC } from "react";
import { useMutation} from "@tanstack/react-query";
import { Link } from "react-router-dom";

import { Profile, logOutUser } from "../../../api/User";
import "./Me.css";
import { queryClient } from "../../../api/QueryClient";

export interface MeProps {
  profileData: Profile | undefined;
}

export const Me: FC<MeProps> = ({ profileData }) => {
  const logOutQuery = useMutation({
    mutationFn: () => logOutUser(),
    onSuccess() {
      queryClient.invalidateQueries({queryKey: ['user', 'me']})
    }
  }, queryClient)

  if (profileData) {
    return (
      <div className="container account-info__container">
        <ul className="account-info__list">
          <li className="account-info__item">
            <div className="account-info__avatar">
              <span>
                {profileData.name[0].toUpperCase()}
                {profileData.surname[0].toUpperCase()}
              </span>
            </div>
            <div className="account-info__descr">
              <span className="account-info__descr-title">Имя Фамилия</span>
              <span className="account-info__descr-info">{`${profileData.name} ${profileData.surname}`}</span>
            </div>
          </li>
          <li className="account-info__item">
            <div className="account-info__avatar">
              <img src="../src/img/account-mail.png" alt="" />
            </div>
            <div className="account-info__descr">
              <span className="account-info__descr-title">
                Электронная почта
              </span>
              <span className="account-info__descr-info">
                {profileData.email}
              </span>
            </div>
          </li>
        </ul>
        <Link to={"/"} onClick={() => {logOutQuery.mutate()}} className="logout-btn">
          Выйти из аккаунта
        </Link>
      </div>
    );
  }

  return (
    <div className="container">
      <p style={{ color: "white" }}>Сейчас что-то появится...</p>
    </div>
  );
};
