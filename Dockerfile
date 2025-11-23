# ─── Base Builder Image ───────────────────────────────────────────────
FROM node:22-alpine AS builder

WORKDIR /app

# Install dependencies based on package*.json
COPY package*.json ./
RUN npm install

# Copy full project
COPY . .

# Build Next.js app
RUN npm run build

# ─── Production Runtime Image ─────────────────────────────────────────
FROM node:22-alpine AS runner

WORKDIR /app

ENV NODE_ENV=production

# Copy the built Next.js files from builder
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json

# Set port environment
ENV PORT=3000
EXPOSE 3000

# Start Next.js
CMD ["npm", "start"]