import Plugin from '@ckeditor/ckeditor5-core/src/plugin';

import ButtonView from '@ckeditor/ckeditor5-ui/src/button/buttonview';

export default class DataUI extends Plugin {
    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
    init () {
        console.log ( 'DataUI#init() got called.' );

        const { editor } = this;
        const { t } = editor;

        // The "simpleBox" button must be registered among the UI components of the editor
        // to be displayed in the toolbar.
        // eslint-disable-next-line unicorn/consistent-destructuring
        editor.ui.componentFactory.add ( 'showData', locale => {
            // The state of the button will be bound to the widget command.
            // eslint-disable-next-line unicorn/consistent-destructuring
            // const command = editor.commands.get ( 'insertSimpleBox' );

            // The button will be an instance of ButtonView.
            const buttonView = new ButtonView ( locale );

            buttonView.set ( {
                // The t() function helps localize the editor. All strings enclosed in t() can be
                // translated and change when the language of the editor changes.
                label   : t ( 'Show Data' ),
                withText: true,
                tooltip : true
            } );

            // Bind the state of the button to the command.
            // buttonView.bind ( 'isOn', 'isEnabled' ).to ( command, 'value', 'isEnabled' );

            // Execute the command when the button is clicked (executed).
            this.listenTo ( buttonView, 'execute', () => {
                // eslint-disable-next-line no-alert
                alert ( editor.getData () );
            } );

            // eslint-disable-next-line @typescript-eslint/no-unsafe-return
            return buttonView;
        } );

        // eslint-disable-next-line unicorn/consistent-destructuring
        this.listenTo ( editor.editing.view.document, 'copy', ( _info_, data ) => {
            console.log ( data.dataTransfer.getData () );
        } );
    }
}
