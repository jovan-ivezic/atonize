#!/bin/bash

# Skripta za postavljanje SSH ključeva za automatski deployment
# Ova skripta će generisati SSH key par i prikazati uputstva za dodavanje na cPanel

# Boje za output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
RED='\033[0;31m'
NC='\033[0m' # No Color

echo -e "${BLUE}🔐 Postavljanje SSH ključeva za automatski deployment${NC}"
echo ""

# Proveri da li deploy.config.sh postoji
if [ ! -f "deploy.config.sh" ]; then
    echo -e "${RED}❌ deploy.config.sh fajl ne postoji!${NC}"
    echo -e "${YELLOW}Prvo kreiraj deploy.config.sh fajl.${NC}"
    exit 1
fi

source deploy.config.sh

if [ -z "$DEPLOY_HOST" ] || [ -z "$DEPLOY_USER" ]; then
    echo -e "${RED}❌ deploy.config.sh mora da sadrži DEPLOY_HOST i DEPLOY_USER${NC}"
    exit 1
fi

# Ime za SSH key (može se koristiti specifičan key za ovaj projekat)
SSH_KEY_NAME="id_rsa_atonize"
SSH_KEY_PATH="$HOME/.ssh/$SSH_KEY_NAME"

echo -e "${YELLOW}Server: ${DEPLOY_USER}@${DEPLOY_HOST}${NC}"
echo ""

# Proveri da li key već postoji
if [ -f "$SSH_KEY_PATH" ]; then
    echo -e "${YELLOW}⚠️  SSH key već postoji na: ${SSH_KEY_PATH}${NC}"
    read -p "Da li želiš da generišeš novi key? (y/N): " -n 1 -r
    echo
    if [[ ! $REPLY =~ ^[Yy]$ ]]; then
        echo -e "${GREEN}✅ Koristićemo postojeći key.${NC}"
        echo ""
        echo -e "${BLUE}📋 Tvoj PUBLIC KEY je:${NC}"
        echo "----------------------------------------"
        cat "${SSH_KEY_PATH}.pub"
        echo "----------------------------------------"
        echo ""
        echo -e "${YELLOW}📝 Sledeći koraci:${NC}"
        echo "1. Kopiraj PUBLIC KEY iznad"
        echo "2. Uloguj se na cPanel"
        echo "3. Idi na 'SSH Access' sekciju"
        echo "4. Klikni 'Manage SSH Keys'"
        echo "5. Klikni 'Import Key'"
        echo "6. Nalepi PUBLIC KEY u polje"
        echo "7. Klikni 'Import'"
        echo ""
        echo -e "${BLUE}💡 Nakon što dodaš key, ažuriraj deploy.config.sh:${NC}"
        echo "export DEPLOY_SSH_KEY=\"~/.ssh/$SSH_KEY_NAME\""
        exit 0
    fi
fi

# Generiši novi SSH key
echo -e "${YELLOW}🔑 Generisanje novog SSH key para...${NC}"
echo -e "${YELLOW}Email: ${DEPLOY_USER}@${DEPLOY_HOST}${NC}"

ssh-keygen -t rsa -b 4096 -f "$SSH_KEY_PATH" -C "${DEPLOY_USER}@${DEPLOY_HOST}" -N ""

if [ $? -ne 0 ]; then
    echo -e "${RED}❌ Greška pri generisanju SSH key-a${NC}"
    exit 1
fi

echo ""
echo -e "${GREEN}✅ SSH key uspešno generisan!${NC}"
echo ""

# Prikaži public key
echo -e "${BLUE}📋 Tvoj PUBLIC KEY je:${NC}"
echo "----------------------------------------"
cat "${SSH_KEY_PATH}.pub"
echo "----------------------------------------"
echo ""

# Dodaj key u SSH agent (opciono)
if command -v ssh-add &> /dev/null; then
    ssh-add "$SSH_KEY_PATH" 2>/dev/null
    echo -e "${GREEN}✅ Key dodat u SSH agent${NC}"
    echo ""
fi

# Uputstva
echo -e "${YELLOW}📝 Sledeći koraci:${NC}"
echo ""
echo "1. 📋 Kopiraj PUBLIC KEY iznad (ceo sadržaj između linija)"
echo ""
echo "2. 🌐 Uloguj se na cPanel:"
echo "   https://atonize.com:2083"
echo ""
echo "3. 🔐 Idi na 'SSH Access' sekciju"
echo ""
echo "4. 🔑 Klikni 'Manage SSH Keys'"
echo ""
echo "5. ➕ Klikni 'Import Key' ili 'Authorize'"
echo ""
echo "6. 📝 Nalepi PUBLIC KEY u polje 'Public Key'"
echo ""
echo "7. ✅ Klikni 'Import' ili 'Authorize'"
echo ""
echo "8. 🔄 Ažuriraj deploy.config.sh da koristi ovaj key:"
echo ""
echo -e "${BLUE}   export DEPLOY_SSH_KEY=\"~/.ssh/$SSH_KEY_NAME\"${NC}"
echo ""
echo -e "${YELLOW}💡 Nakon što dodaš key na server, testiraj konekciju:${NC}"
echo "   ssh -i $SSH_KEY_PATH ${DEPLOY_USER}@${DEPLOY_HOST}"
echo ""

# Pitanje da li želi da automatski ažurira deploy.config.sh
read -p "Da li želiš da automatski ažuriram deploy.config.sh sa putanjom do key-a? (Y/n): " -n 1 -r
echo
if [[ ! $REPLY =~ ^[Nn]$ ]]; then
    # Proveri da li već postoji DEPLOY_SSH_KEY u fajlu
    if grep -q "DEPLOY_SSH_KEY" deploy.config.sh; then
        # Ažuriraj postojeću liniju
        if [[ "$OSTYPE" == "darwin"* ]]; then
            # macOS
            sed -i '' "s|export DEPLOY_SSH_KEY=.*|export DEPLOY_SSH_KEY=\"~/.ssh/$SSH_KEY_NAME\"|" deploy.config.sh
        else
            # Linux
            sed -i "s|export DEPLOY_SSH_KEY=.*|export DEPLOY_SSH_KEY=\"~/.ssh/$SSH_KEY_NAME\"|" deploy.config.sh
        fi
    else
        # Dodaj novu liniju
        echo "" >> deploy.config.sh
        echo "# SSH key putanja (dodato automatski)" >> deploy.config.sh
        echo "export DEPLOY_SSH_KEY=\"~/.ssh/$SSH_KEY_NAME\"" >> deploy.config.sh
    fi
    echo -e "${GREEN}✅ deploy.config.sh ažuriran!${NC}"
fi

echo ""
echo -e "${GREEN}🎉 Gotovo! Sada možeš koristiti 'npm run deploy' bez passworda.${NC}"
