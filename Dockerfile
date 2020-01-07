FROM node:10.15.1-alpine AS builder

WORKDIR /home/project
COPY . .

RUN \
  yarn install --network-timeout 1000000 && \
  $(npm bin)/ng build --verbose=true --prod && \
  $(npm bin)/tsc --project server && \
  $(npm bin)/copyfiles -u 1 ./server/data/** ./dist

FROM node:10.15.1-alpine

EXPOSE 3000
ENV NODE_ENV=production
WORKDIR /home/node
USER node

COPY --from=builder /home/project/node_modules/               node_modules/
COPY --from=builder /home/project/data/                       data/
COPY --from=builder /home/project/dist/                       dist/
COPY --from=builder /home/project/src/assets/styles/scss/     src/assets/styles/scss/

ENTRYPOINT [ "node" ]
CMD ["dist/server/www.js"]
