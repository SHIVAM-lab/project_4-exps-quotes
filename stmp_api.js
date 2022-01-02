const fun = require('./function');
async function sendEmail(x) {
    try {
        var data = {
            "source": "support@hellopeople.com.au",
            "destination": x.email,
            "reply_to":"john@excelplas.com",
            "subject": "Cost for Tensile Testing of HDPE Pipe Sample",
            "mail_body": `<strong>EMAIL TEMPLATE WOULD BE DISPLAYED HERE</strong>`
        };
        var options = {
            'method': 'POST',
            'url': 'https://kn5qdberrb.execute-api.ap-southeast-2.amazonaws.com/production/',
            json: data
        };
        var p = await fun.api_call(options);
        console.log(p);
        //return(p);
        delete data.mail_body;
        if(p.status==1){
        return ({
            'status':1,
            'message':'Mail Sent Successfully!',
            'error':null
        });
    }else{
        return ({
            'status':0,
            'message':'Mail Not Sent!',
            'error':'Cound Not send Email'
        });
    }
    } catch (error) {
        if (error) {
            console.log(error);
            //throw error;
            return({
                "status": 0,
                "message": "Failed to send a mail",
                "error": `MessageRejected: Email address is not verified. The following identities failed the check in region AP-SOUTHEAST-2: ${x.email}`
            });

        }
    }
}

module.exports = {
    sendEmail
}