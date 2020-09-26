import { LightningElement, api } from 'lwc';

export default class TesterProfileContainer extends LightningElement {
    @api details
    @api parentId
    @api property
    get showData(){
        console.log(JSON.stringify(this.details))
        return this.details[this.property] === this.parentId
    }
}