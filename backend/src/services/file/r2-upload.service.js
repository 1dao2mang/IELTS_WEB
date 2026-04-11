// R2 Upload Service - Cloudflare R2 audio file uploads
const { S3Client, PutObjectCommand } = require("@aws-sdk/client-s3");
const { uploadConfig } = require("../../config/upload.config");

class R2UploadService {
  s3Client;

  constructor() {
    this.s3Client = new S3Client({
      region: "auto",
      endpoint: `https://${uploadConfig.r2.accountId}.r2.cloudflarestorage.com`,
      credentials: {
        accessKeyId: uploadConfig.r2.accessKeyId,
        secretAccessKey: uploadConfig.r2.secretAccessKey,
      },
    });
  }

  /**
   * Upload audio file to Cloudflare R2
   * @param file - Multer file object
   * @param userId - User ID for organizing files
   * @returns Public URL of uploaded file
   */
  async uploadAudio(file, userId) {
    // Generate unique filename
    const timestamp = Date.now();
    const randomStr = Math.random().toString(36).substring(7);
    const extension = file.originalname.split(".").pop();
    const key = `speaking/${userId}/${timestamp}-${randomStr}.${extension}`;

    // Upload to R2
    await this.s3Client.send(
      new PutObjectCommand({
        Bucket: uploadConfig.r2.bucketName,
        Key: key,
        Body: file.buffer,
        ContentType: file.mimetype,
      })
    );

    // Return public URL
    const publicUrl = uploadConfig.r2.publicUrl
      ? `${uploadConfig.r2.publicUrl}/${key}`
      : `https://${uploadConfig.r2.bucketName}.r2.dev/${key}`;

    return publicUrl;
  }
}

module.exports = { R2UploadService };
