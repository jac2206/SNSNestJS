import { registerAs } from '@nestjs/config';

export default registerAs('AppConfiguration', () => {
  return {
    env: process.env.NODE_ENV,
    port: process.env.PORT || 3000,
    // corsOrigins: JSON.parse(process.env.CORS_ORIGINS),
    aws: {
      AWS_ACCESS_KEY_ID: process.env.AWS_ACCESS_KEY_ID,
      AWS_SECRET_ACCESS_KEY: process.env.AWS_SECRET_ACCESS_KEY,
      AWS_SESSION_TOKEN: process.env.AWS_SESSION_TOKEN,
      AWS_DEFAULT_REGION: process.env.AWS_DEFAULT_REGION,
      TOPIC_ARN: process.env.TOPIC_ARN,
    },
    axios: {
      timeOut: process.env.AXIOS_HTTP_TIMEOUT,
    },
  };
});
