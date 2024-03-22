FROM node

WORKDIR /urltool

COPY . ./

RUN npm install

WORKDIR /urltool/frontend

RUN npm install

WORKDIR /urltool

EXPOSE 5000
EXPOSE 5173

CMD ["npm", "run", "dev"]