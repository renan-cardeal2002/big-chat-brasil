import { Injectable } from '@nestjs/common';
import { DataSource, QueryRunner } from 'typeorm';

@Injectable()
export class ConexaoService {
  constructor(private dataSource: DataSource) {}

  async getConexao() {
    const queryRunner = this.dataSource.createQueryRunner();

    try {
      await queryRunner.connect();
    } catch (error) {
      await queryRunner.release();
    }

    return queryRunner;
  }

  async closeConexao(con: QueryRunner) {
    try {
      await con.release();
    } catch (error) {
      console.log('Não foi possível encerrar a conexão');
    }
  }
}
