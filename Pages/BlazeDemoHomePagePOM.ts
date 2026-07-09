
export default class HomePagePOM {
     page: any;
     constructor(page: any) {
         this.page = page;
     }

     getFromCityListbox() {
            return this.page.locator('select[name="fromPort"]');
     }

     getToCityListbox() {
            return this.page.locator('select[name="toPort"]');
     }
     
     getFindFlightsButton() {
            return this.page.getByRole('button', { name: 'Find Flights' });
     }

    }
