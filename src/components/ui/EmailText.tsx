/** E-mail address that may wrap after the @ sign instead of mid-word. */
export function EmailText({ email }: { email: string }) {
  const [local, domain] = email.split('@')
  return (
    <>
      {local}@<wbr />
      {domain}
    </>
  )
}
