import crypto from "crypto";

// Secret key for signing and verifying tokens
const SECRET_KEY = crypto.randomBytes(32).toString("hex");

/**
 * Generate a JWT token
 * @param {Object} payload - Data to be encoded in the token
 * @param {number} expiresIn - Token expiration time in seconds (default 1 hour)
 * @returns {string} Generated JWT token
 */
export function generateToken(
  payload: Object,
  expiresIn: number = 3600,
): string {
  // Validate payload
  if (!payload || typeof payload !== "object") {
    throw new Error("Payload must be a non-null object");
  }

  // Base64 encode header and payload
  const header = {
    alg: "HS256",
    typ: "JWT",
  };

  const encodedHeader = base64Encode(JSON.stringify(header));
  const encodedPayload = base64Encode(
    JSON.stringify({
      ...payload,
      exp: Math.floor(Date.now() / 1000) + expiresIn,
    }),
  );

  // Create signature
  const signature = createSignature(encodedHeader, encodedPayload);

  // Combine all parts
  return `${encodedHeader}.${encodedPayload}.${signature}`;
}

/**
 * Validate and decode a JWT token
 * @param {string} token - JWT token to validate
 * @returns {Object} Decoded payload if token is valid
 */
export function validateToken(token: string): Object {
  // Check token format
  if (!token || typeof token !== "string") {
    throw new Error("Invalid token format");
  }

  const parts = token.split(".");
  if (parts.length !== 3) {
    throw new Error("Invalid token structure");
  }

  const [encodedHeader, encodedPayload, signature] = parts;

  // Verify signature
  const expectedSignature = createSignature(encodedHeader, encodedPayload);
  if (expectedSignature !== signature) {
    console.log(expectedSignature, "------", signature);
    throw new Error("Invalid token signature");
  }

  // Decode payload
  const payload = JSON.parse(base64Decode(encodedPayload));

  // Check expiration
  if (payload.exp && payload.exp < Math.floor(Date.now() / 1000)) {
    throw new Error("Token has expired");
  }

  return payload;
}

/**
 * Base64 encode a string
 * @param {string} str - String to encode
 * @returns {string} Base64 encoded string
 */
function base64Encode(str: string): string {
  return Buffer.from(str)
    .toString("base64")
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=/g, "");
}

/**
 * Base64 decode a string
 * @param {string} str - String to decode
 * @returns {string} Decoded string
 */
function base64Decode(str: string): string {
  // Add padding if needed
  str += "===".slice(0, (4 - (str.length % 4)) % 4);
  return Buffer.from(
    str.replace(/-/g, "+").replace(/_/g, "/"),
    "base64",
  ).toString("utf-8");
}

/**
 * Create a signature using HMAC-SHA256
 * @param {string} encodedHeader - Base64 encoded header
 * @param {string} encodedPayload - Base64 encoded payload
 * @returns {string} Base64 encoded signature
 */
function createSignature(
  encodedHeader: string,
  encodedPayload: string,
): string {
  const signatureInput = `${encodedHeader}.${encodedPayload}`;
  const hmac = crypto.createHmac("sha256", SECRET_KEY);
  return hmac
    .update(signatureInput)
    .digest("base64")
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=/g, "");
}
