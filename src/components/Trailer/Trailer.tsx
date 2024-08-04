import { FC } from "react";

import { Movie } from "../../api/Movie";
import './Trailer.css'

export interface TrailerProps {
  isActive: boolean;
  onClose(): void;
  data: Movie;
}

export const Trailer: FC<TrailerProps> = ({ isActive, onClose, data }) => {
  if (isActive) {
    return (
      <div onClick={onClose} className="video__background">
        <div className="video__background-color"></div>
        <div onClick={(e) => e.stopPropagation()} className="video__container">
          {data.trailerUrl && <iframe className="video__trailer" src={`https://www.youtube.com/embed/${data.trailerYouTubeId}?autoplay=1&controls=0&modestbranding=1&showinfo=0`} allow='autoplay'></iframe>}
          <button onClick={onClose} className="auth-form-close">
            <img src="../../src/img/close-icon.png" alt="" />
          </button>
        </div>
      </div>
    );
  }
};
