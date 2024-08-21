// storage-adapter-import-placeholder
import { postgresAdapter } from '@payloadcms/db-postgres'
// import { resendAdapter } from '@payloadcms/email-resend'
import { nodemailerAdapter } from '@payloadcms/email-nodemailer'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import path from 'path'
import { buildConfig } from 'payload'
import { fileURLToPath } from 'url'
import sharp from 'sharp'

import { Users } from './collections/Users'
import { Media } from './collections/Media'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
  },
  // email: resendAdapter({
  //   defaultFromAddress: process.env.EMAIL_ADDRESS || '',
  //   defaultFromName: process.env.EMAIL_NAME || '',
  //   apiKey: process.env.RESEND_API_KEY || '',
  // // }),
  email: nodemailerAdapter({
    defaultFromAddress: 'support@mail.flashbang.school',
    defaultFromName: 'Flashbang School',
    // Nodemailer transportOptions
    transportOptions: {
      host: process.env.SMTP_HOST,
      secure: true,
      port: 465,
      auth: {
        user: 'resend',
        pass: process.env.RESEND_API_KEY,
      },
    },
  }),
  collections: [Users, Media],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URI || '',
    },
  }),
  sharp,
  plugins: [
    // storage-adapter-placeholder
  ],
})
