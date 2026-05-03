from app.database import get_pool

async def create_user(email: str, password_hash: str, full_name: str):
    pool = await get_pool()
    async with pool.acquire() as conn:
        row = await conn.fetchrow("""
            INSERT INTO users (email, hashed_password, full_name)
            VALUES ($1, $2, $3)
            RETURNING id, email, full_name, created_at
        """, email, password_hash, full_name)
        return dict(row)

async def get_user_by_email(email: str):
    pool = await get_pool()
    async with pool.acquire() as conn:
        row = await conn.fetchrow("SELECT * FROM users WHERE email = $1", email)
        return dict(row) if row else None

async def get_user_by_id(user_id: str):
    pool = await get_pool()
    async with pool.acquire() as conn:
        row = await conn.fetchrow("SELECT id, email, full_name FROM users WHERE id = $1", user_id)
        return dict(row) if row else None