FROM node:11-slim
WORKDIR /app
COPY . /app
RUN npm install
RUN npm run build
EXPOSE 3001
CMD ["npm", "start"]
