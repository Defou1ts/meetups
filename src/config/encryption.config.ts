import { registerAs } from '@nestjs/config';

import type { ConfigType } from '@nestjs/config';

export const encryptionConfigRegister = registerAs('encryption', () => ({
	salt: Number(process.env.SALT),
}));

export type EncryptionConfig = ConfigType<typeof encryptionConfigRegister>;
