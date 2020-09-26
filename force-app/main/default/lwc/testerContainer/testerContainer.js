import { LightningElement, wire } from 'lwc';
import getData from '@salesforce/apex/testerAppController.getData'
export default class TesterContainer extends LightningElement {
    formatedResult

    connectedCallback(){
        this.fetchApi()
    }

    checkLength(property){
        return this.formatedResult && this.formatedResult[property] && this.formatedResult[property].length
    }
    get isFeatureListAvailable(){
        return this.checkLength("featurelist")
    }

    get isProfileListAvailable(){
        return this.checkLength("profilelist") 
    }
    get isObjectListAvailable(){
        return this.checkLength("objectList") 
    }
    get isPermissionListAvailable(){
        return this.checkLength("permissionList") 
    }

    get isInstructionListAvailable() {
        return this.checkLength("instructionList")
    }
    fetchApi(){
        getData().then(result=>{
            console.log(result)
            this.formatedResult = result
        }).catch(error=>{
            console.error(error)
        })
    }
}


