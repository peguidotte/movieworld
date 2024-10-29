import "../index.css";
import { NavLink } from "react-router-dom";
import BotaoLogin from "./BotaoLogin";
import { useState } from "react";
import TvIcon from "@mui/icons-material/Tv";
import PublicIcon from "@mui/icons-material/Public";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import HomeIcon from "@mui/icons-material/Home";
import SearchIcon from "@mui/icons-material/Search";
import SavedSearchIcon from "@mui/icons-material/SavedSearch";
import TheaterComedyOutlinedIcon from "@mui/icons-material/TheaterComedyOutlined";
import TheaterComedyIcon from "@mui/icons-material/TheaterComedy";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import EmailIcon from "@mui/icons-material/Email";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import SettingsIcon from "@mui/icons-material/Settings";

export default function Header() {
  const [isLogged, setIsLogged] = useState(false);

  const handleLogin = () => {
    setIsLogged(!isLogged);
  };

  const itensNav = [
    {
      name: "Home",
      to: "/",
      activeIcon: <HomeIcon fontSize="large"/>,
      inactiveIcon: <HomeOutlinedIcon fontSize="large"/>,
    },
    {
      name: "Pesquisar",
      to: "/movies",
      activeIcon: <SavedSearchIcon fontSize="large"/>,
      inactiveIcon: <SearchIcon fontSize="large"/>,
    },
    {
      name: "Gêneros",
      to: "/genre",
      activeIcon: <TheaterComedyIcon fontSize="large"/>,
      inactiveIcon: <TheaterComedyOutlinedIcon fontSize="large" />,
    },
    {
      name: "Contato",
      to: "/contato",
      activeIcon: <EmailIcon fontSize="large"/>,
      inactiveIcon: <EmailOutlinedIcon fontSize="large" />,
    },
    {
      name: "Configurações",
      to: "/settings",
      activeIcon: <SettingsIcon fontSize="large" />,
      inactiveIcon: <SettingsOutlinedIcon fontSize="large"/>,
      requiresAuth: true,
    },
  ];

  return (
    <>
      <header className="w-full h-10 flex justify-between items-center p-10 mb-10 bg-purple-900">
        <div className="flex items-center gap-2 relative">
          <TvIcon
            sx={{ fontSize: 60 }}
            className="absolute -right-12 opacity-50 z-0"
          />
          <h1 className="text-4xl movieworld">MovieWorld</h1>
          <PublicIcon
            fontSize="large"
            className="absolute -right-9 -top-[0.5px] opacity-50 z-0"
          />
        </div>
        <nav className="flex gap-12 items-center">
          <ul className="flex gap-10">
            {itensNav.map((item, index) => {
              if (item.requiresAuth && !isLogged) return null;
              return (
                <li key={index} >
                  <NavLink
                    to={item.to}
                    className={"text-xl font-medium flex items-center gap-2"}
                    exact
                  >
                    {({ isActive }) => (
                      <>
                        <p className="opacity-50 z-0">
                          {isActive ? item.activeIcon : item.inactiveIcon}
                        </p>
                        <p>{item.name}</p>
                      </>
                    )}
                  </NavLink>
                </li>
              );
            })}
          </ul>
          <BotaoLogin isLogged={isLogged} handleLogin={handleLogin} />
        </nav>
      </header>
    </>
  );
}
