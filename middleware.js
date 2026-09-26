// Runs on every request. If it arrives on identity.pragyan.design AND is the
// root path, serve the content of identity.html without changing the URL the
// visitor sees. Every other host, and every other path on this host (assets
// like tokens.css, wordmark.svg, etc.), falls through to normal routing —
// otherwise those asset requests would get swallowed the same way the page
// itself was.
//
// The internal fetch below deliberately goes to pragyan.design, not this same
// identity.pragyan.design host. Fetching the same host re-entered this exact
// middleware and Vercel's loop protection killed the request. Fetching a
// different host that this middleware doesn't act on can't loop, structurally.
export default async function middleware(request) {
  const host = request.headers.get("host") || "";
  if (host !== "identity.pragyan.design") return;

  const url = new URL(request.url);
  if (url.pathname !== "/") return;

  const target = new URL("/identity.html", "https://pragyan.design");
  const res = await fetch(target);
  return new Response(res.body, {
    status: res.status,
    headers: res.headers,
  });
}

export const config = {
  matcher: "/:path*",
};
