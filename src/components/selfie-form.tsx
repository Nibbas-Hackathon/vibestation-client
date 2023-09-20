import React from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "./select";
import { GENRE, MOOD_INTENSITY, TEMPO } from "../lib/utils";
import { useChatStore } from "../store";

type Props = {};

const SelfieForm = (props: Props) => {
  const {setSelfieForm} = useChatStore()



  return (
    <div className="flex w-full justify-between gap-3">
      <div className="flex flex-col justify-between gap-2">
        <label htmlFor="moodIntensity">Intensity</label>
        <Select onValueChange={(value) => setSelfieForm("mood", value)}>
          <SelectTrigger className=" flex-1 bg-black text-white">
            <SelectValue placeholder="Intensity" />
          </SelectTrigger>
          <SelectContent className="text">
            <SelectGroup>
              <SelectLabel>Mood Intensity</SelectLabel>
              {MOOD_INTENSITY.map((mood, i) => (
                <SelectItem key={i} value={mood}>
                  {mood}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
      <div className="flex flex-col flex-1 justify-between gap-2">
        <label htmlFor="Tempo">Tempo</label>
        <Select onValueChange={(value) => setSelfieForm("tempo", value)}>
          <SelectTrigger className=" bg-black text-white">
            <SelectValue placeholder="Tempo" />
          </SelectTrigger>
          <SelectContent className="text">
            <SelectGroup>
              <SelectLabel>Tempo</SelectLabel>
              {TEMPO.map((t, i) => (
                <SelectItem key={i} value={t}>
                  {t}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
      <div className="flex flex-col flex-1 justify-between gap-2">
        <label htmlFor="Genre">Genre</label>
        <Select onValueChange={(value) => setSelfieForm("genre", value)}>
          <SelectTrigger className=" bg-black text-white">
            <SelectValue placeholder="Genre" />
          </SelectTrigger>
          <SelectContent className="text">
            <SelectGroup>
              <SelectLabel> Genre</SelectLabel>
              {GENRE.map((g, i) => (
                <SelectItem key={i} value={g}>
                  {g}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

export default SelfieForm;
