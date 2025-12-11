import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { Menu, X, ChevronDown } from "lucide-react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isAboutOpen, setIsAboutOpen] = useState(false);

  const navItems = [
    { name: "Home", path: "/" },
    { name: "Activities", path: "/activities" },
    { name: "Gallery", path: "/gallery" },
    { name: "News & Events", path: "/news-events" },
    { name: "Reports", path: "/reports" },
    { name: "Career", path: "/career" },
    { name: "Tenders", path: "/tenders" },
    { name: "Contact", path: "/contact" },
  ];

  const aboutItems = [
    { name: "About Us", path: "/about/about-us" },
    { name: "Messages", path: "/about/messages" },
    { name: "Governance", path: "/about/governance" },
    { name: "Geographic Focus", path: "/about/geographic-focus" },
  ];

  return (
    <nav className="bg-white shadow-md fixed top-0 left-0 w-full z-50">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        
        {/* LOGO */}
        <Link to="/" className="flex items-center gap-2">
          <img src="/images/logo.png" alt="Logo" className="w-10 h-10" />
          <span className="font-bold text-xl text-gray-800">Manav Seva India</span>
        </Link>

        {/* Desktop Menu */}
        <ul className="hidden md:flex gap-6">
          {/* Home */}
          <li>
            <NavLink
              to="/"
              className={({ isActive }) =>
                `text-gray-700 hover:text-blue-600 transition ${
                  isActive ? "font-semibold text-blue-600" : ""
                }`
              }
            >
              Home
            </NavLink>
          </li>
          {/* About Dropdown */}
          <li className="relative">
            <button
              onMouseEnter={() => setIsAboutOpen(true)}
              onMouseLeave={() => setIsAboutOpen(false)}
              className="text-gray-700 hover:text-blue-600 transition flex items-center gap-1"
            >
              About <ChevronDown size={16} />
            </button>
            {isAboutOpen && (
              <ul
                className="absolute top-full left-0 bg-white shadow-lg rounded-md py-2 min-w-[200px] z-50"
                onMouseEnter={() => setIsAboutOpen(true)}
                onMouseLeave={() => setIsAboutOpen(false)}
              >
                {aboutItems.map((item) => (
                  <li key={item.path}>
                    <NavLink
                      to={item.path}
                      className={({ isActive }) =>
                        `block px-4 py-2 text-gray-700 hover:bg-gray-100 transition ${
                          isActive ? "font-semibold text-blue-600" : ""
                        }`
                      }
                    >
                      {item.name}
                    </NavLink>
                  </li>
                ))}
              </ul>
            )}
          </li>
          {/* Rest of navItems */}
          {navItems.slice(1).map((item) => (
            <li key={item.path}>
              <NavLink
                to={item.path}
                className={({ isActive }) =>
                  `text-gray-700 hover:text-blue-600 transition ${
                    isActive ? "font-semibold text-blue-600" : ""
                  }`
                }
              >
                {item.name}
              </NavLink>
            </li>
          ))}
        </ul>

        {/* Mobile Toggle */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden text-gray-700"
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white shadow-inner px-4 py-4">
          <ul className="flex flex-col gap-4">
            {navItems.map((item) => (
              <li key={item.path}>
                <NavLink
                  to={item.path}
                  className={({ isActive }) =>
                    `block text-gray-700 hover:text-blue-600 transition ${
                      isActive ? "font-semibold text-blue-600" : ""
                    }`
                  }
                  onClick={() => setIsOpen(false)}
                >
                  {item.name}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navbar;

