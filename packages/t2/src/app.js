import ClassicEditor from '@ckeditor/ckeditor5-editor-classic/src/classiceditor';
import Essentials from '@ckeditor/ckeditor5-essentials/src/essentials';
import Paragraph from '@ckeditor/ckeditor5-paragraph/src/paragraph';
import Heading from '@ckeditor/ckeditor5-heading/src/heading';
import List from '@ckeditor/ckeditor5-list/src/list';
import Bold from '@ckeditor/ckeditor5-basic-styles/src/bold';
import Italic from '@ckeditor/ckeditor5-basic-styles/src/italic';

import CKEditorInspector from '@ckeditor/ckeditor5-inspector';
import Placeholder from './placeholder/placeholder';
import Data from './data/dataui';


ClassicEditor
    .create ( document.querySelector ( '#editor' ), {
        plugins          : [ Essentials, Paragraph, Heading, List, Bold, Italic, Placeholder, Data ],
        toolbar          : [ 'heading', 'bold', 'italic', 'numberedList', 'bulletedList', '|', 'placeholder', '|', 'showData' ],
        placeholderConfig: {
            types: [ 'date', 'color', 'first name', 'surname' ]         
        },
    } )
    .then ( editor => {
        console.log ( 'Editor was initialized', editor );

        CKEditorInspector.attach ( 'editor', editor );

        // Expose for playing in the console.
        window.editor = editor;

        // eslint-disable-next-line @typescript-eslint/no-unsafe-return
        return editor;
    } )
    .catch ( error => {
        console.error ( error.stack );
    } );
