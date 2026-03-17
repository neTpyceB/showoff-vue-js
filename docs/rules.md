# Engineering Rules

- Keep SSR payload assembly parallelized across independent services.
- Use edge-friendly cache headers and stale revalidation for aggregate endpoints.
- Real-time feed inserts must be merged client-side without duplicating timeline entries.
- Docker, CI, and orchestration manifests must validate the app with all upstream services present.
