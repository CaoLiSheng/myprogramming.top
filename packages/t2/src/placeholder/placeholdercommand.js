import Command from '@ckeditor/ckeditor5-core/src/command';

export default class PlaceholderCommand extends Command {
    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
    execute ( { value } ) {
        const { editor } = this;
        const { selection } = editor.model.document;

        editor.model.change ( writer => {
            // Create a <placeholder> elment with the "name" attribute (and all the selection attributes)...
            const placeholder = writer.createElement ( 'placeholder', {
                ...Object.fromEntries ( selection.getAttributes () ),
                name: value
            } );

            // ... and insert it into the document.
            editor.model.insertContent ( placeholder );

            // Put the selection on the inserted element.
            writer.setSelection ( placeholder, 'on' );
        } );
    }

    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
    refresh () {
        const { model } = this.editor;
        const { selection } = model.document;

        const isAllowed = model.schema.checkChild ( selection.focus.parent, 'placeholder' );

        this.isEnabled = isAllowed;
    }
}
