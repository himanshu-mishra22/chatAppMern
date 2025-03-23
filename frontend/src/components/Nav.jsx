import { useState } from "react";
import { LogOut, Menu, X, User } from "lucide-react";
import { Link } from "react-router";
import { CiSettings } from "react-icons/ci";
import { useAuth } from "../hooks/useAuth";

const Nav = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { logout, authUser } = useAuth();

  return (
    <nav className="navbar text-neutral-content bg-neutral font-bold shadow-lg">
  <div className="flex items-center justify-between px-4 sm:px-6 lg:px-8 w-full h-16">
    
    {/* Logo aligned to the left */}
    <Link to="/" className="text-4xl font-bold">InAir</Link>

    {/* Desktop Menu aligned to the right */}
    <div className="hidden md:flex items-center space-x-6 ml-auto">
      <Link to="/setting" className="text-2xl">
        <CiSettings className="size-8" />
      </Link>

      {authUser && (
        <>
          <Link to="/profile" className="flex items-center">
            <User className="size-8" />
          </Link>

          <button className="flex gap-2 items-center" onClick={logout}>
            <LogOut className="size-8" />
            <span className="hidden sm:inline">Logout</span>
          </button>
        </>
      )}
    </div>

    {/* Mobile Menu Button */}
    <div className="md:hidden">
      <button onClick={() => setIsOpen(!isOpen)}>
        {isOpen ? <X size={28} /> : <Menu size={28} />}
      </button>
    </div>
  </div>

  {/* Mobile Menu */}
  {isOpen && (
    <div className="md:hidden font-bold flex flex-col items-center py-4 space-y-4">
      <Link to="/setting" className="text-2xl">
        <CiSettings />
      </Link>

      {authUser && (
        <>
          <Link to="/profile" className="flex items-center">
            <User className="size-6" />
          </Link>

          <button className="flex gap-2 items-center" onClick={logout}>
            <LogOut className="size-6" />
            <span>Logout</span>
          </button>
        </>
      )}
    </div>
  )}
</nav>

  );
};

export default Nav;
