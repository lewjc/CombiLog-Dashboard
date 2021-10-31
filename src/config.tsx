export default interface Config {
  aggregatorApiUrl: string;
  aggregatorSocketUrl: string;
  archiveUrl: string;
}

export interface EnvironmentConfig {
  AGGREGATOR_URL: string;
  AGGREGATOR_SOCKET_ADDRESS: string;
  ARCHIVE_URL: string;
}

export function isConfig(config: Config): config is Config {
  return (
    (config as Config).aggregatorApiUrl !== undefined &&
    (config as Config).archiveUrl !== undefined &&
    (config as Config).aggregatorSocketUrl !== undefined
  );
}
