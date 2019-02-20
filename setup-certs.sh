#!/bin/bash

set -e

CERT_DIRECTORY="certs"

echo "Creating certificate with mkcert - hold on 🚀"

brew install mkcert nss

# setup rootCA, if this exists it will not overwrite
mkcert -install

mkdir -p $CERT_DIRECTORY

mkcert -key-file=./$CERT_DIRECTORY/localhost-key.pem -cert-file=./$CERT_DIRECTORY/localhost.pem localhost

ln -s "$(mkcert -CAROOT)/rootCA.pem" ./certs/rootCA.pem
