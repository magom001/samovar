import { Injectable } from '@nestjs/common';
import { Readable } from 'stream';

export interface UploadResult {
  imageUrl: string;
  deleteUrl: string;
}

@Injectable()
export abstract class ImageUploadService {
  /**
   * Uploads image to the image hosting service and returns image URL
   * and delete URL.
   *
   * @param stream Readable stream.
   */
  abstract uploadImage(stream: Readable): Promise<UploadResult>;

  /**
   * Deletes image from the image hosting service.
   *
   * @param deleteUrl Delete URL from the upload result.
   */
  abstract deleteImage(deleteUrl: string): Promise<void>;
}
