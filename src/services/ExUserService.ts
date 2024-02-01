import { BaseService } from './BaseService';
import { Service } from 'typedi';
import { InjectRepository } from 'typeorm-typedi-extensions';
import { ExUser } from '../../src/entities/ExUser';
import { ExUserRepository } from '../repositories/ExUserRepository';

@Service()
export class ExUserService extends BaseService<ExUser, ExUserRepository> {
  constructor(@InjectRepository(ExUser) repository: ExUserRepository) {
    super(repository);
  }
}
