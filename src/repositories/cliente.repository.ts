import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor, HasOneRepositoryFactory} from '@loopback/repository';
import {MysqlDataSource} from '../datasources';
import {Cliente, ClienteRelations, Repartidor, UsuarioCliente} from '../models';
import {RepartidorRepository} from './repartidor.repository';
import {UsuarioClienteRepository} from './usuario-cliente.repository';

export class ClienteRepository extends DefaultCrudRepository<
  Cliente,
  typeof Cliente.prototype.id,
  ClienteRelations
> {

  public readonly dirijido_a: BelongsToAccessor<Repartidor, typeof Cliente.prototype.id>;

  public readonly tiene_un: HasOneRepositoryFactory<UsuarioCliente, typeof Cliente.prototype.id>;

  constructor(
    @inject('datasources.mysql') dataSource: MysqlDataSource, @repository.getter('RepartidorRepository') protected repartidorRepositoryGetter: Getter<RepartidorRepository>, @repository.getter('UsuarioClienteRepository') protected usuarioClienteRepositoryGetter: Getter<UsuarioClienteRepository>,
  ) {
    super(Cliente, dataSource);
    this.tiene_un = this.createHasOneRepositoryFactoryFor('tiene_un', usuarioClienteRepositoryGetter);
    this.registerInclusionResolver('tiene_un', this.tiene_un.inclusionResolver);
    this.dirijido_a = this.createBelongsToAccessorFor('dirijido_a', repartidorRepositoryGetter,);
    this.registerInclusionResolver('dirijido_a', this.dirijido_a.inclusionResolver);
  }
}
