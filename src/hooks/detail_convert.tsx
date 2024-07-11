import TimeAgo from "javascript-time-ago";
import { ClientProjectType } from "../context/projects/project_context";

export const detailConvert = (
  details: ClientProjectType[]
): ClientProjectType[] | undefined => {
  const timeAgo = new TimeAgo("en-US");
  details = details?.sort((a, b) => {
    if (Date.parse(a.created_at) < Date.parse(b.created_at)) return 1;
    return -1;
  });
  const converted: ClientProjectType[] | [] = details?.map((detail) => {
    return {
      title: detail.title,
      id: detail.id,
      created_at: timeAgo.format(Date.parse(detail?.created_at)),
      project_status: detail.project_status === 1 ? "assigned" : "unassigned",
      project_price: detail.project_price,
      skills_required: detail.skills_required,
      description: detail.description,
      project_category: detail.project_category,
      project_deadline: detail.project_deadline,
      client: detail.client,
      updated_at: detail.updated_at,
      payment_status: detail.payment_status,
      project_assigned_status: detail.project_assigned_status,
      applied_count: detail.applied_count,
    };
  });

  return converted;
};
