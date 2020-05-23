import { Request, Response } from 'express';
import { container } from 'tsyringe';

import ListProviderDayAvailabilityService from '@modules/appointments/services/ListProviderDayAvailabilityService';

class ProviderDayAvailabilityController {
  public async index(req: Request, res: Response): Promise<Response> {
    const { month, year, day } = req.query;
    const { provider_id } = req.params;

    const listProviderDayAvailability = container.resolve(
      ListProviderDayAvailabilityService,
    );

    const availability = await listProviderDayAvailability.execute({
      provider_id,
      month: Number(month),
      year: Number(year),
      day: Number(day),
    });

    return res.json(availability);
  }
}

export default ProviderDayAvailabilityController;
