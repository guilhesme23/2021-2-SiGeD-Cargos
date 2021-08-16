FROM node:15

COPY . /code

WORKDIR /code

RUN npm install -g npm@7.20.5
CMD [ "sh", "-c", "npm start" ]
