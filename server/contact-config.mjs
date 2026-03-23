export const contactConfig = {
  resendApiKey: process.env.RESEND_API_KEY,
  contactToEmail: process.env.CONTACT_TO_EMAIL,
  contactFromEmail: process.env.CONTACT_FROM_EMAIL,
};

export function validateContactConfig() {
  return (
    Boolean(contactConfig.resendApiKey) &&
    Boolean(contactConfig.contactToEmail) &&
    Boolean(contactConfig.contactFromEmail)
  );
}
