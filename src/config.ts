export const port = process.env.PORT || 3000;
export const host = process.env.SITE_URL
  ? `https://${process.env.SITE_URL}`  : `http://localhost:${port}`;
