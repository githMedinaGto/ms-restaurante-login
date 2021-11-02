import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasOneRepositoryFactory, HasManyRepositoryFactory} from '@loopback/repository';
import {MysqlDataSource} from '../datasources';
import {Repartidor, RepartidorRelations, UsuarioRepartidor, Cliente} from '../models';
import {UsuarioRepartidorRepository} from './usuario-repartidor.repository';
import {ClienteRepository} from './cliente.repository';

export class RepartidorRepository extends DefaultCrudRepository<
  Repartidor,
  typeof Repartidor.prototype.id,
  RepartidorRelations
> {

  public readonly tiene_un: HasOneRepositoryFactory<UsuarioRepartidor, typeof Repartidor.prototype.id>;

  public readonly clientes: HasManyRepositoryFactory<Cliente, typeof Repartidor.prototype.id>;

  constructor(
    @inject('datasources.mysql') dataSource: MysqlDataSource, @repository.getter('UsuarioRepartidorRepository') protected usuarioRepartidorRepositoryGetter: Getter<UsuarioRepartidorRepository>, @repository.getter('ClienteRepository') protected clienteRepositoryGetter: Getter<ClienteRepository>,
  ) {
    super(Repartidor, dataSource);
    this.clientes = this.createHasManyRepositoryFactoryFor('clientes', clienteRepositoryGetter,);
    this.registerInclusionResolver('clientes', this.clientes.inclusionResolver);
    this.tiene_un = this.createHasOneRepositoryFactoryFor('tiene_un', usuarioRepartidorRepositoryGetter);
    this.registerInclusionResolver('tiene_un', this.tiene_un.inclusionResolver);
  }
}
