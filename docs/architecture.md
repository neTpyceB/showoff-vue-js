# Architecture

## System overview
- Vue frontend (`src/`) handles auth/session, editor, list/search UI.
- Express REST API (`server/`) handles auth and article CRUD.
- Shared contract is HTTP JSON (`/auth/login`, `/articles`).

## Frontend modules
- `src/composables/useAuth.ts`: login/logout and local session persistence.
- `src/composables/useKnowledgeBase.ts`: article loading, search, save, delete.
- `src/components/kb/MarkdownEditor.vue`: markdown authoring and preview.
- `src/components/kb/ArticleList.vue`: search, tags, list, edit/remove actions.

## API modules
- `server/app.mjs`: endpoints and data persistence.
- `server/data.json`: seed users/articles and persisted state.

## Security
- Token-based auth header for mutating endpoints.
- Simple local development token model; extensible to JWT/provider.
