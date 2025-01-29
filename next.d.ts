interface DataUser {
  id: string;
  name: string;
  email: string;
  Username: string;
  image: string;
  role: "ADMIN" | "USER" | "MANAGER";
  password: string;
}
