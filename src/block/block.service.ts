import { InjectRepository } from '@nestjs/typeorm';
import { Raw, Repository } from 'typeorm';
import { CreateBlockDto } from './dto/create-block.dto';
import { UpdateBlockDto } from './dto/update-block.dto';
import { Block } from './entities/block.entity';

export class BlockService {
  constructor(
    @InjectRepository(Block)
    private blockRepository: Repository<Block>,
  ) {}

  async create(createBlockDto: CreateBlockDto): Promise<Block> {
    const blockDTO = this.blockRepository.create(createBlockDto);
    return await this.blockRepository.save(blockDTO);
  }

  findLast() {
    return this.blockRepository.findOneBy({
      number: Raw('(select MAX(number) from blocks)'),
    });
  }

  findAll(): Promise<Block[]> {
    return this.blockRepository.find();
  }

  findOne(id: string): Promise<Block> {
    return this.blockRepository.findOne({
      where: {
        id,
      },
    });
  }

  async update(id: string, updateBlockDto: UpdateBlockDto): Promise<Block> {
    const blockDTO = this.blockRepository.create(updateBlockDto);
    await this.blockRepository.update(id, blockDTO);
    return this.findOne(id);
  }

  async incrementBlockValue(number) {
    const blockDTO = this.blockRepository.create({ number });
    return await this.blockRepository.save(blockDTO);
  }
}
