import { LightningElement, api } from 'lwc';

export default class TesterChildComponent extends LightningElement {
    @api details
    @api parentId
    @api property
    get isAvailable(){
        return this.details[this.property] === this.parentId
    }
    get className(){
        return this.property === 'Object__c' ? 'object_bg' : this.property === 'Profile__c' ? 'profile_bg' : this.property === 'Feature__c' ? 'feature_bg':''
    }
}