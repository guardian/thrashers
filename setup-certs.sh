#!/bin/bash

set -e

CERT_CIRECTORY="certs"

echo "Creating certificate with mkcert - hold on 🚀"

brew install mkcert nss

# setup rootCA, if this exists it will not overwrite
mkcert -install

mkdir -p $CERT_CIRECTORY

mkcert -key-file=./$CERT_CIRECTORY/localhost-key.pem -cert-file=./$CERT_CIRECTORY/localhost.pem localhost

ln -s "$(mkcert -CAROOT)/rootCA.pem" ./certs/rootCA.pem
