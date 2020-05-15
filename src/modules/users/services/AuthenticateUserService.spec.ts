import AppError from '@shared/errors/AppError';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';
import AuthenticateUserService from './AuthenticateUserService';

let fakeUsersRepository: FakeUsersRepository;
let fakeHashProvider: FakeHashProvider;
let authenticateUser: AuthenticateUserService;

describe('CreateAuthenticateToUser', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeHashProvider = new FakeHashProvider();

    authenticateUser = new AuthenticateUserService(
      fakeUsersRepository,
      fakeHashProvider,
    );
  });

  it('should be able to authenticate', async () => {
    const user = await fakeUsersRepository.create({
      name: 'Luan Bresolla',
      email: 'teste@email.com',
      password: '123456',
    });

    const response = await authenticateUser.execute({
      email: 'teste@email.com',
      password: '123456',
    });

    expect(response).toHaveProperty('token');
    expect(response.user).toEqual(user);
  });

  // Logando com usuário inexistente
  it('should not be able to authenticate with non existing user', async () => {
    await expect(
      authenticateUser.execute({
        email: 'teste@email.com',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  // Logando com senha errada
  it('should not be able to authenticate with wrong password', async () => {
    await fakeUsersRepository.create({
      name: 'Luan Bresolla',
      email: 'teste@email.com',
      password: '123456',
    });

    await expect(
      authenticateUser.execute({
        email: 'teste@email.com',
        password: 'wrong-password',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
