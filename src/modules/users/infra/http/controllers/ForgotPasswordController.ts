import { Response, Request } from 'express';
import { container } from 'tsyringe';

import SendForgotPasswordEmailService from '@modules/users/services/SendForgotPasswordEmailService';

class ForgotPasswordController {
  public async create(req: Request, res: Response): Promise<Response> {
    const { email } = req.body;

    const SendForgotPasswordEmail = container.resolve(
      SendForgotPasswordEmailService,
    );

    await SendForgotPasswordEmail.execute({ email });

    return res.status(204).json();
  }
}

export default ForgotPasswordController;
