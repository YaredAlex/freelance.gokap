import { createContext, useContext, useReducer } from "react";
import { AgentActionType, agentReducer } from "./agent_reducer";
import { AppliedProjectType } from "../../features/project/hooks/agent/use_agent_project";

export type AgentDetailType = {
  bio: string;
  language: string[];
  profession: string;
  reason_to_join: string;
  resume: File | null;
  skill: string[];
  user: number;
  where_did_you_heard: string;
};
export type AgentStateType = {
  detail: AgentDetailType;
  appliedProject: AppliedProjectType[];
};
export type AgentContextType = {
  agent: AgentStateType;
  dispatchAgent: React.Dispatch<AgentActionType>;
};
const defaultState: AgentContextType = {
  agent: {
    detail: {
      bio: "",
      language: [],
      profession: "",
      reason_to_join: "",
      resume: null,
      skill: [],
      user: -1,
      where_did_you_heard: "",
    },
    appliedProject: [],
  },
  dispatchAgent: () => {},
};
export const AgentContext = createContext<AgentContextType>(defaultState);
export const useAgentContext = () => {
  return useContext(AgentContext);
};
const AgentContextProvider = ({
  children,
}: {
  children: React.ReactNode;
  name?: string;
}) => {
  const [agent, dispatchAgent] = useReducer(agentReducer, {
    detail: defaultState.agent.detail,
    appliedProject: [],
  });
  return (
    <AgentContext.Provider value={{ agent, dispatchAgent }}>
      {children}
    </AgentContext.Provider>
  );
};

export default AgentContextProvider;
