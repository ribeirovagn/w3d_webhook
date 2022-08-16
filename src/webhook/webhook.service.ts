import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BlockService } from 'src/block/block.service';
import { Repository } from 'typeorm';
import { CreateWebhookDto } from './dto/create-webhook.dto';
import { UpdateWebhookDto } from './dto/update-webhook.dto';
import { Webhook } from './entities/webhook.entity';

@Injectable()
export class WebhookService {
  private block: BlockService;
  constructor(
    @InjectRepository(Webhook)
    private webHookRepository: Repository<Webhook>,
  ) {}

  async create(createWebhookDto: CreateWebhookDto): Promise<Webhook> {
    const webhook = this.webHookRepository.create(createWebhookDto);
    return await this.webHookRepository.save(webhook);
  }

  async findAll(): Promise<Webhook[]> {
    return await this.webHookRepository.find();
  }

  async findOne(id: string): Promise<Webhook> {
    return this.webHookRepository.findOne({
      where: {
        id,
      },
    });
  }

  async update(
    id: string,
    updateWebhookDto: UpdateWebhookDto,
  ): Promise<Webhook> {
    const webhook = this.webHookRepository.create(updateWebhookDto);
    await this.webHookRepository.update(id, webhook);
    return await this.findOne(id);
  }

  remove(id: string) {
    return `This action removes a #${id} webhook`;
  }
}
