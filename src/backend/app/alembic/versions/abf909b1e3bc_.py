"""empty message

Revision ID: abf909b1e3bc
Revises: 3ddd607983a5
Create Date: 2024-12-20 16:21:43.061483

"""
from alembic import op
import sqlalchemy as sa
import sqlmodel.sql.sqltypes


# revision identifiers, used by Alembic.
revision = 'abf909b1e3bc'
down_revision = '3ddd607983a5'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('order', sa.Column('notes', sqlmodel.sql.sqltypes.AutoString(), nullable=True))
    op.alter_column('product', 'weight',
               existing_type=sa.DOUBLE_PRECISION(precision=53),
               nullable=True)
    op.alter_column('product', 'size',
               existing_type=sa.VARCHAR(),
               nullable=True)
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.alter_column('product', 'size',
               existing_type=sa.VARCHAR(),
               nullable=False)
    op.alter_column('product', 'weight',
               existing_type=sa.DOUBLE_PRECISION(precision=53),
               nullable=False)
    op.drop_column('order', 'notes')
    # ### end Alembic commands ###
