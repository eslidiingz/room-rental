/project-root
│
├── /src
│   ├── /graphql
│   │   ├── /schemas
│   │   │   ├── index.ts         # Combines and exports all GraphQL schemas
│   │   │   ├── userSchema.ts    # User schema
│   │   │   └── postSchema.ts    # Post schema
│   │   ├── /resolvers
│   │   │   ├── index.ts         # Combines and exports all resolvers
│   │   │   ├── userResolver.ts  # User resolvers
│   │   │   └── postResolver.ts  # Post resolvers
│   │   ├── /context
│   │   │   └── index.ts         # Context for handling authorization, database connections, etc.
│   │   └── server.ts            # ApolloServer instance setup
│   │
│   ├── /rest
│   │   ├── /controllers
│   │   │   ├── userController.ts  # Controller for REST API (User)
│   │   │   └── postController.ts  # Controller for REST API (Post)
│   │   ├── routes.ts              # Elysia routes for REST API
│   │
│   ├── /services
│   │   ├── userService.ts        # Business logic for users
│   │   └── postService.ts        # Business logic for posts
│   │
│   ├── /db
│   │   ├── /models
│   │   │   ├── userModel.ts      # Database schema for users
│   │   │   └── postModel.ts      # Database schema for posts
│   │   └── index.ts              # Database connection and setup
│   │
│   ├── server.ts                # Main server file (Elysia + Apollo GraphQL setup)
│   └── app.ts                   # Application bootstrap (loading routes, services, etc.)
│
├── /tests
│   ├── /graphql
│   │   ├── user.test.ts         # GraphQL-related tests for user queries/mutations
│   │   └── post.test.ts         # GraphQL-related tests for post queries/mutations
│   └── /rest
│       ├── user.test.ts         # REST API-related tests for users
│       └── post.test.ts         # REST API-related tests for posts
│
├── /config
│   ├── apollo.ts                # Apollo Server configuration
│   ├── db.ts                    # Database configuration
│   └── env.ts                   # Environment variables loader
│
├── package.json                 # Project dependencies and scripts
├── tsconfig.json                # TypeScript configuration
└── .env                         # Environment variables
