drop table checkout.coupon
drop table checkout.product
drop schema checkout
create schema checkout

create table checkout.product (
  product_id integer,
  description text,
  price numeric,
  width integer,
  height integer,
  length integer,
  weight numeric
)

insert into checkout.product (
  product_id, description, price, width, height, length, weight
) values (1, 'A', 1000, 50, 30, 10, 3)
insert into checkout.product (
  product_id, description, price, width, height, length, weight
) values (2, 'B', 5000, 50, 50, 50, 22)
insert into checkout.product (
  product_id, description, price, width, height, length, weight
) values (3, 'C', 30, 10, 10, 10, 0.9)+insert into checkout.product (
  product_id, description, price, width, height, length, weight
) values (3, 'D', 30, -10, 10, 10, 0.9)

create table checkout.coupon (
  code text,
  percentage numeric
)

insert into checkout.coupon ('VALE20', 20, '2023-10-01T10:00:00')
insert into checkout.coupon ('VALE10', 10, '2022-10-01T10:00:00')