import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface Amendment {
    date: string;
    description: string;
    version: string;
}
export interface Policy {
    id: bigint;
    title: string;
    amendments: Array<Amendment>;
    stakeholders: Array<string>;
    policyType: string;
    year: bigint;
    sourceUrl: string;
    vertical: string;
    level: string;
    keyProvisions: Array<string>;
    summary: string;
    state?: string;
    industryImpact: string;
}
export interface UserProfile {
    name: string;
    email: string;
    organization?: string;
}
export enum SubscriptionTier {
    premium = "premium",
    lite = "lite"
}
export enum UserRole {
    admin = "admin",
    user = "user",
    guest = "guest"
}
export interface backendInterface {
    activateLite(): Promise<void>;
    activatePremium(): Promise<void>;
    addPolicy(policy: Policy): Promise<bigint>;
    assignCallerUserRole(user: Principal, role: UserRole): Promise<void>;
    deletePolicy(id: bigint): Promise<void>;
    getAllPolicies(): Promise<Array<Policy>>;
    getAllVerticals(): Promise<Array<string>>;
    getCallerUserProfile(): Promise<UserProfile | null>;
    getCallerUserRole(): Promise<UserRole>;
    getCentralPolicies(): Promise<Array<Policy>>;
    getMySubscriptionTier(): Promise<SubscriptionTier>;
    getPoliciesByLevel(level: string): Promise<Array<Policy>>;
    getPoliciesByVertical(vertical: string): Promise<Array<Policy>>;
    getPoliciesByYear(year: bigint): Promise<Array<Policy>>;
    getPoliciesForEfficiency(): Promise<Array<Policy>>;
    getPoliciesForRenewableEnergy(): Promise<Array<Policy>>;
    getPoliciesForYearRange(startYear: bigint, endYear: bigint): Promise<Array<Policy>>;
    getPoliciesImpactingIndustry(): Promise<Array<Policy>>;
    getPolicyById(id: bigint): Promise<Policy>;
    getStatePolicies(): Promise<Array<Policy>>;
    getSubscriptionTier(user: Principal): Promise<SubscriptionTier>;
    getUserProfile(user: Principal): Promise<UserProfile | null>;
    isCallerAdmin(): Promise<boolean>;
    saveCallerUserProfile(profile: UserProfile): Promise<void>;
    searchPoliciesByKeyword(keyword: string): Promise<Array<Policy>>;
    updatePolicy(policy: Policy): Promise<void>;
}
