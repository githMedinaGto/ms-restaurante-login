import {belongsTo, Entity, hasOne, model, property} from '@loopback/repository';
import {Repartidor} from './repartidor.model';
import {UsuarioCliente} from './usuario-cliente.model';

@model({
  settings: {
    foreignKeys: {
      fk_cliente_id_repartidor: {
        name: 'fk_cliente_id_repartidor',
        entity: 'Repartidor',
        entityKey: 'id',
        foreignKey: 'id_repartidor',
      }
    }
  }
})
export class Cliente extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id?: number;

  @property({
    type: 'string',
    required: true,
  })
  nombre: string;

  @property({
    type: 'string',
    required: true,
  })
  domicilio: string;

  @property({
    type: 'string',
    required: true,
  })
  celular: string;

  @property({
    type: 'string',
    required: true,
  })
  correo: string;

  @belongsTo(() => Repartidor, {name: 'dirijido_a'})
  id_repartidor: number;

  @hasOne(() => UsuarioCliente, {keyTo: 'id_cliente'})
  tiene_un: UsuarioCliente;

  constructor(data?: Partial<Cliente>) {
    super(data);
  }
}

export interface ClienteRelations {
  // describe navigational properties here
}

export type ClienteWithRelations = Cliente & ClienteRelations;
