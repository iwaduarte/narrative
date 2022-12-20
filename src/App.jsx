import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import BuyOrders from "./pages/buyOrders/buyOrders.jsx";
import BuyOrdersDetails from "./pages/buyOrdersDetails/buyOrdersDetails.jsx";
import Error from "./pages/error/error.jsx";
import Root from "./pages/root.jsx";
import Datasets from "./pages/datasets/datasets.jsx";
import NewBuyOrdersDetail from "./pages/buyOrdersDetails/newBuyOrdersDetails.jsx";

if (import.meta.hot) {
  import.meta.hot.on("vite:beforeUpdate", () => console.clear());
}

const routeItems = [
  {
    name: `Buy Orders`,
    path: "",
    element: <BuyOrders title="Your Buy Orders" />,
  },
  {
    path: `details/:id`,
    element: <BuyOrdersDetails title="Buy Orders Details" />,
  },
  {
    name: "Datasets",
    path: `datasets`,
    element: <Datasets title="Datasets" />,
  },
  {
    path: "new-order",
    element: <NewBuyOrdersDetail title="New Buy Order" />,
  },
];

const router = createBrowserRouter([
  {
    path: "/narrative/",
    element: <Root navItems={routeItems} />,
    errorElement: <Error />,
    children: routeItems,
  },
  {
    path: "*",
    element: <Navigate to="/narrative/" />,
  },
]);

const App = () => <RouterProvider router={router} />;

export default App;
