import Plugin from '@ckeditor/ckeditor5-core/src/plugin';

import PlaceholderEditing from './placeholderediting';
import PlaceholderUI from './placeholderui';

export default class Placeholder extends Plugin {
    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
    static get requires () {
        return [ PlaceholderEditing, PlaceholderUI ];
    }
}
