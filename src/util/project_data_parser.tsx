const projectCode = new Map([
  [1, "C"],
  [2, "UN"],
  [3, "P"],
  [4, "C"],
  [5, "O"],
]);
const paymentCode = new Map([
  [3, "UN"],
  [4, "P"],
]);

export function projectStatusLabel(
  code: number
): "completed" | "ongoing" | "paused" | "unassigned" {
  switch (projectCode.get(code)) {
    case "C":
      return "completed";
    case "O":
      return "ongoing";
    case "P":
      return "paused";
    case "UN":
      return "unassigned";
    default:
      throw new Error(`Unknown project status code: ${code}`);
  }
}

// Payment status string formatter
export function paymentStatusLabel(
  code: number
): "completed" | "pending" | "partially paid" {
  switch (paymentCode.get(code)) {
    case "P":
      return "completed";
    case "PP":
      return "partially paid";
    case "UN":
    default:
      return "pending";
  }
}

export function projectStatusStyle(code: number) {
  switch (projectCode.get(code)) {
    case "C":
      return "bg-project-completed text-project-completed border-project-completed";

    case "O":
      return "bg-project-ongoing text-project-ongoing border-project-ongoing";

    case "P":
      return "bg-project-paused text-project-paused border-project-paused";

    case "UN":
      return "bg-project-unassigned text-project-unassigned border-project-unassigned";

    default:
      return "bg-project-unknown text-project-unknown border-project-unknown";
  }
}

export function paymentStatusStyle(code: number) {
  switch (paymentCode.get(code)) {
    case "P":
      return "bg-payment-paid text-payment-paid border-payment-paid";
    case "PP":
      return "bg-payment-partial text-payment-partial border-payment-partial";
    case "UN":
      return "bg-payment-unpaid text-payment-unpaid border-payment-unpaid";
    default:
      return "bg-payment-unknown text-payment-unknown border-payment-unknown";
  }
}
