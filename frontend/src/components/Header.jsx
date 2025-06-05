import bell from "../assets/bell.png";
import packText from "../assets/pack_text.png";

function Header() {
  return (
    <header>
      <div className="fixed top-0 left-0 w-full h-17 bg-white border-2 flex justify-between items-center px-10 py-4 z-50">
      <img src={packText} className="h-15" />
      <button className="flex items-center">
          <img src={bell} className="w-15 h-15" />
      </button>

      </div>
    </header>
  );
}  

export default Header;