interface IInfo {
  name: string;
  id: number;
  price: number;
  size: string;
  img: string;
}

export let info: Array<IInfo> = [
  {
    name: 'shirtblue',
    id: 1,
    price: 100,
    size: 'small',
    img: 'https://www.zeuscalabria.it/31495-large_default/maglia-crotone-2021-con-patch-serie-a-home-personalizzata-giocatore.jpg',
  },
  {
    name: 'shortyellow',
    id: 2,
    price: 75,
    size: 'medium',
    img: 'https://www.zeuscalabria.it/32767-large_default/pantaloncino-fc-crotone-away-20202021.jpg',
  },
  {
    name: 'mask',
    id: 3,
    price: 30,
    size: 'small',
    img: 'https://www.zeuscalabria.it/30764-large_default/zeus-mascherina-ufficiale-fc-crotone-calcio-20202021.jpg',
  },
  {
    name: 'cap',
    id: 4,
    price: 45,
    size: 'large',
    img: 'https://www.zeuscalabria.it/30652-large_default/cappello-ufficiale-fc-crotone-logo.jpg',
  },
  {
    name: 'bag',
    id: 5,
    price: 60,
    size: 'small',
    img: 'https://www.zeuscalabria.it/24792-large_default/sacca-da-spalla-fc-crotone-20172018.jpg',
  },
  {
    name: 'jacket',
    id: 6,
    price: 80,
    size: 'medium',
    img: 'https://www.zeuscalabria.it/24794-large_default/smanicato-fc-crotone.jpg',
  },
  {
    name: 'socks',
    id: 7,
    price: 20,
    size: 'large',
    img: 'https://www.zeuscalabria.it/24447-large_default/calzettone-fc-crotone-rossoblu-20192020.jpg',
  },
];
