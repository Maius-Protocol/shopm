import prisma from "../../lib/prisma";

const verifyEmail = function (listProduct: any, orderId: any) {
  let data = "";
  let total = 0;
  listProduct.forEach(
    (p: { image: any; name: any; quantity: any; price: number }) => {
      total += p.price;
      data += `<tr>
                    <td width="20%">
                        <img src=${p.image} width="90">   
                    </td>
        
                    <td width="60%">
                        <span class="font-weight-bold">${p.name}</span>
                        <div class="product-qty">
                            <span class="d-block">Quantity:${p.quantity}</span>
        
                        </div>
                    </td>
                    <td width="20%">
                        <div class="text-right">
                            <span class="font-weight-bold">$${p.price}</span>
                        </div>
                    </td>
                </tr>`;
    }
  );
  const html = `
      <!DOCTYPE html>
      <html lang="en" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office">
      
      <head>
        <meta charset="utf-8">
        <meta name="x-apple-disable-message-reformatting">
        <meta http-equiv="x-ua-compatible" content="ie=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <meta name="format-detection" content="telephone=no, date=no, address=no, email=no">
        <title>Reset your Password</title>
        <link href="https://fonts.googleapis.com/css?family=Montserrat:ital,wght@0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,200;1,300;1,400;1,500;1,600;1,700" rel="stylesheet" media="screen">
        <style>
          .hover-underline:hover {
            text-decoration: underline !important;
          }
      
          @keyframes spin {
            to {
              transform: rotate(360deg);
            }
          }
      
          @keyframes ping {
      
            75%,
            100% {
              transform: scale(2);
              opacity: 0;
            }
          }
      
          @keyframes pulse {
            50% {
              opacity: .5;
            }
          }
      
          @keyframes bounce {
      
            0%,
            100% {
              transform: translateY(-25%);
              animation-timing-function: cubic-bezier(0.8, 0, 1, 1);
            }
      
            50% {
              transform: none;
              animation-timing-function: cubic-bezier(0, 0, 0.2, 1);
            }
          }
      
          .product-qty span {
            font-size: 12px;
            color: #dedbdb
          }
          
          .text-right {
            text-align: right;
          }
      
          @media (max-width: 600px) {
            .sm-px-24 {
              padding-left: 24px !important;
              padding-right: 24px !important;
            }
      
            .sm-py-32 {
              padding-top: 32px !important;
              padding-bottom: 32px !important;
            }
      
            .sm-w-full {
              width: 100% !important;
            }
          }
        </style>
      </head>
      
      <body style="margin: 0; padding: 0; width: 100%; word-break: break-word; -webkit-font-smoothing: antialiased; --bg-opacity: 1; background-color: #eceff1;">
        <div style="display: none;">A request to create your node-typescript-boilerplate account was received. Use this link to confirm your account and log in</div>
        <div role="article" aria-roledescription="email" aria-label="Reset your Password" lang="en">
          <table style="font-family: Montserrat, -apple-system, 'Segoe UI', sans-serif; width: 100%;" width="100%" cellpadding="0" cellspacing="0" role="presentation">
            <tr>
              <td align="center" style="--bg-opacity: 1; background-color: #eceff1; font-family: Montserrat, -apple-system, 'Segoe UI', sans-serif;">
                <table class="sm-w-full" style="font-family: 'Montserrat',Arial,sans-serif; width: 600px;" width="600" cellpadding="0" cellspacing="0" role="presentation">
                  <tr>
                    <td class="sm-py-32 sm-px-24" style="font-family: Montserrat, -apple-system, 'Segoe UI', sans-serif; padding: 48px; text-align: center;" align="center">
                      <a href="" style="border: 0; max-width: 100%; line-height: 100%; vertical-align: middle;">
                      </a>
                    </td>
                  </tr>
                  <tr>
                    <td align="center" class="sm-px-24" style="font-family: 'Montserrat',Arial,sans-serif;">
                      <table style="font-family: 'Montserrat',Arial,sans-serif; width: 100%;" width="100%" cellpadding="0" cellspacing="0" role="presentation">
                        <tr>
                          <td class="sm-px-24" style="--bg-opacity: 1; background-color: #ffffff;  border-radius: 4px; font-family: Montserrat, -apple-system, 'Segoe UI', sans-serif; font-size: 14px; line-height: 24px; padding: 48px; text-align: left; --text-opacity: 1; color: #626262;" align="left">
                            <h3>Your Order Confirmed!</h5>
      
                              <div class="font-weight-bold d-block mt-4">Gm ser</div>
                              <span>You order has been confirmed</span>
                              <table style="font-family: 'Montserrat',Arial,sans-serif;" cellpadding="0" cellspacing="0" role="presentation">
                                <tr>
                                  <td style="mso-padding-alt: 16px 24px; --bg-opacity: 1; background-color: #7367f0;  border-radius: 4px; font-family: Montserrat, -apple-system, 'Segoe UI', sans-serif;">
      
                                  </td>
                                </tr>
                              </table>
                              <table style="font-family: 'Montserrat',Arial,sans-serif; width: 100%;" width="100%" cellpadding="0" cellspacing="0" role="presentation">
                                <tr>
                                  <td style="font-family: 'Montserrat',Arial,sans-serif; padding-top: 32px; padding-bottom: 32px;">
                                    <div style="--bg-opacity: 1; background-color: #eceff1; height: 1px; line-height: 1px;">
                                      &zwnj;</div>
                                  </td>
                                </tr>
                              </table>
      
                              <table style="font-family: 'Montserrat',Arial,sans-serif; width: 100%;" width="100%" cellpadding="0" cellspacing="0" role="presentation">
                                <tr>
                                  <td>
                                    <div class="py-2">
      
                                      <div class="d-block text-muted">Order Date</div>
                                      <div>12 Jan,2018</div>
      
                                    </div>
                                  </td>
      
                                  <td>
                                    <div class="py-2">
                                      <div class="d-block text-muted">Order No</div>
                                      <div>${orderId}</div>
                                    </div>
                                  </td>
      
                                  <td>
                                    <div class="py-2">
      
                                      <div class="d-block text-muted">Payment</div>
                                      <div>Candy pay</div>
      
                                    </div </td>
                                </tr>
      
                              </table>
                              <table style="font-family: 'Montserrat',Arial,sans-serif; width: 100%;" width="100%" cellpadding="0" cellspacing="0" role="presentation">
                                <tr>
                                  <td style="font-family: 'Montserrat',Arial,sans-serif; padding-top: 32px; padding-bottom: 32px;">
                                    <div style="--bg-opacity: 1; background-color: #eceff1; height: 1px; line-height: 1px;">
                                      &zwnj;</div>
                                  </td>
                                </tr>
                              </table>
                              <table style="font-family: 'Montserrat',Arial,sans-serif; width: 100%;" width="100%" cellpadding="0" cellspacing="0" role="presentation">
                                <tbody class="list-item">
                                  ${data}
                                </tbody>
      
                              </table>
                              <table style="font-family: 'Montserrat',Arial,sans-serif; width: 100%;" width="100%" cellpadding="0" cellspacing="0" role="presentation">
                                <tr>
                                  <td style="font-family: 'Montserrat',Arial,sans-serif; padding-top: 32px; padding-bottom: 32px;">
                                    <div style="--bg-opacity: 1; background-color: #eceff1; height: 1px; line-height: 1px;">
                                      &zwnj;</div>
                                  </td>
                                </tr>
                              </table>
                              <table width="100%">
                                <tbody>
                                  <tr>
                                    <td width="50%">
                                      <div style="padding-right: 5px">
                                        Total
                                      </div>
                                    </td>
                                    <td width="50%">
                                      <div class="text-right">
                                        $${total}
                                      </div>
                                    </td>
                                  </tr>
      
                                </tbody>
      
                              </table>
      
                        </tr>
                        <tr>
                          <td style="font-family: 'Montserrat',Arial,sans-serif; height: 20px;" height="20"></td>
                        </tr>
                        <tr>
                          <td style="font-family: 'Montserrat',Arial,sans-serif; height: 16px;" height="16"></td>
                        </tr>
                      </table>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
          </table>
        </div>
      </body>
      
      </html>`;
  const text = `
        Verify Email, A request to create your node-typescript-boilerplate account was received.
        Use this OTP to confirm your account and log in`;
  return {
    html: html,
    text: text,
  };
};

export default verifyEmail;
