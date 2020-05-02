import { startOfHour } from 'date-fns';
import { getCustomRepository } from 'typeorm';

import Appointment from '../models/Appointment';
import AppointmentsRepository from '../repositories/AppointmentsRepository';
import AppError from '../errors/AppError';

interface Request {
  provider_id: string;
  date: Date;
}

class CreateAppointmentService {
  public async execute({ date, provider_id }: Request): Promise<Appointment> {
    // Esta variável tem acesso aos metodos que existem no arquivo de AppointmentsRepository.
    const appointmentsRepository = getCustomRepository(AppointmentsRepository);

    const appointmentDate = startOfHour(date);

    const findAppointmentInSameDate = await appointmentsRepository.findByDate(
      appointmentDate,
    );

    if (findAppointmentInSameDate) {
      throw new AppError('This appointment is already booked');
    }

    // Está função vai apenas criar o objeto, mas não vai inserir no banco.
    const appointment = appointmentsRepository.create({
      provider_id,
      date: appointmentDate,
    });

    // Está função vai ser responsável por inserir no banco de dados.
    await appointmentsRepository.save(appointment);

    return appointment;
  }
}

export default CreateAppointmentService;
