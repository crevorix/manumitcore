/**
 * Member welcome email, sent through Resend's REST API.
 *
 * Called over HTTP rather than through the `resend` npm package so there is
 * no dependency to install or keep in step — the moment the two environment
 * variables below are set, mail starts sending.
 *
 *   RESEND_API_KEY=re_xxxxxxxx
 *   EMAIL_FROM="Manumit Open Network Membership <membership@manumitmefoundation.org>"
 *
 * EMAIL_FROM must use a domain verified in the Resend dashboard —
 * manumitmefoundation.org is verified (DKIM + SPF live). Until both are set
 * this logs instead of sending, so signup keeps working in local and preview
 * environments.
 */

export type EmailResult =
  | { sent: true }
  | { sent: false; reason: "not-configured" | "failed" };

function welcomeHtml(displayName: string, memberId: string) {
  const safeName = escapeHtml(displayName);
  return `<!doctype html>
<html>
  <body style="margin:0;padding:0;background:#0d0d0d;font-family:Helvetica,Arial,sans-serif;">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#0d0d0d;padding:32px 16px;">
      <tr>
        <td align="center">
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:520px;background:#141414;border:1px solid #2a2a2a;border-radius:16px;overflow:hidden;">
            <tr>
              <td style="padding:32px 32px 8px 32px;">
                <p style="margin:0 0 6px 0;color:#34d399;font-size:11px;letter-spacing:2px;text-transform:uppercase;font-weight:600;">Manumit Open Network</p>
                <h1 style="margin:0;color:#ffffff;font-size:24px;font-weight:700;">Welcome to Manumit Me</h1>
              </td>
            </tr>
            <tr>
              <td style="padding:16px 32px 0 32px;">
                <p style="margin:0 0 20px 0;color:#b8b8b8;font-size:15px;line-height:1.6;">
                  Hello ${safeName}, thank you for joining the Manumit Me Foundation. Your membership is now registered.
                </p>
              </td>
            </tr>
            <tr>
              <td style="padding:0 32px;">
                <table role="presentation" cellpadding="0" cellspacing="0" style="width:100%;background:#0d1f18;border:1px solid #1d5741;border-radius:12px;">
                  <tr>
                    <td style="padding:20px;text-align:center;">
                      <p style="margin:0 0 6px 0;color:#7a7a7a;font-size:10px;letter-spacing:2px;text-transform:uppercase;">Your Member ID</p>
                      <p style="margin:0;color:#6ee7b7;font-size:28px;font-weight:700;letter-spacing:4px;font-family:'Courier New',monospace;">${memberId}</p>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
            <tr>
              <td style="padding:20px 32px 32px 32px;">
                <p style="margin:0 0 16px 0;color:#b8b8b8;font-size:14px;line-height:1.6;">
                  Please keep this number safe — you will need it to identify yourself as a member.
                </p>
                <p style="margin:0;color:#7a7a7a;font-size:13px;line-height:1.6;">
                  Members reach Good Standing by making their $50 annual purchase of MANUMIT CORE.
                </p>
              </td>
            </tr>
            <tr>
              <td style="padding:20px 32px;border-top:1px solid #2a2a2a;">
                <p style="margin:0;color:#5a5a5a;font-size:12px;">Manumit Me Foundation</p>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>`;
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

/**
 * @param displayName the member's pseudonym — never their legal name, which
 *   is optional at signup and is not what they expect to be called.
 */
export async function sendMemberWelcomeEmail(
  email: string,
  displayName: string,
  memberId: string
): Promise<EmailResult> {
  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.EMAIL_FROM;

  if (!apiKey || !from) {
    console.log("[Email] Not configured — member ID not emailed:", {
      to: email,
      memberId,
    });
    return { sent: false, reason: "not-configured" };
  }

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from,
        to: [email],
        subject: "Welcome to Manumit Me — your Member ID",
        html: welcomeHtml(displayName, memberId),
      }),
    });

    if (!res.ok) {
      console.error("[Email] Resend rejected the message:", res.status, await res.text());
      return { sent: false, reason: "failed" };
    }

    return { sent: true };
  } catch (err) {
    // Never let a mail failure fail the signup — the member row is already
    // written by this point and the ID is shown on screen regardless.
    console.error("[Email] Send failed:", err);
    return { sent: false, reason: "failed" };
  }
}
