import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Url } from './entity/url';
import { Model } from 'mongoose';
import * as CRC from 'crc-32';
import { PaginationQueryDto } from 'src/common/dto/pagination-query.dto';

@Injectable()
export class UrlService {
  constructor(@InjectModel(Url.name) private readonly urlModel: Model<Url>) {}

  async findAll(paginationQuery: PaginationQueryDto) {
    const { limit, offset } = paginationQuery;
    return await this.urlModel.find().limit(limit).skip(offset).exec();
  }

  async find(shortenedUrl: string) {
    const url = await this.urlModel
      .findOne({ shortenedUrl: shortenedUrl })
      .exec();

    return url.url;
  }

  async create(url: string) {
    const createUrl = new this.urlModel({
      url,
      shortenedUrl: this.shrink(url),
    });
    await createUrl.save();
    return createUrl.shortenedUrl;
  }

  async delete(shortenedUrl: string) {
    return await this.urlModel
      .findOneAndDelete({ shortenedUrl: shortenedUrl })
      .exec();
  }

  private shrink(url: string) {
    return CRC.str(url).toString(16);
  }
}
