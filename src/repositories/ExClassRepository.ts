import { EntityRepository, Repository } from 'typeorm';
import { Service } from 'typedi';
import { Exclass } from '../entities/ExClass';

@Service()
@EntityRepository(Exclass)
export class ExClassRepository extends Repository<Exclass> {}
