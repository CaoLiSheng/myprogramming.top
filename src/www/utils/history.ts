import localforage from 'localforage';

export default async function() {
  const parent = document.getElementById('main');
  if (!parent) return;

  //   console.log(0);
  const scrollTopHistory = await localforage.getItem<number>(location.pathname);
  parent.scrollTo(0, scrollTopHistory || 0);
  //   console.log(1);

  parent.addEventListener('scroll', () => {
    // console.log(parent.scrollTop);
    localforage.setItem(location.pathname, parent.scrollTop);
  });
  //   console.log(2);
}
