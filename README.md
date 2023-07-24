# Routes

## Users Routes:

- POST /api/v1/users/register -> Register User

- POST /api/v1/users/login -> Login User

- GET /api/v1/users/profile -> Get User Profile (via token)

- DELETE /api/v1/users -> Delete User

- PUT /api/v1/users -> Update User

## Accounts Routes:

- POST /api/v1/accounts -> Create Account

- GET /api/v1/accounts/:id -> Get Single Account

- GET /api/v1/accounts -> Get All Accounts

- DELETE /api/v1/accounts/:id -> Delete Account

- PUT /api/v1/accounts/:id -> Update Account

## Transactions Route:

- POST /api/v1/transactions -> Create Transaction

- GET /api/v1/transactions -> Get All Transactions

- GET /api/v1/transactions/:id -> Get Single Transaction

- DELETE /api/v1/transactions/:id -> Delete Transaction

- PUT /api/v1/transactions/:id -> Update Transaction

### Data Modelling:

We have 3 entities here -> a user, an account and a transaction. A user can create many accounts and one account may have many transactions.

### Env variables required:

- PORT
- MONGO_URI
- SALT_ROUNDS
- JWT_SECRET
