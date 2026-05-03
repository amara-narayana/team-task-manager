import asyncpg
from app.config import DATABASE_URL

pool = None

async def connect_db():
    global pool
    pool = await asyncpg.create_pool(DATABASE_URL, min_size=2, max_size=10)

    # Ensure users table exists
    async with pool.acquire() as conn:
        await conn.execute("""
            CREATE TABLE IF NOT EXISTS users (
                id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
                email TEXT UNIQUE NOT NULL,
                hashed_password TEXT NOT NULL,
                full_name TEXT NOT NULL,
                created_at TIMESTAMPTZ DEFAULT now()
            );
        """)

    return pool

async def get_pool():
    global pool
    if pool is None:
        pool = await connect_db()
    return pool

async def close_db():
    global pool
    if pool:
        await pool.close()