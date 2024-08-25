import { Injectable, Repository } from '../decorators';

@Repository()
@Injectable()
class UserRepository {
    public find(): string {
        return 'User data';
    }
}

export default UserRepository;
