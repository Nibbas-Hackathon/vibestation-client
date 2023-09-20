import { useEffect, useState } from "react";
import "./App.css";
import Chat from "./containers/chat.container";
import PlayerContainer from "./containers/player.container";
import Sidebar from "./containers/sidebar.container";
import { Button } from "./components/button";
import { PanelRightOpen, PanelLeftOpen } from "lucide-react";

function App() {
  const [sidebarOpen, setSideBarOpen] = useState(false);

  const handleSidebarOpen = () => {
    setSideBarOpen(!sidebarOpen);
  };

  return (
    <main className="flex font-space p-0 m-0 overflow-hidden">
      <Sidebar
        sidebarOpen={sidebarOpen}
        handleClose={() => setSideBarOpen(false)}
      />
      <section className="flex flex-col-reverse w-full min-h-screen md:flex-row">
        <Chat />
        <PlayerContainer />
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
