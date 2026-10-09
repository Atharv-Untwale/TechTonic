import { useEffect } from "react";
import { useHash } from "@/hooks/useHash.js";
import Navbar from "@/components/layout/Navbar.jsx";
import Footer from "@/components/layout/Footer.jsx";
import ProgressBar from "@/components/layout/ProgressBar.jsx";
import AmbientCanvas from "@/components/effects/AmbientCanvas.jsx";
import CursorFollower from "@/components/effects/CursorFollower.jsx";
import HomePage from "@/pages/HomePage.jsx";
import PanelPage from "@/pages/PanelPage.jsx";

export default function App() {
  const hash = useHash();
  const isPanelPage = hash.startsWith("#/panel");

  useEffect(() => {
    if (isPanelPage) {
      window.scrollTo(0, 0);
      return;
    }
    const sectionId = hash.slice(1);
    requestAnimationFrame(() => {
      if (sectionId && sectionId !== "top") {
        document.getElementById(sectionId)?.scrollIntoView();
      } else if (sectionId === "top") {
        window.scrollTo(0, 0);
      }
    });
  }, [hash, isPanelPage]);

  return (
    <>
      <CursorFollower />
      <AmbientCanvas />
      <ProgressBar />
      <Navbar />
      <main id="top">{isPanelPage ? <PanelPage /> : <HomePage />}</main>
      <Footer />
    </>
  );
}