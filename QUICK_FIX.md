# Quick Fix Guide for GigFlow

## Current Issues & Solutions

### Issue 1: MongoDB Not Running
**Error**: `Error: connect ECONNREFUSED 127.0.0.1:27017`

**Solution**:
```bash
sudo systemctl start mongod
```

### Issue 2: CORS Errors
**Fixed**: Updated backend `.env` file to use correct frontend URL (port 5174)

### Issue 3: Frontend Tailwind CSS Error
**Fixed**: Downgraded to Tailwind CSS v3.4.17

---

## How to Start GigFlow

### Option 1: Manual Start (Recommended)

1. **Start MongoDB**:
```bash
sudo systemctl start mongod
```

2. **Start Backend** (in one terminal):
```bash
cd /home/annu/Downloads/Intership/gigflow/backend
npm run dev
```

3. **Start Frontend** (in another terminal):
```bash
cd /home/annu/Downloads/Intership/gigflow/frontend
npm run dev
```

4. **Open in Browser**:
- Frontend: http://localhost:5174
- Backend API: http://localhost:5000

### Option 2: Using Start Script

```bash
cd /home/annu/Downloads/Intership/gigflow
./start.sh
```

---

## Verification Steps

1. ✅ MongoDB running: `systemctl status mongod`
2. ✅ Backend running: Check terminal for "Server running on port 5000" and "MongoDB Connected"
3. ✅ Frontend running: Check terminal for "Local: http://localhost:5174"
4. ✅ Open http://localhost:5174 in browser

---

## Common Issues

### MongoDB Won't Start
```bash
# Check logs
sudo journalctl -u mongod -n 50

# Or try manual start
mongod --dbpath ~/data/db
```

### Port Already in Use
```bash
# Kill process on port 5000
lsof -ti:5000 | xargs kill -9

# Kill process on port 5174
lsof -ti:5174 | xargs kill -9
```

### Backend Can't Connect to MongoDB
1. Ensure MongoDB is running
2. Check `.env` file has: `MONGO_URI=mongodb://localhost:27017/gigflow`
3. Restart backend server

---

## Testing the Application

1. **Register**: Create a new account
2. **Login**: Sign in with your credentials
3. **Create Gig**: Post a new job
4. **Browse**: View all gigs
5. **Bid**: Submit a bid on a gig
6. **Hire**: As gig owner, hire a freelancer
7. **Notifications**: Check real-time notification bell

---

## Current Status

✅ Backend code complete
✅ Frontend code complete  
✅ MongoDB transactions implemented
✅ Socket.io real-time notifications
✅ CORS configuration updated
✅ Tailwind CSS fixed
⚠️ MongoDB needs to be started manually
⚠️ Servers need to be running
