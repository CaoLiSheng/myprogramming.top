export function insertStyleSheetRule ( ruleText: string ) {
  const sheets = document.styleSheets;

  if ( sheets.length === 0 ) {
    const style = document.createElement( 'style' );
    style.append( document.createTextNode( '' ) );
    document.head.append( style );
  }

  const sheet = sheets[sheets.length - 1];
  sheet.insertRule(
    ruleText,
    sheet.rules ? sheet.rules.length : sheet.cssRules.length,
  );
}
