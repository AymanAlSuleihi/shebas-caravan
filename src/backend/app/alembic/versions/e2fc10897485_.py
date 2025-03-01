"""empty message

Revision ID: e2fc10897485
Revises: 05a6e636fc94
Create Date: 2024-02-15 01:30:56.817990

"""
from alembic import op
import sqlalchemy as sa
import sqlmodel.sql.sqltypes


# revision identifiers, used by Alembic.
revision = 'e2fc10897485'
down_revision = '05a6e636fc94'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('category', sa.Column('url_key', sqlmodel.sql.sqltypes.AutoString(), nullable=True))
    op.add_column('category', sa.Column('thumbnail', sqlmodel.sql.sqltypes.AutoString(), nullable=True))
    op.execute("UPDATE category SET url_key = 'temp'")
    op.alter_column('category', 'url_key', nullable=False)
    op.execute("UPDATE category SET thumbnail = 'temp'")
    op.alter_column('category', 'thumbnail', nullable=False)
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_column('category', 'thumbnail')
    op.drop_column('category', 'url_key')
    # ### end Alembic commands ###
