"use client";

import { Fragment, useState, useEffect } from "react";

import { SettingsModal } from "../modals/SettingsModal";

export const ModalProvider = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  return (
    <Fragment>
      <SettingsModal />
    </Fragment>
  );
};
