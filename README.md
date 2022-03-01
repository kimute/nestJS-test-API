## Description

Creating TEST(movie) API with [Nest](https://github.com/nestjs/nest) & Typescript

<img alt="NestJS" src ="https://img.shields.io/badge/NestJS-v8.0.0-6.svg?&style=for-the-badge&logo=NestJS&logoColor=E0234E"/>

### how to test API (curl or use tools like Insomnia or Post man)

```bash
# example
$ curl -X POST -H "Content-Type: application/json"
 -d '{
      "title": "starwars",
      "year": 2018,
      "genres":["action", "SF"]
     }'
localhost:3000/movies

```

## Test

[V] Unit Test
[V] E2E Test
