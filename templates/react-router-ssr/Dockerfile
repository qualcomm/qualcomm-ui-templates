FROM public.ecr.aws/docker/library/node:lts-slim AS build

WORKDIR /app

ENV COREPACK_ENABLE_DOWNLOAD_PROMPT=0

RUN apt update && apt install -y git && rm -rf /var/lib/apt/lists/*

RUN npm i -g corepack
RUN corepack enable

COPY . .

# The build needs the full dependency tree.
RUN pnpm install --frozen-lockfile
RUN pnpm build

# Copies the site with only its production dependencies.
RUN pnpm deploy --prod /deploy

FROM public.ecr.aws/docker/library/node:lts-slim

WORKDIR /app

ENV NODE_ENV=production

COPY --from=build /deploy/package.json ./
COPY --from=build /deploy/node_modules ./node_modules
COPY --from=build /deploy/build ./build

USER node

EXPOSE 3000

CMD ["node_modules/.bin/react-router-serve", "./build/server/index.js"]
