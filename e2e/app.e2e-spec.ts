import { SheettechPage } from './app.po';

describe('sheettech App', () => {
  let page: SheettechPage;

  beforeEach(() => {
    page = new SheettechPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
