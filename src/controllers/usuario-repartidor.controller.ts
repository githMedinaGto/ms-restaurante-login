import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getModelSchemaRef,
  patch,
  put,
  del,
  requestBody,
  response,
} from '@loopback/rest';
import {UsuarioRepartidor} from '../models';
import {UsuarioRepartidorRepository} from '../repositories';

export class UsuarioRepartidorController {
  constructor(
    @repository(UsuarioRepartidorRepository)
    public usuarioRepartidorRepository : UsuarioRepartidorRepository,
  ) {}

  @post('/usuario-repartidores')
  @response(200, {
    description: 'UsuarioRepartidor model instance',
    content: {'application/json': {schema: getModelSchemaRef(UsuarioRepartidor)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(UsuarioRepartidor, {
            title: 'NewUsuarioRepartidor',
            exclude: ['id'],
          }),
        },
      },
    })
    usuarioRepartidor: Omit<UsuarioRepartidor, 'id'>,
  ): Promise<UsuarioRepartidor> {
    return this.usuarioRepartidorRepository.create(usuarioRepartidor);
  }

  @get('/usuario-repartidores/count')
  @response(200, {
    description: 'UsuarioRepartidor model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(UsuarioRepartidor) where?: Where<UsuarioRepartidor>,
  ): Promise<Count> {
    return this.usuarioRepartidorRepository.count(where);
  }

  @get('/usuario-repartidores')
  @response(200, {
    description: 'Array of UsuarioRepartidor model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(UsuarioRepartidor, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(UsuarioRepartidor) filter?: Filter<UsuarioRepartidor>,
  ): Promise<UsuarioRepartidor[]> {
    return this.usuarioRepartidorRepository.find(filter);
  }

  @patch('/usuario-repartidores')
  @response(200, {
    description: 'UsuarioRepartidor PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(UsuarioRepartidor, {partial: true}),
        },
      },
    })
    usuarioRepartidor: UsuarioRepartidor,
    @param.where(UsuarioRepartidor) where?: Where<UsuarioRepartidor>,
  ): Promise<Count> {
    return this.usuarioRepartidorRepository.updateAll(usuarioRepartidor, where);
  }

  @get('/usuario-repartidores/{id}')
  @response(200, {
    description: 'UsuarioRepartidor model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(UsuarioRepartidor, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(UsuarioRepartidor, {exclude: 'where'}) filter?: FilterExcludingWhere<UsuarioRepartidor>
  ): Promise<UsuarioRepartidor> {
    return this.usuarioRepartidorRepository.findById(id, filter);
  }

  @patch('/usuario-repartidores/{id}')
  @response(204, {
    description: 'UsuarioRepartidor PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(UsuarioRepartidor, {partial: true}),
        },
      },
    })
    usuarioRepartidor: UsuarioRepartidor,
  ): Promise<void> {
    await this.usuarioRepartidorRepository.updateById(id, usuarioRepartidor);
  }

  @put('/usuario-repartidores/{id}')
  @response(204, {
    description: 'UsuarioRepartidor PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() usuarioRepartidor: UsuarioRepartidor,
  ): Promise<void> {
    await this.usuarioRepartidorRepository.replaceById(id, usuarioRepartidor);
  }

  @del('/usuario-repartidores/{id}')
  @response(204, {
    description: 'UsuarioRepartidor DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.usuarioRepartidorRepository.deleteById(id);
  }
}
