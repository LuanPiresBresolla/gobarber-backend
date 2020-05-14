import FakeAppointmentsRepository from '../repositories/fakes/FakeAppointmentsRepository';
import ListProviderAppointmentsService from './ListProviderAppointmentsService';

let fakeAppointmentsRepository: FakeAppointmentsRepository;
let listProviderAppointmentsService: ListProviderAppointmentsService;

describe('ListProviderAppointmentsService', () => {
  beforeEach(() => {
    fakeAppointmentsRepository = new FakeAppointmentsRepository();

    listProviderAppointmentsService = new ListProviderAppointmentsService(
      fakeAppointmentsRepository,
    );
  });

  it('should be able to list the appointments on a specific day', async () => {
    const appoinment1 = await fakeAppointmentsRepository.create({
      provider_id: 'user',
      user_id: '123123',
      date: new Date(2020, 4, 20, 14, 0, 0),
    });

    const appoinment2 = await fakeAppointmentsRepository.create({
      provider_id: 'user',
      user_id: '123123',
      date: new Date(2020, 4, 20, 15, 0, 0),
    });

    const appointments = await listProviderAppointmentsService.execute({
      provider_id: 'user',
      year: 2020,
      month: 5,
      day: 20,
    });

    expect(appointments).toEqual([appoinment1, appoinment2]);
  });
});
