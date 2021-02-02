export function insertStyleSheetRule(ruleText: string) {
  let sheets = document.styleSheets;

  if (sheets.length == 0) {
    let style = document.createElement('style');
    style.appendChild(document.createTextNode(''));
    document.head.appendChild(style);
  }

  let sheet = sheets[sheets.length - 1];
  sheet.insertRule(
    ruleText,
    sheet.rules ? sheet.rules.length : sheet.cssRules.length
  );
}
