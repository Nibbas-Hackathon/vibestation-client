import React from "react";
import Chat from "../containers/chat.container";
import PlayerContainer from "../containers/player.container";
const Home = () => {
  return (
    <React.Fragment>
      <Chat />
      <PlayerContainer />
    </React.Fragment>
  );
};

export default Home;
