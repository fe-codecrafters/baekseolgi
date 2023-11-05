import { axios } from "@/lib/axios";
import { SeolgiKeyParam, seolgiKeys } from "../key";
import { GetSeolgiParams, GetSeolgiResDTO } from "../types/getSeolgi.dto";
import { useQuery } from "@tanstack/react-query";

export const getSeolgi = async ({ seolgiName }: GetSeolgiParams) => {
  const res = await axios.get<GetSeolgiResDTO>(`/api/seolgi`, {
    params: {
      ["seolgi-name"]: seolgiName,
    },
  });
  return res.data.data;
};

export const useGetSeolgi = ({ seolgiName }: SeolgiKeyParam) => {
  return useQuery({
    queryKey: seolgiKeys.name({ seolgiName }),
    queryFn: () => getSeolgi({ seolgiName }),
  });
};
