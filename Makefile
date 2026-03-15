SHELL := /bin/zsh

.PHONY: install dev dev-api dev-web lint type-check test-unit test-smoke test-api test-e2e test-all build docker-up docker-down

install:
	npm ci

dev:
	npm run dev

dev-api:
	npm run dev:api

dev-web:
	npm run dev:web

lint:
	npm run lint

type-check:
	npm run type-check

test-unit:
	npm run test:unit

test-smoke:
	npm run test:smoke

test-api:
	npm run test:api

test-e2e:
	npx playwright install --with-deps chromium
	npm run test:e2e

test-all:
	npm run test:all

build:
	npm run build

docker-up:
	docker compose up --build

docker-down:
	docker compose down
