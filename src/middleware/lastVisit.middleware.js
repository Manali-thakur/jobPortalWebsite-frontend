export function setLastVisit(req, res, next) {
  res.locals.lastVisit = req.cookies.lastVisit || null;
  res.cookie("lastVisit", new Date().toISOString(), {
    maxAge: 365 * 24 * 60 * 60 * 1000,
    httpOnly: true,
    sameSite: "lax",
  });
  next();
}
