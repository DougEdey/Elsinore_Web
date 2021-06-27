import { useState } from "react";

export default function DrawerState() {
  const [drawerOpen, setDrawerOpen] = useState(false);

  return [drawerOpen, setDrawerOpen];
}
