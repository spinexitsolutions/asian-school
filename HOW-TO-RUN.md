# Website kaise chalayein (Windows)

## Ek baar ka setup

1. **Node.js** install karo (version 20 ya naya): https://nodejs.org → "LTS" download → install.
2. ZIP extract karo, jaise `C:\Users\pc\Downloads\asian-international-school`.
3. Us folder mein **PowerShell** kholo: folder kholo → khali jagah pe Shift + Right-click → "Open PowerShell window here".
4. Packages install karo:

   ```
   npm install
   ```

5. Settings file banao:

   ```
   copy .env.example .env
   ```

   `.env` ko Notepad mein kholo. `AUTH_SECRET=` ke aage koi bhi lambi random text likho, jaise
   `AUTH_SECRET=asian-school-chomu-2026-secret-key-xyz` aur save karo.

## Har baar chalane ke liye (2 PowerShell windows)

**Window 1: database** (isse band mat karna):

```
npm run db:local
```

"Local MongoDB is running" dikhe tab aage badho. (Pehli baar ~100 MB download hoga.)

**Window 2: website:**

```
npm run dev
```

- Website: http://localhost:3000
- Admin panel: http://localhost:3000/admin

## Admin account (sirf pehli baar)

Window 2 mein (website band karke, Ctrl + C) ya teesri PowerShell window mein:

```
npm run create-admin -- admin@asianschool.in MeraPassword123 "Your Name"
```

Phir http://localhost:3000/admin pe isi email + password se login karo.
Password bhool gaye? Yahi command naye password ke saath dobara chalao — password reset ho jayega.

School ka starting content (notices, toppers, settings) ek baar bharne ke liye:

```
npm run seed
```

## Note
- Console mein `fdprocessedid` wali "hydration" warning browser extension ki wajah se aati hai — ignore karo.
- Live website (Hostinger) pe daalne ke steps `README.md` mein hain.
