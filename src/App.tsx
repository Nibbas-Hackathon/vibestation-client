import { useEffect } from "react";
import "./App.css";
import Chat from "./containers/chat.container";
import PlayerContainer from "./containers/player.container";
import Sidebar from "./containers/sidebar.container";

function App() {
  return (
    <main className="flex font-space p-0 m-0 overflow-hidden bg-[#270057]">
      <Sidebar />
      <section className="flex flex-col-reverse w-full min-h-screen md:flex-row">
        <Chat />
        <PlayerContainer />
      </section>
    </main>
  );
}

export default App;
