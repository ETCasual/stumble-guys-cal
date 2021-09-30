/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/ban-ts-comment */
/**
 * Get an environment variable given its name
 * @param {string} envVar - the environment variable's name
 * @returns {string | Error} the environment variable or an Error if not available
 */
export const getEnvVar = (envVar: string): { env: string | null; error: Error | null } => {
  const x = process.env[envVar]
  if (!x) {
    return {
      env: null,
      error: new Error(`Unable to fetch product lines, ${envVar} not provided in .env.local`),
    }
  }
  return { env: x, error: null }
}
