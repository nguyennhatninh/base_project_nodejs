import { EntityRepository, Repository } from 'typeorm';
import { Customer } from '../../bo/entities/one2one/Customer';
import { Service } from 'typedi';

@Service()
@EntityRepository(Customer)
export class CustomerRepository extends Repository<Customer> {}
