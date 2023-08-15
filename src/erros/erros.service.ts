import { InternalServerErrorException, Injectable } from '@nestjs/common';

@Injectable()
export class ErrosService {
  retornaErro(error) {
    throw new InternalServerErrorException(error);
  }
}
