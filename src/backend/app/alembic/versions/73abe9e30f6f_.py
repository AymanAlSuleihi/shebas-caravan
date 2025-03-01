"""empty message

Revision ID: 73abe9e30f6f
Revises: f92a8fad5954
Create Date: 2024-10-24 19:00:05.099684

"""
from alembic import op
import sqlalchemy as sa
import sqlmodel.sql.sqltypes


# revision identifiers, used by Alembic.
revision = '73abe9e30f6f'
down_revision = 'f92a8fad5954'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_constraint('productorderlink_order_id_fkey', 'productorderlink', type_='foreignkey')
    op.drop_constraint('productorderlink_product_id_fkey', 'productorderlink', type_='foreignkey')
    op.create_foreign_key(None, 'productorderlink', 'product', ['product_id'], ['id'], ondelete='CASCADE')
    op.create_foreign_key(None, 'productorderlink', 'order', ['order_id'], ['id'], ondelete='CASCADE')
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_constraint(None, 'productorderlink', type_='foreignkey')
    op.drop_constraint(None, 'productorderlink', type_='foreignkey')
    op.create_foreign_key('productorderlink_product_id_fkey', 'productorderlink', 'product', ['product_id'], ['id'])
    op.create_foreign_key('productorderlink_order_id_fkey', 'productorderlink', 'order', ['order_id'], ['id'])
    # ### end Alembic commands ###
