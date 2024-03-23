FROM node

WORKDIR /urltool

COPY . /urltool

RUN npm install

WORKDIR /urltool/frontend

RUN npm install

WORKDIR /urltool

EXPOSE 8080

CMD ["npm", "run", "dev"]