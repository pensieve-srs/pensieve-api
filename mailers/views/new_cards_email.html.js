module.exports = (name, numCards, url) => `
<center>
  <table align="center" border="0" cellpadding="0" cellspacing="0" height="100%" width="100%" style="border-collapse:collapse;height:100%;margin:0;padding:0;width:100%;background-color:#fafafa">
    <tbody><tr>
      <td align="center" valign="top" style="height:100%;margin:0;padding:10px;width:100%;border-top:0">
        <table border="0" cellpadding="0" cellspacing="0" width="100%" style="border-collapse:collapse;border:0;max-width:600px!important">
          <tbody>
        <tr>
          <td valign="top" style="background:#ffffff none no-repeat center/cover;background-color:#ffffff;background-image:none;background-repeat:no-repeat;background-position:center;background-size:cover;border-top:0;border-bottom:0;padding-top:9px;padding-bottom:0"></td>
        </tr>
        <tr>
          <td valign="top"  style="background:#ffffff none no-repeat center/cover;background-color:#ffffff;background-image:none;background-repeat:no-repeat;background-position:center;background-size:cover;border-top:0;border-bottom:2px solid #eaeaea;padding-top:0;padding-bottom:9px"><table border="0" cellpadding="0" cellspacing="0" width="100%" style="min-width:100%;border-collapse:collapse">
          <tbody >
            <tr>
              <td valign="top"  style="padding-top:9px">
                <table align="left" border="0" cellpadding="0" cellspacing="0" style="max-width:100%;min-width:100%;border-collapse:collapse" width="100%" >
                  <tbody><tr>

                    <td valign="top"  style="padding-top:0;padding-right:18px;padding-bottom:9px;padding-left:18px;word-break:break-word;color:#202020;font-family:Helvetica;font-size:16px;line-height:150%;text-align:left">

                      <h1 style="display:block;margin:0;padding:0;color:#202020;font-family:Helvetica;font-size:18px;font-style:normal;font-weight:bold;line-height:125%;letter-spacing:normal;text-align:left">Hi ${name},</h1>

                      <p style="margin:10px 0;padding:0;color:#202020;font-family:Helvetica;font-size:16px;line-height:150%;text-align:left">You have created <strong>${numCards} cards </strong> today. Check them out before you forget them.</p>

                      <table border="0" cellpadding="0" cellspacing="0" width="100%" style="min-width:100%;border-collapse:collapse">
                        <tbody>
                          <tr>
                            <td style="padding-top:0;padding-right:18px;padding-bottom:18px;" valign="top" align="left">
                              <table border="0" cellpadding="0" cellspacing="0" style="border-collapse:separate!important;border-radius:3px;background-color:#1574fb">
                                <tbody>
                                  <tr>
                                    <td align="center" valign="middle" style="font-family:Arial;font-size:16px;padding:15px">
                                      <a title="Review Now" href="${url}" style="font-weight:bold;letter-spacing:normal;line-height:100%;text-align:center;text-decoration:none;color:#ffffff;display:block">Review Now</a>
                                    </td>
                                  </tr>
                                </tbody>
                              </table>
                            </td>
                          </tr>
                        </tbody>
                      </table>

                      <p style="margin:10px 0;padding:0;color:#202020;font-family:Helvetica;font-size:16px;line-height:150%;text-align:left">Anyways that was fun. See you later!</p>

                      <p style="margin:10px 0;padding:0;color:#202020;font-family:Helvetica;font-size:16px;line-height:150%;text-align:left">Your friend,</p>

                      <p style="margin:10px 0;padding:0;color:#202020;font-family:Helvetica;font-size:16px;line-height:150%;text-align:left">Pensieve,</p>

                    </td>
                  </tr>
                </tbody></table>
              </td>
            </tr>
          </tbody>
        </table></td>
      </tr>
      <tr>
        <td valign="top" style="background:#fafafa none no-repeat center/cover;background-color:#fafafa;background-image:none;background-repeat:no-repeat;background-position:center;background-size:cover;border-top:0;border-bottom:0;padding-top:9px;padding-bottom:9px"><table border="0" cellpadding="0" cellspacing="0" width="100%" style="min-width:100%;border-collapse:collapse">
      </table><table border="0" cellpadding="0" cellspacing="0" width="100%" style="min-width:100%;border-collapse:collapse;table-layout:fixed!important">
      <tbody>
        <tr>
          <td style="min-width:100%;padding:18px 18px 25px">
            <table border="0" cellpadding="0" cellspacing="0" width="100%" style="min-width:100%;border-top:2px solid #eeeeee;border-collapse:collapse">
              <tbody><tr>
                <td>
                  <span></span>
                </td>
              </tr>
            </tbody></table>
          </td>
        </tr>
      </tbody>
    </table><table border="0" cellpadding="0" cellspacing="0" width="100%" style="min-width:100%;border-collapse:collapse">
    <tbody>
      <tr>
        <td valign="top" style="padding-top:9px">
          <table align="left" border="0" cellpadding="0" cellspacing="0" style="max-width:100%;min-width:100%;border-collapse:collapse" width="100%">
            <tbody><tr>

              <td valign="top" style="padding-top:0;padding-right:18px;padding-bottom:9px;padding-left:18px;word-break:break-word;color:#656565;font-family:Helvetica;font-size:12px;line-height:150%;text-align:center">

                <em>Copyright © 2018 Pensieve SRS, All rights reserved.</em>
                <br>

                  You are subscribed to this notification based on your preferences
                  <br>
                    <br>
                      <br>
                        Want to change how you receive these emails?<br>
                        You can <a href="https://www.pensieve.space/settings#notifications" style="color:#656565;font-weight:normal;text-decoration:underline">update your preferences and unsubscribe here</a>.
                        <br>
                          <br>
                          </td>
                        </tr>
                      </tbody></table>
                    </td>
                  </tr>
                </tbody>
              </table></td>
            </tr>
          </tbody></table>
        </td>
      </tr>
    </tbody></table>
  </center>
  `;
