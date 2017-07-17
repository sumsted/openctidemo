#OpenCTI Demo Salesforce Console Adapter

This is a softphone adapter for Salesforce Console apps.
 
It is based on the code found in the [Salesforce Open CTI Developer Guide](https://resources.docs.salesforce.com/sfdc/pdf/api_cti.pdf) and some hints I found in the [Salesforce 
Lightning console demo adapter](https://github.com/developerforce/open-cti-demo-adapter).

Steps to use:

    1. Update the interaction.js import in softphone.html to indicate your org's domain.
        
            <script src="https://<your salesforce domain>/support/api/40.0/interaction.js"></script>
                       
    2. Update src/callcenter.xml to indicate the domain where you are hosting the softphone content. This demo assumes it hosted outside of salesforce, though it could be used in a visualforce page.
        
            <item sortOrder="2" name="reqAdapterUrl" label="CTIAdapterURL">https://<your hosted domain>/softphone</item>
        
    3. Go into Salesforce setup/developer console and create a new class called OpenCtiSearchContact.cls. Replace the editor contents with the contents from the file OpenCTISearchContact.cls.
    
    4. Then complete the setup configuration in salesforce for your call center.
     
        a. Import the callcenter.xml file.
        b. Assign your users to the new call center. 
        c. Assign the OpenCTIDemo component to your console app.


    