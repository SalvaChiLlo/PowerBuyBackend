FROM node:14-bullseye

WORKDIR /usr/src/app
COPY . .
RUN ls; npm install;

EXPOSE 9000

ENTRYPOINT ["npm", "run", "serve"]
