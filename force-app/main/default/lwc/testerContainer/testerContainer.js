import { LightningElement, wire } from 'lwc';
import getData from '@salesforce/apex/testerAppController.getData'
const DEFAULT_OBJECT = { label: 'All', value: '' }
export default class TesterContainer extends LightningElement {
    actualResult
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
            this.actualResult = result
            this.formatedResult = result
            this.generatePicklists()
        }).catch(error=>{
            console.error(error)
        })
    }

    /********filtering******** */
    featureList=[]
    profileList=[]
    generatePicklists(){
        this.featureList = this.actualResult.featurelist.map(item => ({ label: item.Name, value: item.Id }))
        this.featureList = [DEFAULT_OBJECT, ...this.featureList]
    }
    generateProfilePickList(){
        let filteredProfile = this.actualResult.profilelist.filter(item => item.Feature__c === this.selectedFeature).map(profile => ({ label: profile.Name, value: profile.Id }))
        this.profileList = [DEFAULT_OBJECT, ...filteredProfile]
    }
    selectedFeature=''
    selectedProfile=''
    get disableProfile(){
        return !this.selectedFeature
    }
    handleChange(event) {
        const {name, value} = event.target
        if (name === "featurelist"){
            this.selectedFeature = value
            this.filterList('featurelist', value)
            this.generateProfilePickList()
            this.filterList('profilelist', '')
        }
        if (name === "profilelist") {
            this.selectedProfile = value
            let selectedProfile = this.actualResult.profilelist.find(item => item.Id === value)
            if (selectedProfile || value === '') {
                let result = value === '' ? this.selectedFeature : selectedProfile.Feature__c
                console.log(result)
                this.filterList('featurelist', result)
            }
            
            this.filterList('profilelist', value)
        }
    }


    filterList(property, value){
        let list = this.actualResult[property].filter(item => {
            if (value === '') {
                return true
            } else {
                return item.Id === value
            }
        })
        this.formatedResult = { ...this.formatedResult, [property]:list }
    }
}


