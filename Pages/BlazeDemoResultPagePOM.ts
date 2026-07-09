
export default class ResultPagePOM {
     page: any;
     constructor(page: any) {
         this.page = page;
     }

     getFlightsButton(btnIndex:number) {
         return this.page.locator(`//tbody/tr[${btnIndex}]/td/input`);
     }
}