#!/bin/bash

# Skripta za deploy samo portfolio foldera
# Koristi se kada treba da se ažurira portfolio folder

# Boje za output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

echo -e "${YELLOW}📁 Deploy samo portfolio foldera...${NC}"

# Proveri da li postoji deploy.config.sh
if [ ! -f "deploy.config.sh" ]; then
    echo -e "${RED}❌ deploy.config.sh fajl ne postoji!${NC}"
    exit 1
fi

source deploy.config.sh

if [ -z "$DEPLOY_HOST" ] || [ -z "$DEPLOY_USER" ] || [ -z "$DEPLOY_PATH" ]; then
    echo -e "${RED}❌ deploy.config.sh mora da sadrži DEPLOY_HOST, DEPLOY_USER i DEPLOY_PATH${NC}"
    exit 1
fi

# Proveri da li dist/portfolio postoji
if [ ! -d "dist/portfolio" ]; then
    echo -e "${RED}❌ dist/portfolio folder ne postoji!${NC}"
    echo -e "${YELLOW}Pokreni prvo: npm run build${NC}"
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

if [ ! -z "$SSH_OPTS" ]; then
    SSH_CMD="ssh $SSH_OPTS -o StrictHostKeyChecking=accept-new -o ConnectTimeout=10"
else
    SSH_CMD="ssh -o StrictHostKeyChecking=accept-new -o ConnectTimeout=10"
fi

# Pripremi rsync opcije samo za portfolio
RSYNC_OPTS="-av --delete --partial --progress --no-compress"
RSYNC_OPTS="$RSYNC_OPTS --exclude='.DS_Store' --exclude='*.log'"

# Prikaži veličinu portfolio foldera
PORTFOLIO_SIZE=$(du -sh dist/portfolio | cut -f1)
echo -e "${YELLOW}Veličina portfolio foldera: ${PORTFOLIO_SIZE}${NC}"
echo -e "${YELLOW}Server: ${DEPLOY_USER}@${DEPLOY_HOST}:${DEPLOY_PATH}/portfolio${NC}"
echo ""

# Izvrši rsync samo za portfolio folder
rsync $RSYNC_OPTS -e "$SSH_CMD" \
    dist/portfolio/ \
    ${DEPLOY_USER}@${DEPLOY_HOST}:${DEPLOY_PATH}/portfolio/

if [ $? -eq 0 ]; then
    echo -e "${GREEN}✅ Portfolio folder uspešno deploy-ovan!${NC}"
else
    echo -e "${RED}❌ Deployment portfolio foldera neuspešan!${NC}"
    exit 1
fi
