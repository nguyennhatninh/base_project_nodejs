import { User } from '../entities/User';
import { UserRepository } from '../repositories/UserRepository';
import { BaseService } from './BaseService';
import { Service } from 'typedi';
import { InjectRepository } from 'typeorm-typedi-extensions';

@Service()
export class UserService extends BaseService<User, UserRepository> {
  constructor(@InjectRepository(User) repository: UserRepository) {
    super(repository);
  }

  findByFirstName(firstName: string): Promise<User | null> {
    return this.repository.findOne({ firstName: firstName });
  }

  getCustomerUsers(): Promise<User[]> {
    return this.repository.getCustomerUsers();
  }

  getServiceUsers(): Promise<User[]> {
    return this.repository.getServiceUser();
  }

  getRangeServiceUser(lat: number, long: number, range = 1000): Promise<User[]> {
    return this.repository.getRangeServices(lat, long, range);
  }

  findByUserName(username: string): Promise<User | null> {
    return this.repository.findOne({ usr: username });
  }

  findByEmail(email: string): Promise<User | null> {
    return this.repository.findOne({ email: email });
  }

  findByPhone(phone: string): Promise<User | null> {
    return this.repository.findOne({ phone: phone });
  }
}
