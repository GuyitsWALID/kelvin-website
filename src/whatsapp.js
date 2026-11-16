export const whatsappNumber = '97146081236'

export function whatsappEnquiryUrl({ name, email, company, message }) {
  const text = `Kelvin website enquiry\nName: ${name.trim()}\nBusiness email: ${email.trim()}\nCompany: ${company.trim()}\nEnquiry: ${message.trim()}`
  return `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(text)}`
}
