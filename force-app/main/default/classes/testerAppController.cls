public with sharing class testerAppController {
        @AuraEnabled(cacheable=true)
        public static returnWrapaper getData(){
            List<Feature__c> featurelist =  [select id,name from Feature__c];
            List<Profile__c> profilelist =  [select id,name, Feature__c from Profile__c where Feature__c in:featurelist];
            List<Object__c> objectList =  [select id,name, Profile__c from Object__c where Profile__c in:profilelist];
            List<Permission__c> permissionList =  [select id,name, Object__c, Permissions__c from Permission__c where Object__c in:objectList];
            List<Tester_Instruction__c> instructionList =  [select id,name, Permission__c from Tester_Instruction__c where Permission__c in:permissionList];
            returnWrapaper  varWrapper =  new returnWrapaper(featurelist, profilelist, objectList, permissionList, instructionList);
            return varWrapper;
        }

        public class returnWrapaper{
            @AuraEnabled
            public List<Feature__c> featurelist ;
            @AuraEnabled public List<Profile__c> profilelist ;
            @AuraEnabled public List<Object__c> objectList ;
            @AuraEnabled public List<Permission__c> permissionList ;
            @AuraEnabled public List<Tester_Instruction__c> instructionList;
            
            public returnWrapaper(List<Feature__c> featurelist,  List<Profile__c> profilelist,  List<Object__c> objectList,List<Permission__c> permissionList, List<Tester_Instruction__c> instructionList ){
                this.featurelist = featurelist;
                this.profilelist= profilelist;
                this.objectList = objectList;
                this.permissionList=permissionList;
                this.instructionList=instructionList;
            }
        }


    // @AuraEnabled(cacheable=true)
    // public static List<Contact> getInstructionsWithPermission() {
    //     return [SELECT Id, Name, Permission__r.Id, Permission__r.Name FROM Tester_Instruction__c];
    // }
}
