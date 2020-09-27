import { LightningElement, api } from 'lwc';
const ACCESS = ['Object Name', 'Create', 'Read', 'Edit', 'Delete']
export default class TesterPermissionList extends LightningElement {
    result
    eachPermission 
    @api objectName
    @api property
    @api parentId
    // @api details 
    // get formattedPermissions(){
    //     console.log(JSON.stringify(this.details))
    //     return "hello"
    // }
    get isAvailable(){
        // console.log(this.property)
        // console.log(this.parentId)
        // console.log(this.eachPermission)
        return this.parentId && this.property && this.eachPermission && this.eachPermission[this.property] === this.parentId ? true :false
    }
    get details(){
        return this.result
    }
    @api set details(data){
        // console.log(JSON.stringify(data))
        this.eachPermission = data
        let permissions = data &&  data.Permissions__c && data.Permissions__c.split(';') ? data.Permissions__c.split(';') : []
        this.result = ACCESS.map(item=>{
            return item === 'Object Name' ? { "label": item, "value": this.objectName } : permissions.includes(item) ? { "label": item, "value": 'Yes' } : { "label": item, "value":'No' }
        })
        // console.log(this.result)
    }

    renderedCallback(){
        
    }

    
}