import { Box, Collapse, NavLink, ScrollArea } from "@mantine/core";
import { Link } from "@tanstack/react-router";
import {
  IconAlertCircle,
  IconCalendar,
  IconCalendarSmile,
  IconChevronRight,
  IconFriends,
  IconGauge,
  IconInfoCircle,
  IconUsers,
} from "@tabler/icons-react";
import { useDisclosure } from "@mantine/hooks";
import { Children, ReactElement } from "react";

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
      <ScrollArea>
        <NavLink
          component={Link}
          to="/"
          label="Moje wizyty"
          onClick={handleClick}
          leftSection={<IconCalendar size={16} stroke={1.5} />}
        />

        <NavLink
          component={Link}
          to="/patients"
          label="Pacjenci"
          onClick={handleClick}
          leftSection={<IconFriends size={16} stroke={1.5} />}
        />
        <NavLink
          component={Link}
          to="/incidents"
          label="Awarie"
          onClick={handleClick}
          leftSection={<IconAlertCircle size={16} stroke={1.5} />}
        />
        <NavLink
          component={Link}
          to="/vacation"
          label="Wniosek urlopowy"
          onClick={handleClick}
          leftSection={<IconCalendarSmile size={16} stroke={1.5} />}
        />
        <CollapsableLink label="Administracja">
          <NavLink
            component={Link}
            to="/users"
            label="Użytkownicy"
            onClick={handleClick}
            leftSection={<IconUsers size={16} stroke={1.5} />}
          />
        </CollapsableLink>
        <NavLink
          component={Link}
          to="/about"
          label="O aplikacji"
          onClick={handleClick}
          leftSection={<IconInfoCircle size={16} stroke={1.5} />}
        />
      </ScrollArea>
    </nav>
  );
}

function CollapsableLink({
  children,
  label,
}: {
  children: ReactElement | ReactElement[];
  label: string;
}) {
  const [opened, handlers] = useDisclosure(false);
  return (
    <Box flex="1">
      <NavLink
        component={Link}
        to={label}
        label={label}
        onClick={() => handlers.toggle()}
        leftSection={<IconGauge size={16} stroke={1.5} />}
        rightSection={
          <IconChevronRight
            size={12}
            stroke={1.5}
            style={{ transform: opened ? "rotate(-90deg)" : "none" }}
          />
        }
      />
      <Collapse in={opened}>
        {Children.map(children, (child) => (
          <Box
            ml="sm"
            pl="sm"
            style={{ borderLeft: "1px solid var(--mantine-color-gray-3)" }}
          >
            {child}
          </Box>
        ))}
      </Collapse>
    </Box>
  );
}
