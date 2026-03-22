import { useQuery, useQueryClient } from "@tanstack/react-query";
import { type ReactNode, createContext, useContext } from "react";
import { SubscriptionTier } from "../backend.d";
import { useActor } from "../hooks/useActor";
import { useInternetIdentity } from "../hooks/useInternetIdentity";

interface SubscriptionContextValue {
  tier: SubscriptionTier;
  isLoading: boolean;
  isPremium: boolean;
  activatePremium: () => Promise<void>;
  activateLite: () => Promise<void>;
}

const SubscriptionContext = createContext<SubscriptionContextValue>({
  tier: SubscriptionTier.lite,
  isLoading: true,
  isPremium: false,
  activatePremium: async () => {},
  activateLite: async () => {},
});

export function SubscriptionProvider({ children }: { children: ReactNode }) {
  const { actor, isFetching } = useActor();
  const { identity } = useInternetIdentity();
  const queryClient = useQueryClient();

  const { data: tier = SubscriptionTier.lite, isLoading } =
    useQuery<SubscriptionTier>({
      queryKey: ["subscriptionTier", identity?.getPrincipal().toString()],
      queryFn: async () => {
        if (!actor) return SubscriptionTier.lite;
        try {
          return await actor.getMySubscriptionTier();
        } catch {
          return SubscriptionTier.lite;
        }
      },
      enabled: !!actor && !isFetching && !!identity,
      staleTime: 60 * 1000,
    });

  const activatePremium = async () => {
    if (!actor) return;
    await actor.activatePremium();
    queryClient.invalidateQueries({ queryKey: ["subscriptionTier"] });
  };

  const activateLite = async () => {
    if (!actor) return;
    await actor.activateLite();
    queryClient.invalidateQueries({ queryKey: ["subscriptionTier"] });
  };

  return (
    <SubscriptionContext.Provider
      value={{
        tier,
        isLoading: isFetching || isLoading,
        isPremium: tier === SubscriptionTier.premium,
        activatePremium,
        activateLite,
      }}
    >
      {children}
    </SubscriptionContext.Provider>
  );
}

export function useSubscription() {
  return useContext(SubscriptionContext);
}
