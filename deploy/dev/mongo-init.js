db.createUser(
  {
      user: "exchange-rate-api",
      pwd: "17c11594-3fe5-4299-aacc-3fa1e997f110",
      roles: [
          {
              role: "readWrite",
              db: "exchange-rate"
          }
      ]
  }
);