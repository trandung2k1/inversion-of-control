import { Injectable, Service } from '../decorators';
import UserRepository from './repositories';

@Service()
@Injectable()
export class UserService {
    constructor(private userRepository: UserRepository) {}

    public getUser(): string {
        return this.userRepository.find();
    }
}
