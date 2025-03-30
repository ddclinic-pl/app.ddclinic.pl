import { NavLink } from "@mantine/core";
import { Link } from "@tanstack/react-router";

export function AppNavigation({
  toggleMobile,
  toggleDesktop,
}: {
  toggleMobile: () => void;
  toggleDesktop: () => void;
}) {
  const handleClick = () => {
    toggleMobile();
    toggleDesktop();
  };

  return (
    <nav>
      <NavLink
        component={Link}
        to="/"
        label="Moje wizyty"
        onClick={handleClick}
      />
      <NavLink
        component={Link}
        to="/about"
        label="O aplikacji"
        onClick={handleClick}
      />
    </nav>
  );
}
