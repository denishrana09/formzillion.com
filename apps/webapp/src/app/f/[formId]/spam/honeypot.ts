export default async function honeypot(reqBody: any) {
  let { _honeypot } = reqBody;

  if (!_honeypot) {
    console.log("Form submission success!");
    return true;
  }
  console.log("Form submission failed");
  return false;
}
