import { EntityRepository, Repository } from 'typeorm';
import { Service } from 'typedi';
import { ExUser } from '../../src/entities/ExUser';

@Service()
@EntityRepository(ExUser)
export class ExUserRepository extends Repository<ExUser> {}
