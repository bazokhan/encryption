import { createBrowserRouter } from "react-router-dom";
import { MainLayout } from "@/layouts/MainLayout";
import { CategoryLayout } from "@/layouts/CategoryLayout";
import { encryptionRoutes } from "@/configs/encryption";
import { HomePage } from "@/routes/HomePage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
      ...Object.entries(encryptionRoutes).map(([categoryName, category]) => ({
        path: `/${categoryName}`,
        element: (
          <CategoryLayout
            title={category.label}
            description={category.description}
            links={category.children.map((type) => ({
              to: `/${categoryName}/${type.label.toLowerCase()}`,
              label: type.label,
              description: type.description,
              icon: type.icon,
            }))}
          />
        ),
        children: category.children.map((type) => ({
          path: `/${categoryName}/${type.label.toLowerCase()}`,
          element: type.element,
        })),
      })),
    ],
  },
]);
