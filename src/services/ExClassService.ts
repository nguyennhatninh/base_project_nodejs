import { BaseService } from './BaseService';
import { Service } from 'typedi';
import { InjectRepository } from 'typeorm-typedi-extensions';
import { Exclass } from '../entities/ExClass';
import { ExClassRepository } from '../repositories/ExClassRepository';

@Service()
export class ExClassService extends BaseService<Exclass, ExClassRepository> {
  constructor(@InjectRepository(Exclass) repository: ExClassRepository) {
    super(repository);
  }
}
