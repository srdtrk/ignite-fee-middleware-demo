FROM golang:1.21-alpine3.18 as builder

RUN set -eux; apk add --no-cache git libusb-dev linux-headers gcc musl-dev make;

ENV GOPATH=""
ENV GOMODULE="on"

# Copy relevant files before go mod download. Replace directives to local paths break if local
# files are not copied before go mod download.

COPY go.mod go.mod
COPY go.sum go.sum
COPY cmd cmd
COPY app app
COPY tools tools
COPY docs docs

RUN go mod download

RUN GOOS=linux GOARCH=amd64 LEDGER_ENABLED=false go build -mod=readonly -tags "netgo ledger" -ldflags '-X github.com/cosmos/cosmos-sdk/version.Name=foo -X github.com/cosmos/cosmos-sdk/version.AppName=food -X github.com/cosmos/cosmos-sdk/version.Version= -X github.com/cosmos/cosmos-sdk/version.Commit= -X "github.com/cosmos/cosmos-sdk/version.BuildTags=netgo ledger," -w -s' -trimpath -o /go/build/ ./...

FROM alpine:3.18

COPY --from=builder /go/build/food /bin/food

ENTRYPOINT ["food"]
