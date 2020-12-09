# ABOUT

This is simple exchange late listing service
- This one implmentation is expected less than one day

## How to run

1. Run  `./deploy/dev/docker-compose`.
   1. e.g `$ docker-compose up -d`
2. Make sure all the environemt variables are set. Could use  `./clinet/.env` and `./server/.env`
3. To run server
   1. `$ yarn build` in `./server`
   2. `$ yarn start` in `./server`
4. To run client
   1. `$ yarn start` in `./client`

## Restricted points
- No sign up
- Login with only a email
  - **This is only to distinguish user**
  - There is no sign up method
  - Email validation is simple. 
- Limited error handling on client currently
- Limited UX due to save time
  - e.g Search input doesn't have realtime search functionality.
- No Loading indicators
- Simple validations