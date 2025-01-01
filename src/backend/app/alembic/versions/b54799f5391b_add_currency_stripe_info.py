"""Add currency stripe info

Revision ID: b54799f5391b
Revises: 14ecb5affd89
Create Date: 2024-12-31 14:08:37.001248

"""
from alembic import op
import sqlalchemy as sa
import sqlmodel.sql.sqltypes


# revision identifiers, used by Alembic.
revision = 'b54799f5391b'
down_revision = '14ecb5affd89'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('currency', sa.Column('stripe_supported', sa.Boolean(), nullable=False, server_default='false'))
    op.add_column('currency', sa.Column('stripe_zero_decimal', sa.Boolean(), nullable=False, server_default='false'))
    op.add_column('currency', sa.Column('stripe_no_fraction', sa.Boolean(), nullable=False, server_default='false'))
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_column('currency', 'stripe_no_fraction')
    op.drop_column('currency', 'stripe_zero_decimal')
    op.drop_column('currency', 'stripe_supported')
    # ### end Alembic commands ###
