import Array "mo:core/Array";
import Map "mo:core/Map";
import Iter "mo:core/Iter";
import Principal "mo:core/Principal";
import Text "mo:core/Text";
import Nat "mo:core/Nat";
import Runtime "mo:core/Runtime";

import MixinAuthorization "authorization/MixinAuthorization";
import AccessControl "authorization/access-control";


actor {
  // Initialize the user system state
  let accessControlState = AccessControl.initState();
  include MixinAuthorization(accessControlState);

  // Types
  type SubscriptionTier = {
    #lite;
    #premium;
  };

  type Policy = {
    id : Nat;
    title : Text;
    vertical : Text;
    policyType : Text;
    year : Nat;
    level : Text;
    state : ?Text;
    summary : Text;
    keyProvisions : [Text];
    industryImpact : Text;
    stakeholders : [Text];
    sourceUrl : Text;
    amendments : [Amendment];
  };

  type Amendment = {
    date : Text;
    description : Text;
    version : Text;
  };

  public type UserProfile = {
    name : Text;
    email : Text;
    organization : ?Text;
  };

  // Data
  let policies : Map.Map<Nat, Policy> = Map.empty<Nat, Policy>();
  let subscriptions : Map.Map<Principal, SubscriptionTier> = Map.empty<Principal, SubscriptionTier>();
  let userProfiles : Map.Map<Principal, UserProfile> = Map.empty<Principal, UserProfile>();
  var nextId = 1;

  // Helper function to get subscription tier
  private func getSubscriptionTierInternal(user : Principal) : SubscriptionTier {
    switch (subscriptions.get(user)) {
      case (null) { #lite };
      case (?tier) { tier };
    };
  };

  // Helper function to check if user has premium access
  private func hasPremiumAccess(user : Principal) : Bool {
    switch (getSubscriptionTierInternal(user)) {
      case (#premium) { true };
      case (#lite) { false };
    };
  };

  // User Profile functions (required by instructions)
  public query ({ caller }) func getCallerUserProfile() : async ?UserProfile {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can view profiles");
    };
    userProfiles.get(caller);
  };

  public query ({ caller }) func getUserProfile(user : Principal) : async ?UserProfile {
    if (caller != user and not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Can only view your own profile");
    };
    userProfiles.get(user);
  };

  public shared ({ caller }) func saveCallerUserProfile(profile : UserProfile) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can save profiles");
    };
    userProfiles.add(caller, profile);
  };

  // Policy query functions - accessible to authenticated users only
  public query ({ caller }) func getAllPolicies() : async [Policy] {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only authenticated users can view policies");
    };
    policies.values().toArray();
  };

  public query ({ caller }) func getPolicyById(id : Nat) : async Policy {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only authenticated users can view policies");
    };
    switch (policies.get(id)) {
      case (null) { Runtime.trap("Policy not found") };
      case (?policy) { policy };
    };
  };

  public query ({ caller }) func getPoliciesByVertical(vertical : Text) : async [Policy] {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only authenticated users can view policies");
    };
    policies.values().toArray().filter(
      func(p) {
        Text.equal(p.vertical, vertical);
      }
    );
  };

  public query ({ caller }) func getPoliciesByLevel(level : Text) : async [Policy] {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only authenticated users can view policies");
    };
    policies.values().toArray().filter(
      func(p) {
        Text.equal(p.level, level);
      }
    );
  };

  public query ({ caller }) func getPoliciesByYear(year : Nat) : async [Policy] {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only authenticated users can view policies");
    };
    policies.values().toArray().filter(
      func(p) {
        p.year == year;
      }
    );
  };

  public query ({ caller }) func searchPoliciesByKeyword(keyword : Text) : async [Policy] {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only authenticated users can search policies");
    };
    // Premium feature - advanced search
    if (not hasPremiumAccess(caller)) {
      Runtime.trap("Unauthorized: Premium subscription required for keyword search");
    };
    let lowerKeyword = keyword.toLower();
    policies.values().toArray().filter(
      func(p) {
        p.title.toLower().contains(#text lowerKeyword) or
        p.summary.toLower().contains(#text lowerKeyword) or
        p.industryImpact.toLower().contains(#text lowerKeyword);
      }
    );
  };

  public query ({ caller }) func getAllVerticals() : async [Text] {
    // Public information - no authentication required
    [
      "Generation",
      "Transmission",
      "Distribution",
      "Renewable",
      "Regulations",
      "Efficiency",
      "EmergingTech",
    ];
  };

  // Admin functions - require admin role
  public shared ({ caller }) func addPolicy(policy : Policy) : async Nat {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Admin access required");
    };
    let newId = nextId;
    let newPolicy = {
      policy with
      id = newId;
    };
    policies.add(newId, newPolicy);
    nextId += 1;
    newId;
  };

  public shared ({ caller }) func updatePolicy(policy : Policy) : async () {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Admin access required");
    };
    if (not policies.containsKey(policy.id)) {
      Runtime.trap("Policy not found");
    };
    policies.add(policy.id, policy);
  };

  public shared ({ caller }) func deletePolicy(id : Nat) : async () {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Admin access required");
    };
    if (not policies.containsKey(id)) {
      Runtime.trap("Policy not found");
    };
    policies.remove(id);
  };

  // Subscription functions - require user authentication
  public shared ({ caller }) func getMySubscriptionTier() : async SubscriptionTier {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only authenticated users can view subscription tier");
    };
    switch (subscriptions.get(caller)) {
      case (null) {
        subscriptions.add(caller, #lite);
        #lite;
      };
      case (?tier) { tier };
    };
  };

  public shared ({ caller }) func activatePremium() : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only authenticated users can activate premium");
    };
    subscriptions.add(caller, #premium);
  };

  public shared ({ caller }) func activateLite() : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only authenticated users can change subscription");
    };
    subscriptions.add(caller, #lite);
  };

  public query ({ caller }) func getSubscriptionTier(user : Principal) : async SubscriptionTier {
    if (caller != user and not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: You do not have access to this user's subscription tier");
    };
    getSubscriptionTierInternal(user);
  };

  system func preupgrade() {
    // No persistent storage needed
  };

  system func postupgrade() {
    // No persistent storage needed
  };

  // Domain-specific filtering functions - require authentication
  public query ({ caller }) func getCentralPolicies() : async [Policy] {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only authenticated users can view policies");
    };
    policies.values().toArray().filter(
      func(p) {
        Text.equal(p.level, "central");
      }
    );
  };

  public query ({ caller }) func getStatePolicies() : async [Policy] {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only authenticated users can view policies");
    };
    policies.values().toArray().filter(
      func(p) {
        Text.equal(p.level, "state");
      }
    );
  };

  public query ({ caller }) func getPoliciesForYearRange(startYear : Nat, endYear : Nat) : async [Policy] {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only authenticated users can view policies");
    };
    // Premium feature - year range filtering
    if (not hasPremiumAccess(caller)) {
      Runtime.trap("Unauthorized: Premium subscription required for year range filtering");
    };
    policies.values().toArray().filter(
      func(p) {
        p.year >= startYear and p.year <= endYear;
      }
    );
  };

  public query ({ caller }) func getPoliciesImpactingIndustry() : async [Policy] {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only authenticated users can view policies");
    };
    policies.values().toArray().filter(
      func(p) {
        p.industryImpact.contains(#text "industry");
      }
    );
  };

  public query ({ caller }) func getPoliciesForRenewableEnergy() : async [Policy] {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only authenticated users can view policies");
    };
    policies.values().toArray().filter(
      func(p) {
        Text.equal(p.vertical, "Renewable");
      }
    );
  };

  public query ({ caller }) func getPoliciesForEfficiency() : async [Policy] {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only authenticated users can view policies");
    };
    policies.values().toArray().filter(
      func(p) {
        Text.equal(p.vertical, "Efficiency");
      }
    );
  };
};
