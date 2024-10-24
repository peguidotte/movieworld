import "../index.css";
import { NavLink } from "react-router-dom";
import BotaoLogin from "./BotaoLogin";
import { useState } from "react";
import TvIcon from "@mui/icons-material/Tv";
import PublicIcon from "@mui/icons-material/Public";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import HomeIcon from "@mui/icons-material/Home";
import SearchIcon from '@mui/icons-material/Search';
import SavedSearchIcon from '@mui/icons-material/SavedSearch';
import TheaterComedyOutlinedIcon from '@mui/icons-material/TheaterComedyOutlined';
import TheaterComedyIcon from '@mui/icons-material/TheaterComedy';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import EmailIcon from '@mui/icons-material/Email';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import SettingsIcon from '@mui/icons-material/Settings';

export default function Header() {
  const [isLogged, setIsLogged] = useState(false);

  const handleLogin = () => {
    setIsLogged(!isLogged);
  };

const itensNav = [
    { name: "Home", to: "/", activeIcon: <HomeIcon />, inactiveIcon: <HomeOutlinedIcon /> },
    { name: "Pesquisar", to: "/movies", activeIcon: <SearchIcon/>, inactiveIcon: <SavedSearchIcon/> },
    { name: "Gêneros", to: "/genre", activeIcon: <TheaterComedyIcon/>, inactiveIcon: <TheaterComedyOutlinedIcon/> },
    { name: "Contato", to: "/contato", activeIcon: <EmailIcon/>, inactiveIcon: <EmailOutlinedIcon/> },
    { name: "Configurações", to: "/settings", activeIcon: <SettingsIcon/>, inactiveIcon: <SettingsOutlinedIcon/>, requiresAuth: true }
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
        <nav className="flex gap-10 items-center">
          <ul className="flex gap-8">
            <NavLink to="/" className={"text-xl font-medium relative"} exact>
              {({ isActive }) => (
                <>
                  <p className="absolute -left-4 opacity-50 z-0">{isActive ? <HomeIcon /> : <HomeOutlinedIcon />}</p>
                  <p>Home</p>
                </>
              )}
            </NavLink>
            <li>
              <NavLink to="/movies">Pesquisar</NavLink>
            </li>
            <li>
              <NavLink to="/genre">Gêneros</NavLink>
            </li>
            <li>
              <NavLink to="/contato">Contato</NavLink>
            </li>
            {isLogged && (
              <li>
                <NavLink to="/settings">Configurações</NavLink>
              </li>
            )}
          </ul>
          <BotaoLogin isLogged={isLogged} handleLogin={handleLogin} />
        </nav>
      </header>
    </>
  );
}
