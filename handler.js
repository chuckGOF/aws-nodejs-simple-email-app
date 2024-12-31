const { SESClient, SendEmailCommand } =  require("@aws-sdk/client-ses");
const ses = new SESClient();


module.exports.createContact = async (event, context) => {
  console.log("Received:::==>", event);
  const {to, from, subject, message} = JSON.parse(event.body)
  console.log(to)
  console.log(from)
  console.log(subject)
  console.log(message)

  if (!to || !from || !subject || !message) {
    return {
      statusCode: 400,
      body: JSON.stringify({message: " to or from...are not set properly"})
    }
  }

  const params = {
    Destination: {
      ToAddresses: [to]
    },
    Message: {
      Body: {
        Text: {Data: message}
      },
      Subject: {Data: subject},
    },
    Source: from
  }
  try {
    const command = new SendEmailCommand(params)
    await ses.send(command);
    return {
      statusCode: 200,
      body: JSON.stringify({message: "email sent successfully!",
        success: true
      })
    }
  } catch (error) {
    console.log(error)
    return {
      statusCode: 400,
      body: JSON.stringify({message: "The email failed to send",
        success: false
      })
    }
  }
};
// module.exports = { createContact }
