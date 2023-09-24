import { useState } from "react";
import "./App.css";
import Sidebar from "./containers/sidebar.container";
import { PanelLeftOpen } from "lucide-react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./routes/Home.route";
import RadioPage from "./routes/Radio.route";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home/>,
  },
  {
    path: "/radio",
    element: <RadioPage/>
  }
]);

function App() {
  const [sidebarOpen, setSideBarOpen] = useState(false);

  const handleSidebarOpen = () => {
    setSideBarOpen(!sidebarOpen);
  };

  return (
    <main className="flex font-space overflow-hidden relative">
      <Sidebar
        sidebarOpen={sidebarOpen}
        handleClose={() => setSideBarOpen(false)}
      />
      <section className="flex flex-col-reverse w-full min-h-screen md:flex-row">
        <RouterProvider router={router} />
        <div className="flex justify-between md:hidden p-2">
          <button onClick={handleSidebarOpen}>
            {!sidebarOpen && (
              <PanelLeftOpen className="text-white" size="32px" />
            )}
          </button>
          <h1 className="text-2xl md:hidden text-white">Vibestation.ai</h1>
        </div>
      </section>
    </main>
  );
}

export default App;
