#!/bin/bash

# Skripta za testiranje SSH konekcije

# Boje za output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

echo -e "${YELLOW}🔍 Testiranje SSH konekcije...${NC}"

# Proveri da li deploy.config.sh postoji
if [ ! -f "deploy.config.sh" ]; then
    echo -e "${RED}❌ deploy.config.sh fajl ne postoji!${NC}"
    exit 1
fi

source deploy.config.sh

if [ -z "$DEPLOY_HOST" ] || [ -z "$DEPLOY_USER" ]; then
    echo -e "${RED}❌ deploy.config.sh mora da sadrži DEPLOY_HOST i DEPLOY_USER${NC}"
    exit 1
fi

# Pripremi SSH komandu
SSH_OPTS=""

if [ ! -z "$DEPLOY_PORT" ]; then
    SSH_OPTS="$SSH_OPTS -p $DEPLOY_PORT"
fi

if [ ! -z "$DEPLOY_SSH_KEY" ]; then
    SSH_KEY_PATH=$(eval echo $DEPLOY_SSH_KEY)
    SSH_OPTS="$SSH_OPTS -i $SSH_KEY_PATH"
fi

# Test konekcije
echo -e "${YELLOW}Pokušavam konekciju na: ${DEPLOY_USER}@${DEPLOY_HOST}${NC}"
echo ""

if [ ! -z "$SSH_OPTS" ]; then
    ssh $SSH_OPTS -o ConnectTimeout=10 -o BatchMode=yes ${DEPLOY_USER}@${DEPLOY_HOST} "echo 'SSH konekcija uspešna!' && pwd && ls -la $DEPLOY_PATH | head -5"
else
    ssh -o ConnectTimeout=10 -o BatchMode=yes ${DEPLOY_USER}@${DEPLOY_HOST} "echo 'SSH konekcija uspešna!' && pwd && ls -la $DEPLOY_PATH | head -5"
fi

EXIT_CODE=$?

if [ $EXIT_CODE -eq 0 ]; then
    echo ""
    echo -e "${GREEN}✅ SSH konekcija radi! Možeš koristiti 'npm run deploy'${NC}"
else
    echo ""
    echo -e "${RED}❌ SSH konekcija neuspešna!${NC}"
    echo ""
    echo -e "${YELLOW}Mogući uzroci:${NC}"
    echo "1. SSH key nije dodat na cPanel"
    echo "2. DEPLOY_SSH_KEY putanja nije ispravna"
    echo "3. Server ne dozvoljava SSH pristup"
    echo "4. Pogrešan username ili host"
    echo ""
    echo -e "${YELLOW}💡 Probaj:${NC}"
    echo "1. Pokreni './setup-ssh.sh' da generišeš i dodaš key"
    echo "2. Proveri da li je SSH omogućen na cPanel"
    echo "3. Testiraj ručno: ssh ${DEPLOY_USER}@${DEPLOY_HOST}"
    exit 1
fi
