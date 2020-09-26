import { LightningElement, api } from 'lwc';

export default class TesterInstructions extends LightningElement {
    @api details
    @api property
    @api parentId
    get isAvailable() {
        console.log(this.details[this.property] === this.parentId)
        return this.details[this.property] === this.parentId
    }
}