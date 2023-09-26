import { useState } from "react";
import "./App.css";
import Sidebar from "./containers/sidebar.container";
import { PanelLeftOpen } from "lucide-react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./routes/Home.route";
import RadioPage from "./routes/Radio.route";

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
        <section className="flex flex-col-reverse w-full min-h-screen md:max-h-screen md:flex-row">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/radio" element={<RadioPage />} />
          </Routes>
          <div className="flex justify-between md:hidden p-4">
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
