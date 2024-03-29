import RadioPlayer from "../components/radio-player";
import { useQuery } from "react-query";
import { MusicRecord } from "../store/playerStore";
import { fetchAllSongs } from "../lib/fetchers";
import SongCard from "../components/ui/song-card";

const RadioPage = () => {
  const { data, isLoading, isError } = useQuery("songs", fetchAllSongs, {
    refetchInterval: 3600000,
  });

  return (
    <section className="relative w-full flex justify-center items-center">
      <div className="flex  md:flex-col mb-[100px] md:flex-1 relative p-2 justify-center items-center">
        <div className="w-full h-screen gap-2 overflow-y-scroll md:flex-col justify-center items-center rounded-md p-4 text-white backdrop-blur-2xl bg-white/10 border border-slate-500/50 md:py-3rem">
          <div className="px-5 gap-4 my-4 justify-center flex flex-col">
            <h1 className="text-3xl">📻 Vibe Radio</h1>
            <div className="flex gap-2 items-center">
              <small>Find all the user generated songs here✨ </small> - 
              <small>{data?.length} Unique Vibes Generated</small> 
            </div>
            <hr className="h-px bg-gray-200 border-0 dark:bg-gray-700" />
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3">
            {isLoading && (
              <div className="h-screen mx-auto justify-center items-center">
                <span className="loader"></span>
              </div>
            )}
            {isError && <p>Error fetching documents</p>}
            {data &&
              data.map((song: MusicRecord, i: number) => (
                <SongCard song={song} key={i} />
              ))}
          </div>
        </div>
      </div>
      <RadioPlayer />
    </section>
  );
};

export default RadioPage;
