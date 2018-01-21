const buttonStyle =
  'background-color:#2e78ba;border-radius:3px;color:#ffffff;line-height:30px;height:30px;text-align:center;text-decoration:none;width:100px;';

module.exports = (name, numCards, url) => `<div style='color:#000000;'>
  <p>You have <span style='font-weight:bold;'>${numCards} cards</span> that need review. Review them now before you forget.</p>
  <div style='${buttonStyle}'>
  <a href='${url}' style='color:#ffffff;text-decoration:none;'>Review Now</a>
  </div>
  <p>Anyways that was fun. See you later!</p>
  <p>Your friend,</p>
  <p>Pensieve</p>
  </div>`;
