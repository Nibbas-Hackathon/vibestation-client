import "./App.css";
import Chat from "./containers/chat";
import Sidebar from "./containers/sidebar";

function App() {
  return (
    <main className="flex p-0 m-0 overflow-hidden">
      <Sidebar />
      <div className="w-full absolute blur-2xl min-h-screen bg-[url('https://plus.unsplash.com/premium_photo-1675855291447-3266ba923327?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=987&q=80')]"/>
      <Chat/>
    </main>
  );
}

export default App;
