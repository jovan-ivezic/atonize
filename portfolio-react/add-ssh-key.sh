#!/bin/bash

# Skripta za automatsko dodavanje SSH key-a na server
# Ova skripta će kopirati public key na server koristeći password autentifikaciju

# Boje za output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
RED='\033[0;31m'
NC='\033[0m' # No Color

echo -e "${BLUE}🔐 Dodavanje SSH key-a na server${NC}"
echo ""

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

# Pronađi public key
SSH_KEY_PATH=""
if [ -f ~/.ssh/id_rsa_atonize.pub ]; then
    SSH_KEY_PATH=~/.ssh/id_rsa_atonize.pub
elif [ -f ~/.ssh/id_rsa.pub ]; then
    SSH_KEY_PATH=~/.ssh/id_rsa.pub
else
    echo -e "${RED}❌ Nema SSH public key-a!${NC}"
    echo -e "${YELLOW}Pokreni: ./setup-ssh.sh${NC}"
    exit 1
fi

echo -e "${GREEN}✅ Pronađen SSH key: $SSH_KEY_PATH${NC}"
echo ""

# Pročitaj public key
PUBLIC_KEY=$(cat "$SSH_KEY_PATH")

echo -e "${YELLOW}📋 Tvoj PUBLIC KEY:${NC}"
echo "----------------------------------------"
echo "$PUBLIC_KEY"
echo "----------------------------------------"
echo ""

echo -e "${YELLOW}Opcije za dodavanje key-a na server:${NC}"
echo ""
echo "1. 🌐 Ručno preko SSH (PREPORUČENO):"
echo "   ssh ${DEPLOY_USER}@${DEPLOY_HOST}"
echo "   mkdir -p ~/.ssh"
echo "   chmod 700 ~/.ssh"
echo "   echo '$PUBLIC_KEY' >> ~/.ssh/authorized_keys"
echo "   chmod 600 ~/.ssh/authorized_keys"
echo ""
echo "2. 📋 Kopiraj PUBLIC KEY iznad i dodaj ručno:"
echo "   - Uloguj se na server: ssh ${DEPLOY_USER}@${DEPLOY_HOST}"
echo "   - Otvori: nano ~/.ssh/authorized_keys"
echo "   - Nalepi PUBLIC KEY na novi red"
echo "   - Sačuvaj (Ctrl+X, Y, Enter)"
echo ""
echo "3. 🔄 Automatski sa password-om (zahteva sshpass):"
read -p "Da li želiš da probam automatski? (y/N): " -n 1 -r
echo

if [[ $REPLY =~ ^[Yy]$ ]]; then
    if ! command -v sshpass &> /dev/null; then
        echo -e "${YELLOW}⚠️  sshpass nije instaliran.${NC}"
        echo -e "${YELLOW}Instaliraj sa: brew install hudochenkov/sshpass/sshpass (macOS)${NC}"
        echo -e "${YELLOW}Ili koristi opciju 1 ili 2 iznad.${NC}"
        exit 1
    fi
    
    echo -e "${YELLOW}Unesi password za ${DEPLOY_USER}@${DEPLOY_HOST}:${NC}"
    read -s PASSWORD
    
    sshpass -p "$PASSWORD" ssh -o StrictHostKeyChecking=no ${DEPLOY_USER}@${DEPLOY_HOST} \
        "mkdir -p ~/.ssh && chmod 700 ~/.ssh && echo '$PUBLIC_KEY' >> ~/.ssh/authorized_keys && chmod 600 ~/.ssh/authorized_keys"
    
    if [ $? -eq 0 ]; then
        echo -e "${GREEN}✅ SSH key uspešno dodat na server!${NC}"
        echo ""
        echo -e "${YELLOW}Testiraj konekciju:${NC}"
        echo "ssh -i $SSH_KEY_PATH ${DEPLOY_USER}@${DEPLOY_HOST}"
    else
        echo -e "${RED}❌ Greška pri dodavanju key-a. Probaj ručno (opcija 1).${NC}"
        exit 1
    fi
else
    echo -e "${YELLOW}Koristi opciju 1 ili 2 iznad za ručno dodavanje.${NC}"
fi
