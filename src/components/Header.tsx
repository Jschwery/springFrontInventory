import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../images/logo.png";

interface HeaderProps {
  linkTitles: string[];
  button?: boolean;
}

function Header({ linkTitles, button }: HeaderProps) {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [visibleItems, setVisibleItems] = useState<string[]>(linkTitles);
  const [dropdownItems, setDropdownItems] = useState<string[]>([]);
  const [isDropdownHovered, setIsDropdownHovered] = useState(false);
  const hoverRef = useRef<NodeJS.Timeout | null>(null);

  const handleResize = () => setWindowWidth(window.innerWidth);

  useEffect(() => {
    window.addEventListener("resize", handleResize);

    const numLinks = linkTitles.length;
    const linkThresholds = Array.from(
      { length: numLinks },
      (_, i) => 800 - i * 100
    );
    const currentNumVisibleItems = visibleItems.length;

    linkThresholds.forEach((threshold, index) => {
      const currentIndex = numLinks - index - 1;
      const currentItem = linkTitles[currentIndex];

      if (windowWidth < threshold && currentNumVisibleItems > currentIndex) {
        setVisibleItems((prevState) =>
          prevState.filter((item) => item !== currentItem)
        );
        setDropdownItems((prevState) => [currentItem, ...prevState]);
      } else if (
        windowWidth >= threshold &&
        currentNumVisibleItems <= currentIndex
      ) {
        setVisibleItems(
          linkTitles.filter(
            (item) => visibleItems.includes(item) || item === currentItem
          )
        );
        setDropdownItems((prevState) =>
          prevState.filter((item) => item !== currentItem)
        );
      }
    });

    return () => window.removeEventListener("resize", handleResize);
  }, [windowWidth]);

  const handleMouseEnter = () => {
    if (hoverRef.current !== null) {
      clearTimeout(hoverRef.current);
      setIsDropdownHovered(true);
    }
  };

  const handleMouseLeave = () => {
    hoverRef.current = setTimeout(() => {
      setIsDropdownHovered(false);
    }, 150);
  };

  const navigate = useNavigate();

  const handleRoutes = (passedLink: string) => {
    if (passedLink) {
      navigate(passedLink);
    } else {
      throw new Error("Invalid link provided");
    }
  };

  return (
    <div className="bg-slate-700 w-full h-16 flex items-center justify-between">
      <div
        className=" w-12 h-12 ml-4 rounded-md my-2 cursor-pointer"
        style={{
          backgroundImage: `url(${logo})`,
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          backgroundSize: "contain",
        }}
      />
      <div className="headerFonts flex space-x-5">
        {visibleItems.map((item, index) => (
          <a
            onClick={() => {
              handleRoutes(`/${item.split(" ").join("_")}`);
            }}
          >
            <h2 key={index}>{item}</h2>
          </a>
        ))}
        {dropdownItems.length > 0 && (
          <div
            className="relative inline-block text-left"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <div
              className="inline-flex justify-center w-full rounded-md  focus:outline-none"
              id="options-menu"
              aria-haspopup="true"
              aria-expanded="true"
            >
              <h2 className="cursor-pointer font-bold text-white font-Inter">
                More
              </h2>
              <svg
                className="text-white -mr-1 ml-0.5 mt-0.5 h-5 w-5 cursor-pointer"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true"
                style={{
                  transform: isDropdownHovered ? "rotate(180deg)" : "rotate(0)",
                  transition: "transform 0.3s",
                }}
              >
                <path
                  fill-rule="evenodd"
                  d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                  clip-rule="evenodd"
                />
              </svg>
            </div>

            {isDropdownHovered && (
              <div className="origin-top-right absolute right-0 mt-2 w-56 hover:!bg-white rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
                <div
                  className="py-1"
                  role="menu"
                  aria-orientation="vertical"
                  aria-labelledby="options-menu"
                >
                  {dropdownItems.map((item, index) => (
                    <a
                      href="#"
                      className="block px-4 py-2 text-sm text-gray-700 bg-white hover:bg-gray-100 hover:noHoverEffects"
                      role="menuitem"
                      key={index}
                    >
                      {item}
                    </a>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
      {button && (
        <div className="flex ">
          <a onClick={() => handleRoutes("/login")}>
            <h2 className=" font-Inter font-bold hover:opacity-50 cursor-pointer text-white mr-5">
              Login
            </h2>
          </a>
          <a onClick={() => handleRoutes("/demo")}>
            <div className="bg-orange-500 cursor-pointer font-Inter text-white px-2 mr-2 flex items-center rounded-xl">
              <p>Try Demo</p>
            </div>
          </a>
        </div>
      )}
    </div>
  );
}

export default Header;
