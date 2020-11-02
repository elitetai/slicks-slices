// can't use import syntax at the moment
const nodemailer = require('nodemailer');

function generateOrderEmail({ order, total }) {
  return `<div>
    <h2>Your Recent Order For ${total}</h2>
    <p>Please start walking over, we will have your order ready in the next 20 mins.</p>
    <ul>
    ${order
      .map(
        (item) => `<li>
    <img src="${item.thumbnail}" alt="${item.name}"/>
    ${item.size} ${item.name} - ${item.price}
    </li>`
      )
      .join('')}
    </ul>
    <p>Your total is <strong>${total}</strong> due at pickup</p>
    <style>
     ul {
        list-style: none;
     }
    </style>
  </div>`;
}

// create a transport for nodemailer
// can use Postmark, Sendgrid & etc, however, you can test it with a link called ethereal.email (created by nodemailer)
const transporter = nodemailer.createTransport({
  host: process.env.MAIL_HOST,
  port: 587,
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PAsS,
  },
});

function wait(ms = 0) {
  return new Promise((resolve, reject) => {
    setTimeout(resolve, ms);
  });
}

exports.handler = async (event, context) => {
  //   await wait(5000);
  const body = JSON.parse(event.body);
  // Check if they have filled out the honeypot
  if (body.nasiLemak) {
    return {
      statusCode: 400,
      body: JSON.stringify({
        message: 'Boop Beep Bop Zzzzzzst Goodbyee - ERR 1337',
      }),
    };
  }

  // Validate the data coming in is correct
  const requiredFields = ['email', 'name', 'order'];
  for (const field of requiredFields) {
    if (!body[field]) {
      return {
        statusCode: 400,
        body: JSON.stringify({
          message: `Ops You are missing the ${field} field`,
        }),
      };
    }
  }

  // make sure they actually have item in that order
  if (!body.order.length) {
    return {
      statusCode: 400,
      body: JSON.stringify({
        message: `Why would you order nothing?!`,
      }),
    };
  }

  // Send the email
  const info = await transporter.sendMail({
    from: 'Slicks Slices <slick@example.com>',
    to: `${body.name} <${body.email}>, orders@example.com`,
    subject: 'New Order!',
    html: generateOrderEmail({ order: body.order, total: body.total }),
  });
  return {
    statusCode: 200,
    body: JSON.stringify({ message: 'Success' }),
  };
};
