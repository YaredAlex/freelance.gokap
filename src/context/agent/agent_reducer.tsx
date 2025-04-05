import { AgentStateType } from "./agent_context";

export type AgentActionType = {
  payload: AgentStateType;
  type: "setdetail" | "removedetail" | "setapplied";
};

export function agentReducer(state: AgentStateType, action: AgentActionType) {
  switch (action.type) {
    case "setdetail":
      localStorage.setItem("@f.info", JSON.stringify(state));
      state.detail = { ...action.payload.detail };
      return state;
    case "removedetail":
      state.detail = {
        bio: null,
        language: [],
        profession: "",
        reason_to_join: "",
        resume: null,
        skills: [],
        user: null,
        where_did_you_heard: "",
      };
      return state;
    case "setapplied":
      localStorage.setItem("@f.info", JSON.stringify(state));
      state.appliedProject = action.payload.appliedProject;
      return state;
    default:
      return state;
  }
}
