import { AgentStateType } from "./agent_context";

export type AgentActionType = {
  payload: AgentStateType;
  type: "setdetail" | "removedetail" | "setapplied";
};

export function agentReducer(state: AgentStateType, action: AgentActionType) {
  switch (action.type) {
    case "setdetail":
      state.detail = { ...action.payload.detail };
      return state;
    case "removedetail":
      state.detail = {
        bio: "",
        language: [],
        profession: "",
        reason_to_join: "",
        resume: null,
        skill: [],
        user: -1,
        where_did_you_heard: "",
      };
      return state;
    case "setapplied":
      state.appliedProject = action.payload.appliedProject;
      return state;
    default:
      return state;
  }
}
