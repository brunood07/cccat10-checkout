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
  weight numeric,
  currency text
)

insert into checkout.product (
  product_id, description, price, width, height, length, weight, currency
) values (1, 'A', 1000, 50, 30, 10, 3, 'BRL')
insert into checkout.product (
  product_id, description, price, width, height, length, weight, currency
) values (2, 'B', 5000, 50, 50, 50, 22, 'BRL')
insert into checkout.product (
  product_id, description, price, width, height, length, weight, currency
) values (3, 'C', 30, 10, 10, 10, 0.9, 'BRL')
insert into checkout.product (
  product_id, description, price, width, height, length, weight, currency
) values (4, 'D', 30, -10, 10, 10, 0., 'BRL')
insert into checkout.product (
  product_id, description, price, width, height, length, weight, currency
) values (5, 'A', 1000, 50, 30, 10, 3, 'USD')

create table checkout.coupon (
  code text,
  percentage numeric
)

insert into checkout.coupon ('VALE20', 20, '2023-10-01T10:00:00')
insert into checkout.coupon ('VALE10', 10, '2022-10-01T10:00:00')