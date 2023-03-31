## CMD KNEX

- **Create a migration :** `npx knex migrate:make "nameExemple"`
- **Run a migration :** `npx knex migrate:latest`
- **Rollback the migration :** `npx knex migrate:rollback`

## Step for docker :

```
 - docker build -t quizzle .
 - docker-compose -d up
```

## ENV variables :

```
DB_CLIENT=pg
DB_USER=postgres
DB_PASSWORD=postgres
DB_DATABASE=quizz
SECURITY_ITERATION=10000
SECURITY_NUMBERBYTES=32
SECURITY_FORMATHASH=sha512
SECURITY_SECRET=popo
```
