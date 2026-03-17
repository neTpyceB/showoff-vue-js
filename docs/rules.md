# Engineering Rules

- Treat tenant bootstrap as the source of truth for enabled modules and route topology.
- Enforce permissions on the module service first, then reflect them in the UI.
- Keep plugin routing deterministic: backend manifest -> route sync -> registry component.
- Docker and CI must validate the full microservices stack, not just the frontend.
