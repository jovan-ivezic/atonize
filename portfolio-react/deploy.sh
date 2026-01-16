#!/bin/bash

# Deployment script za portfolio-react
# Koristi rsync za brzu sinhronizaciju samo izmenjenih fajlova

# Ne koristi set -e jer želimo da probamo alternativne opcije ako prvi pokušaj ne uspe

# Boje za output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

echo -e "${YELLOW}🚀 Pokretanje deployment procesa...${NC}"

# Proveri da li postoji deploy.config.sh
if [ ! -f "deploy.config.sh" ]; then
    echo -e "${RED}❌ deploy.config.sh fajl ne postoji!${NC}"
    echo -e "${YELLOW}Kreiraj deploy.config.sh fajl sa sledećim sadržajem:${NC}"
    echo ""
    echo "#!/bin/bash"
    echo "export DEPLOY_HOST=\"atonize.com\""
    echo "export DEPLOY_USER=\"atonizec\""
    echo "export DEPLOY_PATH=\"/home/atonizec/public_html\""
    echo ""
    exit 1
fi

# Učitaj konfiguraciju
source deploy.config.sh

# Proveri da li su sve varijable postavljene
if [ -z "$DEPLOY_HOST" ] || [ -z "$DEPLOY_USER" ] || [ -z "$DEPLOY_PATH" ]; then
    echo -e "${RED}❌ deploy.config.sh mora da sadrži DEPLOY_HOST, DEPLOY_USER i DEPLOY_PATH${NC}"
    exit 1
fi

# Build projekta
echo -e "${YELLOW}📦 Building projekta...${NC}"
npm run build

if [ ! -d "dist" ]; then
    echo -e "${RED}❌ dist folder ne postoji! Build je verovatno neuspešan.${NC}"
    exit 1
fi

# Prikaži veličinu dist foldera
DIST_SIZE=$(du -sh dist | cut -f1)
echo -e "${GREEN}✅ Build završen! Veličina dist foldera: ${DIST_SIZE}${NC}"

# Rsync deployment
echo -e "${YELLOW}📤 Sinhronizacija fajlova na server...${NC}"
echo -e "${YELLOW}Server: ${DEPLOY_USER}@${DEPLOY_HOST}:${DEPLOY_PATH}${NC}"

# Proveri da li koristi SSH key ili password
if [ ! -z "$DEPLOY_SSH_KEY" ]; then
    echo -e "${GREEN}🔑 Koristi se SSH key autentifikacija${NC}"
else
    echo -e "${YELLOW}🔐 Koristi se password autentifikacija${NC}"
    echo -e "${YELLOW}   (Unesi password kada se zatraži)${NC}"
fi
echo ""

# Pripremi SSH opcije za rsync
SSH_OPTS=""

# Dodaj SSH port ako je specificiran
if [ ! -z "$DEPLOY_PORT" ]; then
    SSH_OPTS="$SSH_OPTS -p $DEPLOY_PORT"
fi

# Dodaj SSH key ako je specificiran
if [ ! -z "$DEPLOY_SSH_KEY" ]; then
    SSH_KEY_PATH=$(eval echo $DEPLOY_SSH_KEY)
    SSH_OPTS="$SSH_OPTS -i $SSH_KEY_PATH"
fi

# Pripremi SSH komandu
if [ ! -z "$SSH_OPTS" ]; then
    SSH_CMD="ssh $SSH_OPTS -o StrictHostKeyChecking=accept-new -o ConnectTimeout=10"
else
    SSH_CMD="ssh -o StrictHostKeyChecking=accept-new -o ConnectTimeout=10"
fi

# Pripremi rsync opcije
# Koristimo osnovne opcije bez kompresije i sa dodatnim opcijama za kompatibilnost
RSYNC_OPTS="-av --delete --partial --progress --no-compress"

# Probaj sa starijim protokolom ako je specificiran (može pomoći sa kompatibilnošću)
if [ ! -z "$DEPLOY_RSYNC_PROTOCOL" ]; then
    RSYNC_OPTS="$RSYNC_OPTS --protocol=$DEPLOY_RSYNC_PROTOCOL"
fi

# Dodaj exclude opcije
RSYNC_OPTS="$RSYNC_OPTS --exclude='.DS_Store' --exclude='*.log'"

