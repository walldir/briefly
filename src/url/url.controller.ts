import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
} from '@nestjs/common';
import { UrlService } from './url.service';
import { PaginationQueryDto } from 'src/common/dto/pagination-query.dto';

@Controller('url')
export class UrlController {
  constructor(private readonly urlService: UrlService) {}

  @Get()
  async findAll(@Query() paginationQuery: PaginationQueryDto) {
    return await this.urlService.findAll(paginationQuery);
  }

  @Get(':shortenedUrl')
  async find(@Param('shortenedUrl') shortenedUrl: string) {
    return await this.urlService.find(shortenedUrl);
  }

  @Post()
  async createShortedUrl(@Body() body: { url: string }) {
    return await this.urlService.create(body.url);
  }

  @Delete(':shortenedUrl')
  async deleteUrl(@Body() body: { url: string }) {
    return await this.urlService.delete(body.url);
  }
}
