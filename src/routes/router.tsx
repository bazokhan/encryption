import { createBrowserRouter } from "react-router-dom";
import { MainLayout } from "@/layouts/MainLayout";
import { CategoryLayout } from "@/layouts/CategoryLayout";
import { encryptionRoutes } from "@/configs/encryption";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: "/",
        element: <div>Home</div>,
      },
      ...Object.entries(encryptionRoutes).map(([categoryName, category]) => ({
        path: `/${categoryName}`,
        element: (
          <CategoryLayout
            title={category.label}
            links={category.children.map((type) => ({
              to: `/${categoryName}/${type.label}`,
              label: type.label,
              description: type.description,
              icon: type.icon,
            }))}
          />
        ),
        children: category.children.map((type) => ({
          path: `/${categoryName}/${type.label}`,
          element: type.element,
        })),
      })),
    ],
  },
]);
