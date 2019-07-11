FROM golang:alpine AS build-env
ADD ./server.go /src/
RUN cd /src && go build -o server


# final stage
FROM alpine

RUN apk add --no-cache \
      libc6-compat \
      ca-certificates

WORKDIR /app
COPY --from=build-env /src/server /app/
ADD /static /app/static

CMD ["/app/server"]
