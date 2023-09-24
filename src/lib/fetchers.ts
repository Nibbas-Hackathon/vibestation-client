import { axiosInstance } from "./axios-instance";

export const fetchAllSongs = async () => {
  try {
    const response = await axiosInstance.get("/api/data/all_songs");
    const { all_songs } = response.data;
    return all_songs;
  } catch (error) {
    throw new Error("Error fetching documents");
  }
};
