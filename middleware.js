// Runs on every request. If it arrives on identity.pragyan.design, serve the
// content of identity.html instead of whatever path was requested, without
// changing the URL the visitor sees. Every other host (pragyan.design, the
// .vercel.app domain) is untouched and falls through to normal routing.
export default async function middleware(request) {
  const host = request.headers.get("host") || "";
  if (host !== "identity.pragyan.design") return;

  const url = new URL(request.url);
  // Without this guard, the fetch() below is itself a new request to this same
  // host, which re-triggers this middleware, which fetches again, forever.
  // Once the path is already /identity.html, let it fall through to the real file.
  if (url.pathname === "/identity.html") return;

  const target = new URL("/identity.html", url.origin);
  const res = await fetch(target);
  return new Response(res.body, {
    status: res.status,
    headers: res.headers,
  });
}

export const config = {
  matcher: "/:path*",
};
