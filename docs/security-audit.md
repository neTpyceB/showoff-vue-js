# Security Audit Notes

## Current posture
- No backend surface and no remote data processing.
- User-generated text is rendered as plain text in Vue templates.
- Storage is local browser storage only.

## Dependency checks
- `npm audit` is run after dependency updates.
- CI enforces install and test integrity on each push/PR.

## Follow-up actions
1. Add dependency review action for transitive-risk visibility.
2. Add CodeQL workflow when backend/API surface is introduced.
