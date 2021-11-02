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
import {Repartidor} from '../models';
import {RepartidorRepository} from '../repositories';

export class RepartidorController {
  constructor(
    @repository(RepartidorRepository)
    public repartidorRepository : RepartidorRepository,
  ) {}

  @post('/repartidores')
  @response(200, {
    description: 'Repartidor model instance',
    content: {'application/json': {schema: getModelSchemaRef(Repartidor)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Repartidor, {
            title: 'NewRepartidor',
            exclude: ['id'],
          }),
        },
      },
    })
    repartidor: Omit<Repartidor, 'id'>,
  ): Promise<Repartidor> {
    return this.repartidorRepository.create(repartidor);
  }

  @get('/repartidores/count')
  @response(200, {
    description: 'Repartidor model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Repartidor) where?: Where<Repartidor>,
  ): Promise<Count> {
    return this.repartidorRepository.count(where);
  }

  @get('/repartidores')
  @response(200, {
    description: 'Array of Repartidor model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Repartidor, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Repartidor) filter?: Filter<Repartidor>,
  ): Promise<Repartidor[]> {
    return this.repartidorRepository.find(filter);
  }

  @patch('/repartidores')
  @response(200, {
    description: 'Repartidor PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Repartidor, {partial: true}),
        },
      },
    })
    repartidor: Repartidor,
    @param.where(Repartidor) where?: Where<Repartidor>,
  ): Promise<Count> {
    return this.repartidorRepository.updateAll(repartidor, where);
  }

  @get('/repartidores/{id}')
  @response(200, {
    description: 'Repartidor model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Repartidor, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(Repartidor, {exclude: 'where'}) filter?: FilterExcludingWhere<Repartidor>
  ): Promise<Repartidor> {
    return this.repartidorRepository.findById(id, filter);
  }

  @patch('/repartidores/{id}')
  @response(204, {
    description: 'Repartidor PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Repartidor, {partial: true}),
        },
      },
    })
    repartidor: Repartidor,
  ): Promise<void> {
    await this.repartidorRepository.updateById(id, repartidor);
  }

  @put('/repartidores/{id}')
  @response(204, {
    description: 'Repartidor PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() repartidor: Repartidor,
  ): Promise<void> {
    await this.repartidorRepository.replaceById(id, repartidor);
  }

  @del('/repartidores/{id}')
  @response(204, {
    description: 'Repartidor DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.repartidorRepository.deleteById(id);
  }
}
