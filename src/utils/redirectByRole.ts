export const redirectByRole = (
  role: "CUSTOMER" | "PROVIDER" | "ADMIN",
  router: any
) => {
  if (role === "ADMIN") {
    router.push("/admin");
  } else if (role === "PROVIDER") {
    router.push("/provider");
  } else {
    router.push("/");
  }
};
