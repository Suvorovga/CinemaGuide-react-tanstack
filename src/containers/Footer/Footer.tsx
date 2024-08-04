import "./Footer.css";

export const Footer = () => {
  return (
    <div className="footer">
      <div className="container footer-container">
        <div className="footer__descr">
          <span className="footer__descr-text1">LLC «Мультимедиа Визион»</span>
          <div className="footer__descr-text2__container">
            <img
              className="footer__descr-img"
              src="../../src/img/c.png"
              alt="картинка"
            />
            <span className="footer__descr-text2">Все права защищены </span>
          </div>
        </div>
        <div className="footer__links">
          <a href="#" className="vk-link">
            <svg
              width="36"
              height="36"
              viewBox="0 0 36 36"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect
                x="0.5"
                y="0.5"
                width="35"
                height="35"
                rx="7.5"
                stroke="white"
                strokeOpacity="0.8"
              />
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M26.4865 14.3797C26.6253 13.9851 26.4865 13.6981 25.8719 13.6981H23.8298C23.3144 13.6981 23.0764 13.9492 22.9377 14.2183C22.9377 14.2183 21.8869 16.5141 20.4198 18.0027C19.9439 18.4332 19.7259 18.5767 19.4682 18.5767C19.3293 18.5767 19.1509 18.4332 19.1509 18.0386V14.3617C19.1509 13.8954 18.9923 13.6802 18.5561 13.6802H15.3444C15.0271 13.6802 14.8289 13.8954 14.8289 14.1106C14.8289 14.5591 15.5624 14.6667 15.6417 15.9222V18.6484C15.6417 19.2403 15.5228 19.3479 15.2651 19.3479C14.5711 19.3479 12.886 17.0342 11.8748 14.3976C11.6765 13.8775 11.4783 13.6802 10.9629 13.6802H8.90093C8.30617 13.6802 8.20703 13.9313 8.20703 14.2003C8.20703 14.6846 8.90093 17.1239 11.4386 20.3524C13.1239 22.5585 15.5228 23.7422 17.6838 23.7422C18.9923 23.7422 19.1509 23.4732 19.1509 23.0248V21.3568C19.1509 20.8187 19.2699 20.729 19.6862 20.729C19.9836 20.729 20.5189 20.8725 21.7283 21.9307C23.1161 23.1862 23.354 23.7602 24.1272 23.7602H26.1693C26.764 23.7602 27.0416 23.4911 26.883 22.971C26.7046 22.4509 26.0305 21.6976 25.1582 20.8007C24.6823 20.2986 23.9686 19.7426 23.7505 19.4735C23.4531 19.1148 23.5324 18.9713 23.7505 18.6484C23.7307 18.6484 26.2287 15.4559 26.4865 14.3797Z"
                fill="white"
                fillOpacity="0.8"
              />
            </svg>
          </a>
          <a href="#" className="youtube-link">
            <svg
              width="36"
              height="36"
              viewBox="0 0 36 36"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect
                x="0.5"
                y="0.5"
                width="35"
                height="35"
                rx="7.5"
                stroke="white"
                strokeOpacity="0.8"
              />
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M24.0013 13.0496C24.6622 13.2309 25.1827 13.7653 25.3593 14.4439C25.6803 15.6738 25.6803 18.24 25.6803 18.24C25.6803 18.24 25.6803 20.8061 25.3593 22.036C25.1827 22.7146 24.6622 23.249 24.0013 23.4305C22.8035 23.76 18.0003 23.76 18.0003 23.76C18.0003 23.76 13.1971 23.76 11.9993 23.4305C11.3383 23.249 10.8179 22.7146 10.6412 22.036C10.3203 20.8061 10.3203 18.24 10.3203 18.24C10.3203 18.24 10.3203 15.6738 10.6412 14.4439C10.8179 13.7653 11.3383 13.2309 11.9993 13.0496C13.1971 12.72 18.0003 12.72 18.0003 12.72C18.0003 12.72 22.8035 12.72 24.0013 13.0496ZM16.5603 16.0802V20.8802L20.4003 18.4803L16.5603 16.0802Z"
                fill="white"
                fillOpacity="0.8"
              />
            </svg>
          </a>
          <a href="#" className="ok-link">
            <svg
              width="36"
              height="36"
              viewBox="0 0 36 36"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect
                x="0.5"
                y="0.5"
                width="35"
                height="35"
                rx="7.5"
                stroke="white"
                strokeOpacity="0.8"
              />
              <path
                d="M19.919 22.2622L22.5725 24.8238C23.116 25.3474 23.116 26.1978 22.5725 26.722C22.0294 27.2462 21.1493 27.2462 20.6069 26.722L17.998 24.2048L15.3914 26.722C15.1196 26.9838 14.7635 27.1149 14.4074 27.1149C14.0518 27.1149 13.6962 26.9838 13.4244 26.722C12.8814 26.1978 12.8814 25.348 13.4238 24.8238L16.0776 22.2622C15.1114 22.0497 14.1796 21.6802 13.3213 21.1604C12.6718 20.7651 12.4767 19.9369 12.8859 19.3094C13.2941 18.681 14.1523 18.4919 14.803 18.8872C16.7461 20.0671 19.2493 20.0674 21.1936 18.8872C21.8443 18.4919 22.7023 18.681 23.1112 19.3094C23.5205 19.9364 23.3248 20.7651 22.6753 21.1604C21.817 21.6807 20.8852 22.0497 19.919 22.2622Z"
                fill="white"
                fillOpacity="0.8"
              />
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M13.2402 13.9419C13.2402 16.4679 15.3691 18.5226 17.9868 18.5226C20.605 18.5226 22.7333 16.4679 22.7333 13.9419C22.7333 11.4151 20.605 9.35986 17.9868 9.35986C15.3691 9.35986 13.2402 11.4151 13.2402 13.9419ZM19.952 13.9414C19.952 12.8953 19.0705 12.0446 17.9867 12.0446C16.9038 12.0446 16.0214 12.8953 16.0214 13.9414C16.0214 14.9868 16.9038 15.838 17.9867 15.838C19.0705 15.838 19.952 14.9868 19.952 13.9414Z"
                fill="white"
                fillOpacity="0.8"
              />
            </svg>
          </a>
          <a href="#" className="tg-link">
            <svg
              width="36"
              height="36"
              viewBox="0 0 36 36"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect
                x="0.5"
                y="0.5"
                width="35"
                height="35"
                rx="7.5"
                stroke="white"
                strokeOpacity="0.8"
              />
              <path
                d="M8.60008 17.8588C10.2834 16.9315 12.1625 16.1576 13.9182 15.3798C16.9388 14.1058 19.9713 12.8538 23.0344 11.6882C23.6304 11.4896 24.7012 11.2954 24.8062 12.1786C24.7487 13.4288 24.5122 14.6716 24.35 15.9145C23.9382 18.6476 23.4623 21.3713 22.9982 24.0955C22.8383 25.0028 21.7016 25.4726 20.9742 24.8919C19.2263 23.7112 17.465 22.5421 15.7394 21.334C15.1741 20.7596 15.6983 19.9348 16.2031 19.5247C17.6427 18.1059 19.1695 16.9005 20.5339 15.4084C20.9019 14.5196 19.8145 15.2687 19.4558 15.4982C17.4849 16.8563 15.5623 18.2974 13.4844 19.4911C12.423 20.0753 11.1859 19.576 10.125 19.25C9.17372 18.8561 7.77979 18.4594 8.59999 17.8588L8.60008 17.8588Z"
                fill="white"
                fillOpacity="0.8"
              />
            </svg>
          </a>
        </div>
      </div>
    </div>
  );
};
