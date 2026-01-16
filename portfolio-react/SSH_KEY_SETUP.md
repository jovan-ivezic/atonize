# 🔐 Uputstva za dodavanje SSH key-a na server

## Način 1: Ručno preko SSH-a (PREPORUČENO)

1. **Uloguj se na server sa password-om:**
   ```bash
   ssh atonizec@atonize.com
   ```

2. **Kreiraj .ssh folder ako ne postoji:**
   ```bash
   mkdir -p ~/.ssh
   chmod 700 ~/.ssh
   ```

3. **Dodaj PUBLIC KEY u authorized_keys:**
   ```bash
   nano ~/.ssh/authorized_keys
   ```
   
   Nalepi ceo PUBLIC KEY (kopiraj iz output-a `./add-ssh-key.sh`):
   ```
   ssh-rsa AAAAB3NzaC1yc2EAAAADAQABAAACAQCXkErVNxfREPdxLqyf797M7i0HUmID24+fMwhqBP7tmlyPAPlGC4lH+4dVRMxg+k44fwwPXOZSxd/rglWjvJnVoZv29FbebyXfTWj1qCBbjnUg7MljGjGOdeZ4Ll0Jis1ruaf3aJ33U4oUvL3vD5mRoS9LEch5aDkC7w2hx5pWeVc2xX7Y1lZpMB+gh6TdyNTa7Gk3RsV7E0cQ6I5v7JEeBGD5Uu/vTU6/s+vGBy/QRQBU8NUNfwknYlNUAxY6zIGLPTCOYRSnEJ81cBGKY5JEH54g19GRkXjexqOl+C/ejL4sWPl7DgXI9WuCsVrsUjMmdE1pBZIG1OnmtZDw088JOfcSwtqzl5ny2I5osBwd8zKfw2n93lyOHxk4U7tFS8GzpJyxSUorB1/92UPBIhqkrN+ypTJCY+e4nMpdBwxsW52oDtjk1KAsSwZb5HtYULeDkJVnXY67YJo5rfKT0J4HPYGZ6YQuLE3urS2yiP6vmFoqxzKRuV2LtxGccqQLx2rQOEoEDWP+AFSE6SZl6cgsqSOvjqB9EGiOAgPmedr4lMU6J/tOgIa0b480EUk6yv7ka//rkx7I7hmYx4sLVvtOl0ukNMDNF8tthI5XbHV9KYE/WpLH5cmWnml4i3HqAlb8NusjuXGpwlEOmJo4laHdf3OnZD9434/b+SwlPL95iQ== atonizec@atonize.com
   ```
   
   Sačuvaj: `Ctrl+X`, zatim `Y`, zatim `Enter`

4. **Postavi prava pristupa:**
   ```bash
   chmod 600 ~/.ssh/authorized_keys
   ```

5. **Izađi sa servera:**
   ```bash
   exit
   ```

6. **Testiraj konekciju bez password-a:**
   ```bash
   ssh -i ~/.ssh/id_rsa_atonize atonizec@atonize.com
   ```

## Način 2: Jedna komanda (kopiraj-ceo-blok)

```bash
ssh atonizec@atonize.com "mkdir -p ~/.ssh && chmod 700 ~/.ssh && echo 'ssh-rsa AAAAB3NzaC1yc2EAAAADAQABAAACAQCXkErVNxfREPdxLqyf797M7i0HUmID24+fMwhqBP7tmlyPAPlGC4lH+4dVRMxg+k44fwwPXOZSxd/rglWjvJnVoZv29FbebyXfTWj1qCBbjnUg7MljGjGOdeZ4Ll0Jis1ruaf3aJ33U4oUvL3vD5mRoS9LEch5aDkC7w2hx5pWeVc2xX7Y1lZpMB+gh6TdyNTa7Gk3RsV7E0cQ6I5v7JEeBGD5Uu/vTU6/s+vGBy/QRQBU8NUNfwknYlNUAxY6zIGLPTCOYRSnEJ81cBGKY5JEH54g19GRkXjexqOl+C/ejL4sWPl7DgXI9WuCsVrsUjMmdE1pBZIG1OnmtZDw088JOfcSwtqzl5ny2I5osBwd8zKfw2n93lyOHxk4U7tFS8GzpJyxSUorB1/92UPBIhqkrN+ypTJCY+e4nMpdBwxsW52oDtjk1KAsSwZb5HtYULeDkJVnXY67YJo5rfKT0J4HPYGZ6YQuLE3urS2yiP6vmFoqxzKRuV2LtxGccqQLx2rQOEoEDWP+AFSE6SZl6cgsqSOvjqB9EGiOAgPmedr4lMU6J/tOgIa0b480EUk6yv7ka//rkx7I7hmYx4sLVvtOl0ukNMDNF8tthI5XbHV9KYE/WpLH5cmWnml4i3HqAlb8NusjuXGpwlEOmJo4laHdf3OnZD9434/b+SwlPL95iQ== atonizec@atonize.com' >> ~/.ssh/authorized_keys && chmod 600 ~/.ssh/authorized_keys"
```

## Način 3: Koristi skriptu

```bash
./add-ssh-key.sh
```

Skripta će ti pokazati PUBLIC KEY i dati uputstva.

---

**Nakon što dodaš key, testiraj:**
```bash
./test-ssh.sh
```

**Ako radi, možeš deploy-ovati bez password-a:**
```bash
npm run deploy
```
