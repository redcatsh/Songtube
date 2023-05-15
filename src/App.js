import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import Home from "./pages/Home";
import Root from "./pages/Root";
import NotFound from "./pages/NotFound";
import VideoDetail from "./pages/VideoDetail";
import SearchResult from "./pages/SearchResult";
import { DarkModeProvider } from "./context/DarkModeContext";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <NotFound />,
    children: [
      { index: true, element: <Home /> },
      { path: "/:videoId", element: <VideoDetail /> },
      { path: "result/:keyword", element: <SearchResult /> },
    ],
  },
]);

const queryClient = new QueryClient();

function App() {
  return (
    <DarkModeProvider>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />

        <ReactQueryDevtools initialIsOpen={true} />
      </QueryClientProvider>
    </DarkModeProvider>
  );
}

export default App;
