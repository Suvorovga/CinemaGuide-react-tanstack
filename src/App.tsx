import { useQuery } from "@tanstack/react-query";
import { Route, Routes } from "react-router-dom";
import { createContext } from "react";

import { Header } from "./containers/Header/Header";
import { Profile, fetchProfile } from "./api/User";
import { queryClient } from "./api/QueryClient";
import { Footer } from "./containers/Footer/Footer";
import { MainPage } from "./pages/MainPage/MainPage";
import { FilmPage } from "./pages/FilmPage/FilmPage";
import { Account } from "./pages/Account/Account";
import { Genres } from "./pages/Genres/Genres";
import { Genre } from "./pages/Genre/Genre";

export const ProfileDataContext = createContext<Profile | undefined>(undefined);

export function App() {
  const { status: profileStatus, data: profileData } = useQuery(
    {
      queryFn: () => fetchProfile(),
      retry: 0,
      queryKey: ["user", "me"],
    },
    queryClient
  );

  return (
    <ProfileDataContext.Provider
      value={
        profileStatus === "success"
          ? profileData
          : undefined
      }
    >
      <Header profileStatus={profileStatus} profileData={profileData} />

      <main className="main">
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/movie/:id" element={<FilmPage />} />
          <Route path="/account/*" element={<Account />} />
          <Route path="/movie/genres" element={<Genres />} />
          <Route path='/movie/genres/:genre' element={<Genre />}/>
        </Routes>
      </main>

      <Footer />
    </ProfileDataContext.Provider>
  );
}
