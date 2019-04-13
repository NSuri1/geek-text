FROM node:11-slim as react-build
WORKDIR /app
COPY . /app
RUN npm install
RUN npm run build
EXPOSE 80

# Stage 2 - the production environment
FROM nginx:1.12-alpine
COPY --from=react-build /app/build /usr/share/nginx/html
COPY --from=react-build /app/nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