# Isključi portfolio folder po defaultu (ogroman, retko se menja)
# Postavi DEPLOY_INCLUDE_PORTFOLIO="true" u deploy.config.sh ako želiš da ga uključiš
if [ "$DEPLOY_INCLUDE_PORTFOLIO" != "true" ]; then
    RSYNC_OPTS="$RSYNC_OPTS --exclude='portfolio/'"
    echo -e "${YELLOW}📁 Portfolio folder je isključen (koristi DEPLOY_INCLUDE_PORTFOLIO=\"true\" da ga uključiš)${NC}"
fi

# Probaj sa eksplicitnom putanjom do rsync-a na serveru (može pomoći sa nekim hosting provajderima)
# Ako ne radi, probaj bez --rsync-path
RSYNC_PATH_OPT=""
if [ ! -z "$DEPLOY_RSYNC_PATH" ]; then
    RSYNC_PATH_OPT="--rsync-path=$DEPLOY_RSYNC_PATH"
fi

echo -e "${YELLOW}Pokušavam rsync sa osnovnim opcijama...${NC}"

# Izvrši rsync
if [ ! -z "$RSYNC_PATH_OPT" ]; then
    rsync $RSYNC_OPTS $RSYNC_PATH_OPT -e "$SSH_CMD" \
        dist/ \
        ${DEPLOY_USER}@${DEPLOY_HOST}:${DEPLOY_PATH}/
else
    rsync $RSYNC_OPTS -e "$SSH_CMD" \
        dist/ \
        ${DEPLOY_USER}@${DEPLOY_HOST}:${DEPLOY_PATH}/
fi

RSYNC_EXIT=$?

# Ako rsync ne uspe, probaj alternativni način sa tar preko SSH
if [ $RSYNC_EXIT -ne 0 ]; then
    echo -e "${YELLOW}⚠️  Rsync neuspešan, pokušavam alternativni način (tar preko SSH)...${NC}"
    
    # Kreiraj tar arhivu lokalno
    TAR_FILE="/tmp/portfolio-deploy-$(date +%s).tar.gz"
    cd dist
    tar -czf "$TAR_FILE" .
    cd ..
    
    # Prenesi tar fajl na server
    if [ ! -z "$SSH_OPTS" ]; then
        scp $SSH_OPTS "$TAR_FILE" ${DEPLOY_USER}@${DEPLOY_HOST}:/tmp/
    else
        scp "$TAR_FILE" ${DEPLOY_USER}@${DEPLOY_HOST}:/tmp/
    fi
    
    if [ $? -eq 0 ]; then
        # Ekstraktuj na serveru
        TAR_BASENAME=$(basename "$TAR_FILE")
        if [ ! -z "$SSH_OPTS" ]; then
            ssh $SSH_OPTS ${DEPLOY_USER}@${DEPLOY_HOST} \
                "cd ${DEPLOY_PATH} && tar -xzf /tmp/$TAR_BASENAME && rm /tmp/$TAR_BASENAME"
        else
            ssh ${DEPLOY_USER}@${DEPLOY_HOST} \
                "cd ${DEPLOY_PATH} && tar -xzf /tmp/$TAR_BASENAME && rm /tmp/$TAR_BASENAME"
        fi
        
        if [ $? -eq 0 ]; then
            rm -f "$TAR_FILE"
            RSYNC_EXIT=0
            echo -e "${GREEN}✅ Deployment uspešan koristeći tar metodu!${NC}"
        else
            rm -f "$TAR_FILE"
            RSYNC_EXIT=1
        fi
    else
        rm -f "$TAR_FILE"
        RSYNC_EXIT=1
    fi
fi

# Proveri exit status
if [ $RSYNC_EXIT -ne 0 ]; then
    echo -e "${RED}❌ Deployment neuspešan!${NC}"
    echo -e "${YELLOW}💡 Mogući uzroci:${NC}"
    echo "   - Neusaglašenost rsync verzija između klijenta i servera"
    echo "   - Problem sa SSH konekcijom"
    echo "   - Nedovoljno prostora na serveru"
    echo ""
    echo -e "${YELLOW}💡 Alternativni načini:${NC}"
    echo "   1. Koristi ZIP upload preko cPanel File Manager"
    echo "   2. Kontaktiraj hosting provajdera za rsync verziju"
    exit 1
fi

echo -e "${GREEN}✅ Deployment završen uspešno!${NC}"
echo -e "${GREEN}🌐 Sajt je dostupan na: https://atonize.com${NC}"
