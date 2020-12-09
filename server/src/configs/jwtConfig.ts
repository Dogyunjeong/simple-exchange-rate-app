import fs from 'fs'
import path from 'path'

namespace jwtConfig {
  export const JWT_ISSUER = process.env.JWT_ISSUER
  export const JWT_MAX_AGE = process.env.JWT_MAX_AGE
  export const JWT_SECRET = fs.readFileSync(path.relative('/', '/keys/jwtForAuth.key')) 
}

export default jwtConfig
