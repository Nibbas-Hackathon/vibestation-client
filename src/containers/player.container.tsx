import React, { useEffect } from "react";
import Waveform from "../components/waveformPlayer";
import { useAudioPlayerStore } from "../store";
type Props = {
  title?: string | null;
  album_cover?: string | null;
  composer?: string | null;
};

const PlayerContainer = ({ title, album_cover, composer }: Props) => {
  const { url, setUrl } = useAudioPlayerStore();
  const audioUrl = ""
  // "https://vibestation.s3.amazonaws.com/audio/1695148266_9934.wav?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAYOV454KP4AFU56AK%2F20230919%2Fap-south-1%2Fs3%2Faws4_request&X-Amz-Date=20230919T183108Z&X-Amz-SignedHeaders=host&X-Amz-Expires=3600&X-Amz-Signature=5104e28b38a64ebd1063560f00f6bbddd898dd65aaca11c8617ccc053f8bff67";

  // useEffect(() => {

  //   fetch(audioUrl)
  //     .then((response) => {
  //       if (!response.ok) {
  //         throw new Error("Network response was not ok");
  //       }
  //       return response.blob();
  //     })
  //     .then((audioBlob) => {
  //       const audioObjectURL = URL.createObjectURL(audioBlob);

  //       setUrl(audioObjectURL);
  //     })
  //     .catch((error) => {
  //       console.error("Error fetching audio:", error);
  //     });
  // }, [setUrl]);

  return (
    <div className="flex flex-row  md:flex-col h-auto p-2   md:flex-1 md:h-screen relative">
      <div className="w-full flex-1 gap-2 flex-row md:flex-col rounded-md flex p-5 text-white backdrop-blur-2xl bg-white/10 border border-slate-500">
        <div className="flex flex-row md:flex-col gap-5 justify-between md:justify-center w-full h-full">
          <div className="bg-transparent rounded-md flex gap-2  flex-col justify-center items-center">
            <img
              src={
                album_cover
                  ? album_cover
                  : "https://pbxt.replicate.delivery/5SlkISV9wqIJCNFr9taaRB3sWqULUrRx9aosfL9ofrmuo4lRA/out-0.png"
              }
              className="object-cover absolute -z-10 blur-[50px] h-[100px] w-[100px] rounded-md md:h-[300px] md:w-[300px]"
              alt="ai_album_cover"
            />

            <img
              src={
                album_cover
                  ? album_cover
                  : "https://pbxt.replicate.delivery/5SlkISV9wqIJCNFr9taaRB3sWqULUrRx9aosfL9ofrmuo4lRA/out-0.png"
              }
              className="object-cover rounded-md h-[120px] w-[120px] md:h-[300px] md:w-[300px]"
              alt="ai_album_cover"
            />
            <h1>{title ? title : "Echelon"}</h1>
            <small>{composer ? composer : "Adolf H"}</small>
          </div>
          {url && <Waveform url={url} />}
        </div>
      </div>
    </div>
  );
};

export default PlayerContainer;
