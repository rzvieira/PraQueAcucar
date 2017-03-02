import { PrototypeMagazinePage } from './app.po';

describe('prototype-magazine App', function() {
  let page: PrototypeMagazinePage;

  beforeEach(() => {
    page = new PrototypeMagazinePage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
