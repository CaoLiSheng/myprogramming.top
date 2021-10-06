import 'commons/src/www/utils/design';
import 'commons/src/www/plugins/sprites/ring';
import 'commons/src/www/plugins/knock';
import 'commons/src/www/plugins/hotkeys';
import 'commons/src/www/plugins/print';
import 'commons/src/www/plugins/history';

declare let __resource_dir__: string;

new FontFace ( 'HanYi-QinChuanFeiYing', `url(${ __resource_dir__ }reserved/fonts/hanyi-qinchuanfeiying.ttf)` )
    .load ()
    .then ( ( value: FontFace ) => {
        document.fonts.add ( value );
        return null;
    } )
    .catch ( ( error: any ) => console.log ( error ) );

void import ( './index' );
// import './index';
