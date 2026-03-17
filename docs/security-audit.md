# Security Audit Notes

## Current controls
- Gateway requires bearer auth for bootstrap and module actions.
- Auth service is the source of tenant memberships.
- Module service enforces role-derived policies for privileged actions.

## Risks
- Demo token format is not cryptographically signed.
- Service-to-service traffic is unauthenticated inside the local network.
- Tenant/module data is in-memory only.

## Next hardening
1. Replace demo tokens with signed JWTs and session expiration.
2. Add mTLS or signed service tokens between gateway and internal services.
3. Persist tenant policy changes with immutable audit history.
