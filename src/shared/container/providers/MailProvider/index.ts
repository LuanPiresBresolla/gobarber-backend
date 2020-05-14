import { container } from 'tsyringe';

import mailConfig from '@config/mail';
import Ethereal from './implementations/EtherealMailProvider';
import AwsSes from './implementations/SESMailProvider';
import IMailProvider from './models/IMailProvider';

const providers = {
  ethereal: container.resolve(Ethereal),
  ses: container.resolve(AwsSes),
};

container.registerInstance<IMailProvider>(
  'MailProvider',
  providers[mailConfig.driver],
);
