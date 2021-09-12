import Plugin from '@ckeditor/ckeditor5-core/src/plugin';

import {
    toWidget,
    viewToModelPositionOutsideModelElement
} from '@ckeditor/ckeditor5-widget/src/utils';
import Widget from '@ckeditor/ckeditor5-widget/src/widget';

import PlaceholderCommand from './placeholdercommand';   
import './theme/placeholder.css';

export default class PlaceholderEditing extends Plugin {
    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
    static get requires () {                                                    // ADDED
        // eslint-disable-next-line @typescript-eslint/no-unsafe-return
        return [ Widget ];
    }
    
    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
    init () {
        console.log ( 'PlaceholderEditing#init() got called' );

        this._defineSchema ();  
        this._defineConverters (); 
        
        this.editor.commands.add ( 'placeholder', new PlaceholderCommand ( this.editor ) );

        this.editor.editing.mapper.on (
            'viewToModelPosition',
            // eslint-disable-next-line @typescript-eslint/no-unsafe-return
            viewToModelPositionOutsideModelElement ( this.editor.model, viewElement => viewElement.hasClass ( 'placeholder' ) )
        );

        this.editor.config.define ( 'placeholderConfig', { 
            types: [ 'date', 'first name', 'surname' ]
        } );
    }

    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
    _defineSchema () {                                                          // ADDED
        const { schema } = this.editor.model;

        schema.register ( 'placeholder', {
            // Allow wherever text is allowed:
            allowWhere: '$text',

            // The placeholder will act as an inline node:
            isInline: true,

            // The inline widget is self-contained so it cannot be split by the caret and can be selected:
            isObject: true,

            // The inline widget can have the same attributes as text (for example linkHref, bold).
            allowAttributesOf: '$text',

            // The placeholder can have many types, like date, name, surname, etc:
            allowAttributes: [ 'name' ]
        } );
    }

    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
    _defineConverters () {                                                      // ADDED
        const { conversion } = this.editor;

        conversion.for ( 'upcast' ).elementToElement ( {
            view: {
                name   : 'span',
                classes: [ 'placeholder' ]
            },
            model: ( viewElement, { writer: modelWriter } ) => {
                // Extract the "name" from "{name}".
                const name = viewElement.getChild ( 0 ).data.slice ( 1, -1 );

                // eslint-disable-next-line @typescript-eslint/no-unsafe-return
                return modelWriter.createElement ( 'placeholder', { name } );
            }
        } );

        conversion.for ( 'editingDowncast' ).elementToElement ( {
            model: 'placeholder',
            view : ( modelItem, { writer: viewWriter } ) => {
                const widgetElement = createPlaceholderView ( modelItem, viewWriter );

                // Enable widget handling on a placeholder element inside the editing view.
                // eslint-disable-next-line @typescript-eslint/no-unsafe-return
                return toWidget ( widgetElement, viewWriter );
            }
        } );

        conversion.for ( 'dataDowncast' ).elementToElement ( {
            model: 'placeholder',
            // eslint-disable-next-line @typescript-eslint/no-unsafe-return
            view : ( modelItem, { writer: viewWriter } ) => createPlaceholderView ( modelItem, viewWriter )
        } );

        // Helper method for both downcast converters.
        // eslint-disable-next-line unicorn/consistent-function-scoping
        function createPlaceholderView ( modelItem, viewWriter ) {
            const name = modelItem.getAttribute ( 'name' );

            const placeholderView = viewWriter.createContainerElement ( 'span', {
                class: 'placeholder'
            }, {
                isAllowedInsideAttributeElement: true
            } );

            // Insert the placeholder name (as a text).
            const innerText = viewWriter.createText ( `{${  name  }}` );
            viewWriter.insert ( viewWriter.createPositionAt ( placeholderView, 0 ), innerText );

            // eslint-disable-next-line @typescript-eslint/no-unsafe-return
            return placeholderView;
        }
    }
}
