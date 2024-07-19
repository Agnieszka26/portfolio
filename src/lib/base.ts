const Airtable = require("airtable");

export const base = new Airtable({
  apiKey: process.env.NEXT_PUBLIC_PERSONAL_ACCESS_TOKEN_SECRET,
}).base(process.env.NEXT_PUBLIC_API_TOKEN_BASE);
