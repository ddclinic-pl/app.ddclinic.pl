import { Box, Collapse, NavLink, ScrollArea } from "@mantine/core";
import { Link } from "@tanstack/react-router";
import {
  IconAddressBook,
  IconAlertCircle,
  IconBox,
  IconCalendar,
  IconCalendarSmile,
  IconChevronRight,
  IconClockCheck,
  IconExclamationCircle,
  IconFriends,
  IconGauge,
  IconInfoCircle,
  IconUsers,
} from "@tabler/icons-react";
import { useDisclosure } from "@mantine/hooks";
import { Children, ReactElement } from "react";

export function AppNavigation({ handleClick }: { handleClick: () => void }) {
  return (
    <nav>
      <ScrollArea>
        <NavLink
          component={Link}
          to="/appointments"
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
        <CollapsableLink
          label="Kadry"
          icon={<IconAddressBook size={16} stroke={1.5} />}
        >
          <NavLink
            component={Link}
            to="/vacation/form"
            label="Wniosek urlopowy"
            onClick={handleClick}
            leftSection={<IconCalendarSmile size={16} stroke={1.5} />}
          />
          <NavLink
            component={Link}
            to="/vacation/my"
            label="Moje urlopy"
            onClick={handleClick}
            leftSection={<IconCalendarSmile size={16} stroke={1.5} />}
          />
        </CollapsableLink>
        <NavLink
          component={Link}
          to="/attendance"
          label="Moje godziny pracy"
          onClick={handleClick}
          leftSection={<IconCalendarSmile size={16} stroke={1.5} />}
        />
        <CollapsableLink
          label="Magazyn"
          icon={<IconBox size={16} stroke={1.5} />}
        >
          <NavLink
            component={Link}
            to="/warehouse/new-order"
            label="Nowe zamówienie"
            onClick={handleClick}
            leftSection={<IconExclamationCircle size={16} stroke={1.5} />}
          />
          <NavLink
            component={Link}
            to="/warehouse/orders"
            label="Moje zamówienia"
            onClick={handleClick}
            leftSection={<IconExclamationCircle size={16} stroke={1.5} />}
          />
          <NavLink
            component={Link}
            to="/warehouse/summary"
            label="Przegląd magazynu"
            onClick={handleClick}
            leftSection={<IconExclamationCircle size={16} stroke={1.5} />}
          />
        </CollapsableLink>
        <CollapsableLink
          label="Menadżer"
          icon={<IconGauge size={16} stroke={1.5} />}
        >
          <NavLink
            component={Link}
            to="/vacation/employees"
            label="Urlopy pracowników"
            onClick={handleClick}
            leftSection={<IconClockCheck size={16} stroke={1.5} />}
          />
        </CollapsableLink>
        <CollapsableLink
          label="Administracja"
          icon={<IconGauge size={16} stroke={1.5} />}
        >
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
  icon,
}: {
  icon: ReactElement;
  children: ReactElement | ReactElement[];
  label: string;
}) {
  const [opened, handlers] = useDisclosure(false);
  return (
    <Box flex="1">
      <NavLink
        label={label}
        onClick={() => handlers.toggle()}
        leftSection={icon}
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
