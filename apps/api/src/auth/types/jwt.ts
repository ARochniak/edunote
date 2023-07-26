export type JwtTokenPayload = {
  /** user's id */
  sub: number
  firstName: string | null
  lastName: string | null
}
