// Runs on every request. If it arrives on identity.pragyan.design, serve the
// content of identity.html instead of whatever path was requested, without
// changing the URL the visitor sees. Every other host (pragyan.design, the
// .vercel.app domain) is untouched and falls through to normal routing.
export default async function middleware(request) {
  const host = request.headers.get("host") || "";
  if (host !== "identity.pragyan.design") return;

  const url = new URL(request.url);
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
