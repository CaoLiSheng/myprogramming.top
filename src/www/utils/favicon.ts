import favIcon from '@images/category-icon.svg';

const elem = document.createElement('link');
elem.rel = 'shortcut icon';
elem.type = 'image/x-icon';
elem.href = favIcon;

document.head.appendChild(elem);
