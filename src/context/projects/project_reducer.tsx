import { ClientProjectType } from "./project_context.js";

export type ProjectActionType = {
  payload: ClientProjectType[];
  type: "saveproject" | "addproject";
};

export const projectReducer = (
  state: { data: ClientProjectType[] },
  action: ProjectActionType
) => {
  switch (action.type) {
    case "saveproject":
      return {
        data: [...action.payload],
      };
    case "addproject":
      return {
        ...state,
        data: [...state.data, ...action.payload],
      };
    default:
      return state;
  }
};
