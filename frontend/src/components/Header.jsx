import menu from "../assets/menu.png";
import packText from "../assets/pack_text.png";
import {Link} from "react-router-dom";
import { useState } from "react";
import SlideMenu from "../components/SlideMenu";

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
    <header>
      <div className="fixed top-0 left-0 w-full h-17 bg-white border-2 flex justify-between items-center px-10 py-4 z-50">
        <Link to = "/home">
        <img 
        src={packText} 
        className="h-auto max-h-10 w-auto max-w-[60%]"
        />
        </Link>

      <button className="flex items-center"
        onClick={() => setMenuOpen(true)}>
        <img src={menu} className="w-15 h-15" />
      </button>
      <SlideMenu isOpen={menuOpen} onClose={() => setMenuOpen(false)} />
      </div>
    </header>
</>
  );
}  

export default Header;