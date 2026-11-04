export const signUP_Temp = (name,link) => {
return `
    <!doctype html>
<html lang="en">
<head>
 <meta charset="utf-8">
  <meta name="viewport" content="width=device-width">
  <title>Notification</title>
</head>
<body style="margin:0;padding:0;background:#f4f4f5;">
  <table width="100%" cellpadding="0" cellspacing="0" role="presentation">
    <tr>
      <td align="center" style="padding:24px 12px;">
        <table width="600" cellpadding="0" cellspacing="0" role="presentation" style="max-width:600px;background:#ffffff;border-radius:8px;overflow:hidden;">
          <!-- Header -->
          <tr>
            <td style="padding:20px 24px;border-bottom:1px solid #eee;text-align:left;">
              <img src="{{LOGO_URL}}" alt="{{BRAND_NAME}}" width="120" style="display:block;border:0;outline:none;text-decoration:none;">
            </td>
          </tr>

          <!-- Body -->
          <tr>
            <td style="padding:28px 24px 18px 24px;font-family:Arial,Helvetica,sans-serif;color:#111;">
              <h1 style="margin:0 0 12px 0;font-size:20px;font-weight:700;">Hello in Activation Account</h1>
              <p style="margin:0 0 16px 0;line-height:1.5;color:#555;font-size:15px;">
                Sending email service
              </p>

              <table role="presentation" cellpadding="0" cellspacing="0" style="margin-top:18px;">
                <tr>
                  <td align="left">
                    <button  style="display:inline-block;padding:10px 16px;background:#0066ff;color:#fff;text-decoration:none;border-radius:6px;font-weight:600;font-size:14px;">
                      <a href="${link}">active your account</a>
                    </button>
                  </td>
                </tr>
              </table>
                    <p>Hello ${name}</p>
              <p style="margin:18px 0 0 0;font-size:13px;color:#888;">If you didn't expect this, please contact <a href="mailto:{{SUPPORT_EMAIL}}" style="color:#0066ff;text-decoration:none;">{{SUPPORT_EMAIL}}</a>.</p>
        <a href="${link}" style="color:#888;text-decoration:underline;">Unsubscribe</a>

            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding:18px 24px;background:#fafafa;border-top:1px solid #eee;color:#888;font-size:12px;text-align:center;font-family:Arial,Helvetica,sans-serif;">
              © {{YEAR}} {{BRAND_NAME}} — {{BRAND_TAGLINE}}<br>
              <a href="{{UNSUBSCRIBE_URL}}" style="color:#888;text-decoration:underline;">Unsubscribe</a>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
    `;
};
