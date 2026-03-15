# Security Audit Notes

## Implemented controls
- Auth required for write operations (`POST`, `PUT`, `DELETE /articles`).
- Input normalization for tags and title validation.
- CORS and JSON body parsing explicitly configured.

## Residual risks
- Demo token model is not cryptographically signed.
- Credentials are seed-only and for local/dev use.

## Next hardening steps
1. Replace demo token with JWT and expiration.
2. Add rate limiting and auth failure lockouts.
3. Add dependency review and CodeQL workflows.
