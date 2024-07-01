build: docker-build
up: docker-up
down: docker-down
restart: docker-down docker-up
init: docker-down-all docker-build docker-up
check: lint test

docker-build:
	docker compose build --pull --no-cache

docker-up:
	docker-compose up -d
	
docker-down:
	docker-compose down --remove-orphans

docker-down-all:
	docker-compose down -v --remove-orphans

npm-install:
	docker-compose run --rm repair-app npm install

npm-install-package:
	docker-compose run --rm repair-app npm install $(p)

npm-remove-package:
	docker-compose run --rm repair-app npm remove $(p)

prisma-generate:
	docker-compose run --rm repair-app npx prisma generate

sh:
	docker-compose exec $(c) sh

logs:
	docker-compose logs --tail=0 --follow

test:
	docker-compose run --rm repair-app npm run test

lint:
	docker-compose run --rm repair-app npm run lint
