import { NEXTAUTH_SECRET } from './dotenv'
import { HmacSHA256 } from 'crypto-js'

/**@type {(text: string)=>string} */
export default function crypto(text) {
  return HmacSHA256(text, NEXTAUTH_SECRET).toString()
}
