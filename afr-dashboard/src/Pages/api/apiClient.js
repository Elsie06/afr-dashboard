import { useQuery } from "@tanstack/react-query";
import api from "../api/apiClient";

export default function useFetch(endpoint, key) {
  return useQuery([key], async () => {
    const { data } = await api.get(endpoint);
    return data;
  });
}
