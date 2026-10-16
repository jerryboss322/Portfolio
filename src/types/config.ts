// Configuration Type Definitions

export interface BaseConfig {
  enabled: boolean;
  timeout: number;
  retries: number;
}

export interface AuthConfig extends BaseConfig {
  jwtSecret: string;
  jwtExpiresIn: string;
  refreshTokenExpiresIn: string;
  saltRounds: number;
  maxAttempts: number;
  lockoutDuration: number;
  providers: {
    google?: { clientId: string; clientSecret: string };
    github?: { clientId: string; clientSecret: string };
    microsoft?: { clientId: string; clientSecret: string };
  };
}

export interface DatabaseConfig extends BaseConfig {
  host: string;
  port: number;
  username: string;
  password: string;
  database: string;
  ssl: boolean;
  poolSize: number;
  connectionTimeout: number;
  queryTimeout: number;
  migrationsDir: string;
  entitiesDir: string;
  synchronize: boolean;
  logging: boolean;
}

export interface CacheConfig extends BaseConfig {
  ttl: number;
  maxKeys: number;
  redis:
    { host: string; port: number; password: string };
}

export interface MailerConfig extends BaseConfig {
  host: string;
  port: number;
  secure: boolean;
  auth: { user: string; pass: string };
  from: string;
  templatesDir: string;
}

export interface StorageConfig extends BaseConfig {
  provider: 's3' | 'gcs' | 'local';
  bucket: string;
  region: string;
  accessKeyId: string;
  secretAccessKey: string;
  cdnUrl?: string;
}

export interface PaymentConfig extends BaseConfig {
  provider: 'stripe' | 'paypal' | 'square';
  apiKey: string;
  webhookSecret: string;
  currency: string;
  minAmount: number;
  maxAmount: number;
}

export interface AnalyticsConfig extends BaseConfig {
  provider: 'ga4' | 'segment' | 'mixpanel';
  trackingId: string;
  sampleRate: number;
  userId: string;
  debug: boolean;
}

export interface SearchConfig extends BaseConfig {
  provider: 'algolia' | 'elasticsearch' | 'typesense';
  apiKey: string;
  appId: string;
  indexName: string;
  hitsPerPage: number;
  searchAttributes: string[];
  facetAttributes: string[];
}

export interface NotificationConfig extends BaseConfig {
  provider: 'pusher' | 'firebase' | 'websocket';
  apiKey: string;
  appId: string;
  cluster: string;
  encryption: boolean;
}

export interface WebSocketConfig extends BaseConfig {
  host: string;
  port: number;
  secure: boolean;
  path: string;
  corsOrigin: string[];
  maxConnections: number;
  pingInterval: number;
  pingTimeout: number;
}

export interface HttpConfig extends BaseConfig {
  baseUrl: string;
  timeout: number;
  retryAttempts: number;
  retryDelay: number;
  headers: Record<string, string>;
}

export interface CorsConfig extends BaseConfig {
  origin: string[];
  methods: string[];
  allowedHeaders: string[];
  exposedHeaders: string[];
  credentials: boolean;
  maxAge: number;
}

export interface SecurityConfig extends BaseConfig {
  helmet: boolean;
  csrf: boolean;
  rateLimit: { windowMs: number; max: number };
  cors: CorsConfig;
  xss: boolean;
  sqlInjection: boolean;
  contentSecurityPolicy: string;
}

export interface RateLimitConfig extends BaseConfig {
  windowMs: number;
  max: number;
  message: string;
  standardHeaders: boolean;
  legacyHeaders: boolean;
}

export interface SessionConfig extends BaseConfig {
  secret: string;
  name: string;
  resave: boolean;
  saveUninitialized: boolean;
  cookie: {
    secure: boolean;
    httpOnly: boolean;
    maxAge: number;
    sameSite: 'strict' | 'lax' | 'none';
  };
}

export interface AppEnvironment {
  NODE_ENV: 'development' | 'production' | 'staging' | 'test';
  PORT: number;
  HOST: string;
  LOG_LEVEL: 'error' | 'warn' | 'info' | 'debug' | 'trace';
  FEATURE_FLAGS: Record<string, boolean>;
}

export interface AppConfig {
  app: { name: string; version: string; description: string };
  env: AppEnvironment;
  auth: AuthConfig;
  database: DatabaseConfig;
  cache: CacheConfig;
  mailer: MailerConfig;
  storage: StorageConfig;
  payment: PaymentConfig;
  analytics: AnalyticsConfig;
  search: SearchConfig;
  notification: NotificationConfig;
  websocket: WebSocketConfig;
  http: HttpConfig;
  cors: CorsConfig;
  security: SecurityConfig;
  rateLimit: RateLimitConfig;
  session: SessionConfig;
}

export type ConfigKey = keyof AppConfig;
export type FeatureFlag = keyof AppEnvironment['FEATURE_FLAGS'];

// Team members (see src/data/team.ts)
export interface TeamMember {
  id: string;
  name: string;
  role: string;
  bio: string;
  avatar: string;
  email: string;
  Twitter?: string;
  GitHub?: string;
  LinkedIn?: string;
  status: 'online' | 'away' | 'busy' | 'offline';
}
