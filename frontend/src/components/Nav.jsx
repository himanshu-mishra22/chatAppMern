import { useState } from "react";
import { LogOut, Menu, X, User } from "lucide-react";
import { Link } from "react-router";
import { CiSettings } from "react-icons/ci";
import { useAuth } from "../hooks/useAuth";

const Nav = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { logout, authUser } = useAuth();

  return (
    <nav className="bg-blue-300 text-black font-bold shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo */}
          <Link to="/" className="text-2xl font-bold">InAir</Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-6 items-center">
            <Link to="/setting" className="hover:text-gray-500 text-2xl">
              <CiSettings />
            </Link>

            {authUser && (
              <>
                <Link to="/profile" className="hover:text-gray-500 flex items-center">
                  <User className="size-5" />
                </Link>

                <button
                  className="hover:text-gray-500 flex gap-2 items-center"
                  onClick={logout}
                >
                  <LogOut className="size-5" />
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
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-blue-300 text-black font-bold flex flex-col items-center py-4 space-y-4">
          <Link to="/setting" className="hover:text-gray-500 text-2xl">
            <CiSettings />
          </Link>

          {authUser && (
            <>
              <Link to="/profile" className="hover:text-gray-500 flex items-center">
                <User className="size-5" />
              </Link>

              <button
                className="hover:text-gray-500 flex gap-2 items-center"
                onClick={logout}
              >
                <LogOut className="size-5" />
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
