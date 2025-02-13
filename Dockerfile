# use the official Bun image
# see all versions at https://hub.docker.com/r/oven/bun/tags
FROM oven/bun:1 as base
WORKDIR /usr/src/app
COPY . .

RUN bun install
RUN bun run build

USER bun
EXPOSE 3000
ENTRYPOINT [ "bun", ".output/server/index.mjs" ]
