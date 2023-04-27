####################################################################
# Base Stage                                                       #
####################################################################
FROM node:19-alpine AS base
RUN npm install -g pnpm

####################################################################
# Dependencies Stage                                               #
####################################################################
FROM base AS dependencies
WORKDIR /app
COPY package.json pnpm-lock.yaml ./
RUN pnpm add dotenv
RUN pnpm install

####################################################################
# Build Stage                                                      #
####################################################################
FROM base AS build

WORKDIR /app
COPY . .
COPY --from=dependencies /app/node_modules ./node_modules
RUN pnpm build

####################################################################
# Final Stage                                                      #
####################################################################
FROM node:19-alpine AS deploy-node

WORKDIR /app
RUN rm -rf ./*
COPY --from=dependencies /app/node_modules ./node_modules
COPY --from=build /app/package.json .
COPY --from=build /app/build .
CMD ["node", "-r", "dotenv/config", "index.js"]