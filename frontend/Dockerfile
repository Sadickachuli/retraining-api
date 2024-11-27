# Build the frontend
FROM node:16 AS build

WORKDIR /app
COPY . /app
RUN npm install
RUN npm run build

# Serve the frontend using nginx
FROM nginx:alpine
COPY --from=build /app/build /usr/share/nginx/html
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
