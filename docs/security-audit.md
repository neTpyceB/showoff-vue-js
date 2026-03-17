# Security Audit Notes

## Current controls
- Auth token required for `/state` and websocket connection.
- Role checks enforced for mutating dashboard state.
- Input validation for state mutation payloads.

## Risks
- Demo token format is simple and not signed.
- In-memory state resets on API restart.

## Next hardening
1. JWT with expiration and refresh.
2. Rate limiting and brute-force controls on login.
3. Persistent event log with immutable audit records.
