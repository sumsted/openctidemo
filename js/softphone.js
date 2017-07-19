var app = {
    inCallColor : "rgb(0, 180, 0)",

    outOfCallColor : "rgb(150, 150, 150)",

    start: function () {
        app.logit('Initializing adapter')

        app.getCookie('number1');
        app.getCookie('number2');
        app.getCookie('number3');

        $('#isInConsoleButton').click(app.isInConsole);
        $('#getCallCenterSettingsButton').click(app.getCallCenterSettings);
        $('#setSoftphoneHeightButton').click(app.setSoftphoneHeight);
        $('#getPageInfoButton').click(app.getPageInfo);
        $('#getSoftphoneLayoutButton').click(app.getSoftphoneLayout);
        $('#number1button').click(app.simulateCall);
        $('#number2button').click(app.simulateCall);
        $('#number3button').click(app.simulateCall);

        app.logit('Verifying Salesforce console');
        app.isInConsole();

    },

    simulateCall: function (e) {
        var button =  $(this);
        var icon = $(this).children('span');
        var cookieName = 'open-cti-' + $(button).parent().prev().attr('id');
        var phone = $(button).parent().prev().val();
        var color = $(icon).css("color");
        var inCall = color === app.inCallColor ? true : false;
        if (inCall) {
            app.logit("Hanging up phone");
            $(icon).css({"color": app.outOfCallColor});
        } else {
            if (phone !== '') {
                Cookies.set(cookieName, phone);
                $(icon).css({"color": app.inCallColor});
                app.logit("Simulating inbound call");
                app.logit("ANI: " + phone);
                app.logit("Searching for contact by phone");
                app.apexSearchContact(phone);
            } else {
                app.logit("No ANI identified")
            }
        }
    },

    apexSearchContact: function (val) {
        app.logit('runApex OpenCtiSearchContact(' + val + ')');
        sforce.interaction.runApex('OpenCtiSearchContact', 'getContacts', 'name=' + val, app.apexSearchContactCallback);
    },

    apexSearchContactCallback: function (response) {
        app.logit('apexSearchContactCallback()');
        if (response != undefined) {
            if (response.result) {
                app.logit(response.result);
                var contacts = JSON.parse(response.result);
                var page = '/'+contacts[0].Id;
                sforce.interaction.screenPop(page, true, app.screenPopCallback());
            } else {
                app.logit('Error apexSearchContactCallback: ' + response.error);
            }
        } else {
            app.logit('Error apexSearchContactCallback: no response');
        }
    },

    screenPopCallback: function (response) {
        if (response != undefined) {
            if (response.result) {
                app.logit(response.result);
            } else {
                app.logit('Error screenPop: ' + response.error);
            }
        } else {
            app.logit('screenPop() called');
        }
    },

    searchAndScreenPopCallback: function (response) {
        if (response != undefined) {

            if (response.result) {
                app.logit(response.result);
            } else {
                app.logit('Error searchAndScreenPop: ' + response.error);
            }
        } else {
            app.logit('searchAndScreenPopCallback() called');
        }
    },

    getCookie: function (id) {
        var cookieName = 'open-cti-' + id;
        var cookieValue = Cookies.get(cookieName);
        if(cookieValue){
            if(cookieValue !== ""){
                $('#' + id).val(cookieValue);
            }
        }
    },

    isInConsoleCallback: function (response) {
        if (response.result) {
            app.logit('Softphone is in Salesforce console.');
            $("#statusIcon").css({"color": "darkgreen"});
        } else {
            app.logit('Softphone is not in Salesforce console.');
        }
    },

    isInConsole: function () {
        app.logit("calling isInConsole()");
        sforce.interaction.isInConsole(app.isInConsoleCallback);
    },

    getCallCenterSettingsCallback: function (response) {
        if (response.result) {
            app.logit(response.result);
        } else {
            app.logit('Error retrieving call center settings' + response.error);
        }
    },

    getCallCenterSettings: function () {
        app.logit("calling getCallCenterSettings()");
        sforce.interaction.cti.getCallCenterSettings(app.getCallCenterSettingsCallback);
    },

    setSoftphoneHeightCallback: function (response) {
        if (response.result) {
            app.logit('Setting softphone height to 300 px was successful.');
        } else {
            app.logit('Setting softphone height failed.');
        }
    },

    setSoftphoneHeight: function () {
        app.logit("calling setSoftphoneHeight()");
        sforce.interaction.cti.setSoftphoneHeight(300, app.setSoftphoneHeightCallback);
    },

    getPageInfoCallback: function (response) {
        if (response.result) {
            app.logit(response.result);
        } else {
            app.logit('Error occurred while trying to get page info:' + response.error);
        }
    },
    getPageInfo: function () {
        app.logit("calling getPageInfo");
        sforce.interaction.getPageInfo(app.getPageInfoCallback);
    },

    getSoftphoneLayout: function (response) {
        if (response.result) {
            app.logit(response.result);
        } else {
            app.logit('Error occurred while trying to getSoftphoneLayout:' + response.error);
        }
    },
    getSoftphoneLayout: function () {
        app.logit("calling getSoftphoneLayout");
        sforce.interaction.cti.getSoftphoneLayout(app.getPageInfoCallback);
    },
    logit: function (entry) {
        $('#logArea').append(entry + "<br/>");
        $("#logArea")[0].scrollTop = $("#logArea")[0].scrollHeight;
    }
}


$(document).ready(function () {
    app.start();
});
