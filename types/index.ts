export type Task = {
  _id: string;
  title: string;
  status: "Backlog" | "Todo" | "In Progress" | "Done" | "Cancelled";
  priority: "Low" | "Medium" | "High";
  userId: string;
  createdAt: Date;
  updatedAt: Date;
};

export type User = {
    _id: string,
    email: string,
    name: string,
    password: string,
    createdAt: Date
}