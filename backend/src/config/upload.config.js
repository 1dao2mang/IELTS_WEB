// Upload Configuration
const uploadConfig = {
  maxFileSize: 10 * 1024 * 1024, // 10MB
  maxAudioFileSize: 50 * 1024 * 1024, // 50MB for speaking audio
  allowedAudioFormats: ["mp3", "wav", "ogg", "m4a", "webm"],
  allowedImageFormats: ["jpg", "jpeg", "png", "gif"],
  uploadDir: process.env.UPLOAD_DIR || "./uploads",
  useS3: process.env.USE_S3 === "true",
  s3: {
    bucket: process.env.S3_BUCKET || "",
    region: process.env.S3_REGION || "us-east-1",
    accessKeyId: process.env.S3_ACCESS_KEY_ID || "",
    secretAccessKey: process.env.S3_SECRET_ACCESS_KEY || "",
  },

  // Cloudflare R2 (S3-compatible)
  r2: {
    accountId: process.env.R2_ACCOUNT_ID || "",
    accessKeyId: process.env.R2_ACCESS_KEY_ID || "",
    secretAccessKey: process.env.R2_SECRET_ACCESS_KEY || "",
    bucketName: process.env.R2_BUCKET_NAME || "ielts-speaking-audio",
    publicUrl: process.env.R2_PUBLIC_URL || "",
    region: "auto", // R2 uses 'auto' region
  },
};

module.exports = { uploadConfig };
