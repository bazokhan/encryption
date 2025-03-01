import { RouterProvider } from "react-router-dom";
import { router } from "./routes/router";
import { useTranslation } from "react-i18next";
import { useEffect } from "react";

function App() {
  const { t } = useTranslation();

  useEffect(() => {
    // Set initial document direction based on language
    document.documentElement.dir = t('direction');
  }, [t]);

  return <RouterProvider router={router} />;
}

export default App;
