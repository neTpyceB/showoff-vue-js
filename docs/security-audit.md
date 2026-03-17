# Security Audit Notes

## Current controls
- SSR aggregation stays server-side and does not expose private upstream URLs to browser fetches.
- Public runtime config exposes only the feed event stream URL needed by the client.
- No user-generated HTML is injected into the page.

## Risks
- Upstream services are mock local services without auth.
- SSE stream is unauthenticated and intended for demo/local use only.
- There is no abuse protection on the public feed endpoints.

## Next hardening
1. Add signed viewer sessions and stream authorization.
2. Introduce rate limiting and bot controls on feed APIs.
3. Add origin shielding plus signed cache keys for personalized feed variants.
