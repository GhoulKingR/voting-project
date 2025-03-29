/**
 * Safely decode a JWT token without verification
 * @param {string} token - JWT token to decode
 * @returns {any} Decoded payload
 */
export function decode(token: string): any {
  // Validate token input
  if (!token || typeof token !== "string") {
    throw new Error("Invalid token");
  }

  // Split the token into parts
  const parts = token.split(".");
  if (parts.length !== 3) {
    throw new Error("Invalid token format");
  }

  try {
    // Decode the payload (second part)
    const decodedPayload = base64UrlDecode(parts[1]);
    return JSON.parse(decodedPayload);
  } catch (error) {
    throw new Error("Failed to decode token payload");
  }
}

/**
 * Check if token is expired
 * @param {string} token - JWT token to check
 * @returns {boolean} Whether the token is expired
 */
export function isExpired(token: string): boolean {
  try {
    const payload: any = decode(token);

    // Check if 'exp' claim exists
    if (!payload.exp) {
      return false; // No expiration set
    }

    // Compare expiration time with current time
    return payload.exp < Math.floor(Date.now() / 1000);
  } catch {
    return true; // Consider invalid tokens as expired
  }
}

/**
 * Get remaining time before token expiration
 * @param {string} token - JWT token to check
 * @returns {number} Seconds remaining, or 0 if expired
 */
export function getExpirationTime(token: string): number {
  try {
    const payload: any = decode(token);

    // Check if 'exp' claim exists
    if (!payload.exp) {
      return Infinity; // No expiration set
    }

    const remainingTime = payload.exp - Math.floor(Date.now() / 1000);
    return Math.max(0, remainingTime);
  } catch {
    return 0; // Return 0 for invalid tokens
  }
}

/**
 * Base64Url decode a string
 * @param {string} base64UrlEncodedStr - Base64Url encoded string
 * @returns {string} Decoded string
 */
function base64UrlDecode(base64UrlEncodedStr: string): string {
  // Add padding if needed
  let base64 = base64UrlEncodedStr
    .replace(/-/g, "+") // Replace URL-safe characters
    .replace(/_/g, "/");

  // Add padding
  base64 += "===".slice(0, (4 - (base64.length % 4)) % 4);

  // Decode
  return decodeURIComponent(
    atob(base64)
      .split("")
      .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
      .join(""),
  );
}
