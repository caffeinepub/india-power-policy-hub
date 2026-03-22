import { useQuery } from "@tanstack/react-query";
import type { Policy } from "../backend.d";
import { SAMPLE_POLICIES } from "../data/samplePolicies";
import { useActor } from "./useActor";

export function useAllPolicies() {
  const { actor, isFetching } = useActor();
  return useQuery<Policy[]>({
    queryKey: ["policies"],
    queryFn: async () => {
      if (!actor) return SAMPLE_POLICIES;
      try {
        const result = await actor.getAllPolicies();
        return result.length > 0 ? result : SAMPLE_POLICIES;
      } catch {
        return SAMPLE_POLICIES;
      }
    },
    enabled: !isFetching,
    staleTime: 5 * 60 * 1000,
  });
}
