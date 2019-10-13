import nodemailer from 'nodemailer';
import { resolve } from 'path';

import exphbs from 'express-handlebars';
import nodemhbs from 'nodemailer-express-handlebars';

import mailconfig from '../config/mail';

class Mail {
  constructor() {
    const { host, port, secure, auth } = mailconfig;
    this.transporter = nodemailer.createTransport({
      host,
      port,
      secure,
      auth: auth.user ? auth : null,
    });
    this.configureTemplaptes();
  }

  configureTemplaptes() {
    const viewPath = resolve(__dirname, '..', 'app', 'views', 'emails');

    this.transporter.use(
      'compile',
      nodemhbs({
        viewEngine: exphbs.create({
          layoutsDir: resolve(viewPath, 'layouts'),
          partialsDir: resolve(viewPath, 'partials'),
          defaultLayout: 'default',
          extName: '.handlebars',
        }),
        viewPath,
        extName: '.handlebars',
      })
    );
  }

  sendMail(message) {
    return this.transporter.sendMail({
      ...mailconfig.default,
      ...message,
    });
  }
}

export default new Mail();
