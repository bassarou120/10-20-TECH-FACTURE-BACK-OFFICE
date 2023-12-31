FROM nginx:1.13.9-alpine
RUN rm -rf /etc/nginx/conf.d
RUN mkdir -p /etc/nginx/conf.d
COPY ./default.conf /etc/nginx/conf.d/
COPY ./dist/ /usr/share/nginx/html
#COPY ./dist2/ /usr/share/nginx/html/admin
#COPY ./dist3/ /usr/share/nginx/html/evaluation

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]

## build environment
#FROM node:16.13.1 as builder
##FROM node:9.6.1 as builder
#RUN mkdir /usr/src/app
#WORKDIR /usr/src/app
#ENV PATH /usr/src/app/node_modules/.bin:$PATH
#COPY . /usr/src/app
##RUN npm install
##RUN npm install -g  @angular/cli
##
#RUN ng build
#RUN npm run build:prod

# production environment
#FROM nginx:1.13.9-alpine
#RUN rm -rf /etc/nginx/conf.d
#RUN mkdir -p /etc/nginx/conf.d
#COPY ./default.conf /etc/nginx/conf.d/
#COPY --from=builder /usr/src/app/dist/ /usr/share/nginx/html
#COPY --from=builder /usr/src/app/dist2/ /usr/share/nginx/html/admin
#
#EXPOSE 80
#CMD ["nginx", "-g", "daemon off;"]
