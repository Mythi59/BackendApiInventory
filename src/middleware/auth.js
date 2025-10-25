export function isAdministrator(request, response, next) {
  const { role } = request.body.user;
  if (role !== "admin") {
    return response
      .status(403)
      .json({ message: "Access denied, Required role administrator" });
  }
  next();
}

export function isClient(request, response, next) {
  const { role } = request.body.user;
  if (role !== "client") {
    return response
      .status(403)
      .json({ message: "Access denied, Required role client" });
  }
  next();
}
