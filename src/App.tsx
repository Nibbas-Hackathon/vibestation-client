import { useEffect, useState } from "react";
import "./App.css";
import Chat from "./containers/chat.container";
import PlayerContainer from "./containers/player.container";
import Sidebar from "./containers/sidebar.container";
import { PanelLeftOpen } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
  DialogHeader,
} from "./components/ui/dialog";

function App() {
  const [sidebarOpen, setSideBarOpen] = useState(false);
  const [welcomeDialogOpen, setWelcomeDialogOpen] = useState(false);

  // useEffect(() => {
  //   const openDialogTimeout = setTimeout(() => {
  //     setWelcomeDialogOpen(true);
  //   }, 1000);

  //   return () => {
  //     clearTimeout(openDialogTimeout);
  //   };
  // }, []);

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
      <Dialog
        open={welcomeDialogOpen}
        onOpenChange={() => setWelcomeDialogOpen(!welcomeDialogOpen)}
      >
        <DialogContent className="h-auto bg-[#270057] text-white font-space">
          <DialogHeader>
            <DialogTitle>Welcome to Vibestation!</DialogTitle>
            <DialogDescription className="text-md text-slate-300">
              Take a selfie to create a song your emotions
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </main>
  );
}

export default App;
