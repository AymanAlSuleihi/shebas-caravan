"""Add currency

Revision ID: 4dbc17dd3699
Revises: 08e5973b80e4
Create Date: 2024-12-30 16:44:44.371925

"""
from alembic import op
import sqlalchemy as sa
import sqlmodel.sql.sqltypes


# revision identifiers, used by Alembic.
revision = '4dbc17dd3699'
down_revision = '76e67c69e8bf'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('currency',
    sa.Column('base_code', sqlmodel.sql.sqltypes.AutoString(), nullable=False),
    sa.Column('target_code', sqlmodel.sql.sqltypes.AutoString(), nullable=False),
    sa.Column('timestamp', sa.DateTime(), nullable=False),
    sa.Column('rate', sa.Float(), nullable=False),
    sa.Column('created_at', sa.DateTime(), server_default=sa.text('current_timestamp(0)'), nullable=False),
    sa.Column('updated_at', sa.DateTime(), server_default=sa.text('current_timestamp(0)'), nullable=False),
    sa.Column('id', sa.Integer(), nullable=False),
    sa.PrimaryKeyConstraint('id')
    )
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('currency')
    # ### end Alembic commands ###
