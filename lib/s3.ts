import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";

export const s3 = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  },
});

export async function uploadToS3(
  file: File,
  folder = "products"
): Promise<string> {
  const buffer = Buffer.from(await file.arrayBuffer());

  const fileName = `${folder}/${Date.now()}-${file.name}`;

  await s3.send(
    new PutObjectCommand({
        Bucket: process.env.AWS_BUCKET_NAME!,
        Key: fileName,
        Body: file,
        ContentType: file.type,
        ACL: "public-read", // 🔥 REQUIRED
    })
  );

  console.log("Uploading:", fileName);

  return `https://${process.env.AWS_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${fileName}`;
}
